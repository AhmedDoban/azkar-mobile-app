import io
import json
import os
import re
import sys
from multiprocessing import Pool

from svgelements import SVG, Path

ROOT = os.path.join(os.path.dirname(__file__), "..")
SVGS = os.path.join(ROOT, "assets/images/Qoran")
TITLES = os.path.join(ROOT, "src/features/quran/_data/titles.json")
OUT = os.path.join(ROOT, "src/features/quran/_data/ayahBoxes.json")

POLYGON = re.compile(
    r'class="ayahPolygon"[^>]*?ayah="(\d+)" surah="(\d+)" d="([^"]+)"'
)


def polygon_boxes(d):
    out = []
    for sub in re.findall(r"M([^Z]+)Z", d):
        nums = list(map(float, re.findall(r"-?\d+\.?\d*", sub)))
        xs, ys = nums[0::2], nums[1::2]
        out.append([min(xs), min(ys), max(xs), max(ys)])
    return out


def shape_boxes(xml):
    out = []
    for el in SVG.parse(io.StringIO(xml)).elements():
        if not isinstance(el, Path):
            continue
        for sub in el.as_subpaths():
            box = Path(sub).bbox()
            if box:
                out.append(list(box))
    return out


def split(svg):
    head_end = svg.index('<g id="ayah_markers"')
    content = svg.index('<g id="content"')
    tail = svg.index('<path class="ayahPolygon"')
    markers = svg[:content] + "</g></svg>"
    body = svg[:head_end] + svg[content:tail] + "</svg>"
    return markers, body


def marker_boxes(svg, xml):
    centers = [
        (float(x), float(y))
        for x, y in re.findall(r'ayah:x="([\d.]+)" ayah:y="([\d.]+)"', svg)
    ]
    groups = [None] * len(centers)
    for box in shape_boxes(xml):
        cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
        i = min(
            range(len(centers)),
            key=lambda k: (centers[k][0] - cx) ** 2 + (centers[k][1] - cy) ** 2,
        )
        g = groups[i]
        groups[i] = (
            box
            if g is None
            else [min(g[0], box[0]), min(g[1], box[1]), max(g[2], box[2]), max(g[3], box[3])]
        )
    return [g for g in groups if g]


def line_bands(glyphs, height):
    step = 0.25
    rows = [0.0] * (int(height / step) + 2)
    for x0, y0, x1, y1 in glyphs:
        for r in range(int(y0 / step), int(y1 / step) + 1):
            if 0 <= r < len(rows):
                rows[r] += x1 - x0
    peak = max(rows)
    runs, start = [], None
    for r, v in enumerate(rows + [0]):
        if v > peak * 0.3 and start is None:
            start = r
        elif v <= peak * 0.3 and start is not None:
            runs.append([start * step, r * step])
            start = None
    merged = []
    for run in runs:
        if merged and run[0] - merged[-1][1] < 1.5:
            merged[-1][1] = run[1]
        else:
            merged.append(run)
    return [r for r in merged if r[1] - r[0] > 2]


def inside(box, area):
    cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
    return area[0] <= cx <= area[2] and area[1] <= cy <= area[3]


def build(page, titles):
    svg = open(os.path.join(SVGS, f"{page:03d}.svg")).read()
    vb = list(map(float, re.search(r'viewBox="([^"]+)"', svg).group(1).split()))
    polygons = [
        (int(m.group(2)), int(m.group(1)), polygon_boxes(m.group(3)))
        for m in POLYGON.finditer(svg)
    ]
    markers_xml, body_xml = split(svg)
    markers = marker_boxes(svg, markers_xml)
    areas = [t[1:] for t in titles.get(str(page), [])]
    glyphs = [b for b in shape_boxes(body_xml) if not any(inside(b, a) for a in areas)]
    bands = line_bands(glyphs + markers, vb[1] + vb[3])

    def line_of(box):
        cy = (box[1] + box[3]) / 2
        return min(
            range(len(bands)),
            key=lambda i: 0
            if bands[i][0] <= cy <= bands[i][1]
            else min(abs(cy - bands[i][0]), abs(cy - bands[i][1])),
        )

    tokens = [(line_of(b), -(b[0] + b[2]) / 2, False, b) for b in glyphs]
    tokens += [(line_of(b), -(b[0] + b[2]) / 2, True, b) for b in markers]
    tokens.sort(key=lambda t: (t[0], t[1]))

    if len(markers) not in (len(polygons), len(polygons) - 1):
        return None

    spans = [dict() for _ in polygons]
    index = 0
    for line, _, is_marker, box in tokens:
        if index >= len(polygons):
            break
        band = bands[line]
        surah, ayah, poly = polygons[index]
        if is_marker or any(p[1] < band[1] and p[3] > band[0] for p in poly):
            span = spans[index].setdefault(line, [box[0], box[2]])
            span[0] = min(span[0], box[0])
            span[1] = max(span[1], box[2])
        if is_marker:
            index += 1

    centers = [(b[0] + b[1]) / 2 for b in bands]
    gaps = [centers[i + 1] - centers[i] for i in range(len(centers) - 1)]
    pitch = sorted(gaps)[len(gaps) // 2] if gaps else 20
    half = pitch / 2

    def edges(i):
        top = (centers[i - 1] + centers[i]) / 2 if i > 0 and gaps[i - 1] < pitch * 1.3 else centers[i] - half
        bottom = (
            (centers[i] + centers[i + 1]) / 2
            if i + 1 < len(centers) and gaps[i] < pitch * 1.3
            else centers[i] + half
        )
        return top, bottom

    result = []
    for (surah, ayah, _), lines in zip(polygons, spans):
        rects = []
        for line, (x0, x1) in sorted(lines.items()):
            top, bottom = edges(line)
            rects.append([round(x0 - 0.6, 1), round(top, 1), round(x1 + 0.6, 1), round(bottom, 1)])
        result.append([surah, ayah, rects])
    return result


def job(page):
    return page, build(page, json.load(open(TITLES)))


def main():
    pages = range(1, 605) if len(sys.argv) < 2 else list(map(int, sys.argv[1:]))
    out = json.load(open(OUT)) if os.path.exists(OUT) and len(sys.argv) > 1 else {}
    with Pool() as pool:
        results = pool.map(job, pages)
    failed = [page for page, boxes in results if boxes is None]
    for page, boxes in results:
        if boxes is not None:
            out[str(page)] = boxes
    out = {k: out[k] for k in sorted(out, key=int)}
    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print("failed", failed)


if __name__ == "__main__":
    main()
