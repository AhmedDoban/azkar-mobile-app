import json
import os
import re
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..")
SVGS = os.path.join(ROOT, "assets/images/Qoran")
OUT = os.path.join(ROOT, "src/features/quran/_data/titles.json")
SOURCE = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads/hafs")
SCALE = 3


def boxes(d):
    out = []
    for sub in re.findall(r"M([^Z]+)Z", d):
        nums = list(map(float, re.findall(r"-?\d+\.?\d*", sub)))
        xs, ys = nums[0::2], nums[1::2]
        out.append([min(xs), min(ys), max(xs), max(ys)])
    return out


def bands(svg):
    shapes = [
        (int(m.group(2)), int(m.group(1)), boxes(m.group(3)))
        for m in re.finditer(
            r'class="ayahPolygon"[^>]*?ayah="(\d+)" surah="(\d+)" d="([^"]+)"', svg
        )
    ]
    heights = sorted(
        b[3] - b[1] for _, _, bs in shapes for b in bs if 20 < b[3] - b[1] < 50
    )
    line = heights[len(heights) // 2] if heights else 36
    result = []
    for index, (surah, ayah, bs) in enumerate(shapes):
        if ayah != 1 or surah == 1 or not bs:
            continue
        ordered = sorted(bs, key=lambda b: b[1])
        start = 0
        for i in range(1, len(ordered)):
            if ordered[i][1] - ordered[i - 1][3] > line * 0.8:
                start = i
        top = ordered[start][1]
        above = [b[3] for _, _, other in shapes[:index] for b in other]
        above += [b[3] for b in ordered[:start]]
        result.append((surah, max(above) if above else 0, top))
    return result


def ink_clusters(image, y0, y1):
    width, _ = image.size
    pixels = image.load()
    rows = []
    for y in range(max(0, int(y0)), int(y1)):
        xs = [x for x in range(width) if pixels[x, y] > 60]
        rows.append((y, min(xs), max(xs)) if len(xs) > 2 else None)
    clusters, current, gap = [], [], 0
    for row in rows:
        if row:
            current.append(row)
            gap = 0
        elif current:
            gap += 1
            if gap >= 3 * SCALE:
                clusters.append(current)
                current = []
    if current:
        clusters.append(current)
    return [c for c in clusters if c[-1][0] - c[0][0] > 4 * SCALE]


titles = {}
with tempfile.TemporaryDirectory() as tmp:
    for n in range(1, 605):
        path = os.path.join(SVGS, f"{n:03d}.svg")
        svg = open(path).read()
        found = bands(svg)
        if not found:
            continue
        view_w = float(re.search(r'viewBox="0 0 ([\d.]+)', svg).group(1))
        png = os.path.join(tmp, f"{n}.png")
        subprocess.run(
            ["resvg", "-w", str(int(view_w * SCALE)), path, png], check=True
        )
        alpha = Image.open(png).getchannel("A")
        for surah, y0, y1 in found:
            clusters = ink_clusters(alpha, y0 * SCALE, y1 * SCALE)
            if not clusters:
                continue
            title = clusters[0]
            box = [
                min(r[1] for r in title) / SCALE,
                title[0][0] / SCALE,
                max(r[2] for r in title) / SCALE,
                title[-1][0] / SCALE,
            ]
            titles.setdefault(str(n), []).append([surah] + [round(v, 1) for v in box])

with open(OUT, "w") as f:
    json.dump(titles, f, separators=(",", ":"))
print("pages with titles", len(titles), "titles", sum(len(v) for v in titles.values()))
