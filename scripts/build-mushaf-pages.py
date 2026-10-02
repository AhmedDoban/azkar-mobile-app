import json
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(__file__), "..")
DATA = os.path.join(ROOT, "src/features/quran/_data")
SOURCE = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads/hafs")


def rects(poly):
    poly = poly.strip()
    if poly.startswith("M"):
        out = []
        for sub in re.findall(r"M([^Z]+)Z", poly):
            nums = list(map(float, re.findall(r"-?\d+\.?\d*", sub)))
            xs, ys = nums[0::2], nums[1::2]
            out.append([min(xs), min(ys), max(xs), max(ys)])
        return out
    pts = [tuple(map(float, p.split(","))) for p in poly.split()]
    ys = sorted({round(y, 1) for _, y in pts})
    out = []
    for y0, y1 in zip(ys, ys[1:]):
        if y1 - y0 < 8:
            continue
        mid = (y0 + y1) / 2
        xs = []
        for i in range(len(pts)):
            (xa, ya), (xb, yb) = pts[i], pts[(i + 1) % len(pts)]
            if ya <= mid < yb or yb <= mid < ya:
                xs.append(xa + (mid - ya) * (xb - xa) / (yb - ya))
        xs.sort()
        for a, b in zip(xs[0::2], xs[1::2]):
            if b - a > 1:
                out.append([a, y0, b, y1])
    return out


content = json.load(open(os.path.join(SOURCE, "mushaf-content.json")))
juz_of = {
    (s["id"], a["number"]): (a["juz"], a["hizb"]) for s in content for a in s["ayahs"]
}

page_map, first_page = [], {}
for n in range(1, 605):
    raw = json.load(open(os.path.join(SOURCE, f"{n:03d}.json")))
    ayahs = []
    for item in raw:
        s, a = item["surahNumber"], item["ayahNumber"]
        rs = rects(item["polygon"])
        if rs and all(r[3] - r[1] < 18 for r in rs):
            top = max((r[3] for _, _, other in ayahs for r in other), default=rs[0][1])
            rs = [[rs[-1][0], top, rs[-1][2], top + 36]]
        ayahs.append((s, a, rs))
        if a == 1:
            first_page.setdefault(s, n)
    first, last = ayahs[0], ayahs[-1]
    juz, hizb = juz_of[(first[0], first[1])]
    page_map.append([first[0], first[1], last[0], last[1], juz, hizb])


def write(name, data):
    with open(os.path.join(DATA, name), "w") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))


write("pages.json", page_map)

surahs = json.load(open(os.path.join(DATA, "surahs.json")))
for s in surahs:
    s["page"] = first_page[s["id"]]
write("surahs.json", surahs)

with open(os.path.join(DATA, "pageSvgs.ts"), "w") as f:
    f.write("export const PAGE_SVGS = [\n")
    for n in range(1, 605):
        f.write(f'  require("@/assets/images/Qoran/{n:03d}.svg"),\n')
    f.write("];\n")

print("pages", len(page_map), "surah starts", len(first_page))
