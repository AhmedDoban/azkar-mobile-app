import { Asset } from "expo-asset";
import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { parse } from "react-native-svg";
import { PAGE_SVGS } from "../_data/pageSvgs";

const INK = /^#231f20$/i;

const CACHE_SIZE = 8;

export type AyahShape = { surah: number; ayah: number; d: string };

export type TitleBox = {
  surah: number;
  x: number;
  y: number;
  width: number;
  height: number;
  nameX: number;
  nameWidth: number;
};

type MeasuredTitle = [number, number, number, number, number];

let measured: Record<string, MeasuredTitle[]> | null = null;
const measuredTitles = (page: number) =>
  (measured ??= require("../_data/titles.json") as Record<
    string,
    MeasuredTitle[]
  >)[page] ?? null;

export type PageSvg = {
  viewBox: string;
  content: ReactNode[];
  ayahs: AyahShape[];
  titles: TitleBox[];
  hits: { surah: number; ayah: number; boxes: Box[] }[];
};

export type Box = [number, number, number, number];

function boxesOf(d: string): Box[] {
  return d
    .split("M")
    .map((part) => part.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [])
    .filter((nums) => nums.length >= 4)
    .map((nums) => {
      const xs = nums.filter((_, i) => i % 2 === 0);
      const ys = nums.filter((_, i) => i % 2 === 1);
      return [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys),
      ];
    });
}

function findTitles(page: number, shapes: { boxes: Box[] }[]): TitleBox[] {
  const all = shapes.flatMap((s) => s.boxes);
  if (!all.length) return [];
  const heights = all
    .map((b) => b[3] - b[1])
    .filter((h) => h > 20 && h < 50)
    .sort((a, b) => a - b);
  const line = heights[Math.floor(heights.length / 2)] ?? 36;
  const x0 = Math.min(...all.map((b) => b[0]));
  const x1 = Math.max(...all.map((b) => b[2]));
  const printed = page > 2 ? measuredTitles(page) : null;
  if (!printed) return [];
  return printed.map(([surah, nx0, ny0, nx1, ny1]) => {
    const height = Math.min(line * 0.95, (ny1 - ny0) * 1.5);
    return {
      surah,
      x: x0,
      y: (ny0 + ny1) / 2 - height / 2,
      width: x1 - x0,
      height,
      nameX: (nx0 + nx1) / 2,
      nameWidth: nx1 - nx0,
    };
  });
}

type MeasuredAyah = [number, number, Box[]];

let ayahBoxes: Record<string, MeasuredAyah[]> | null = null;
const measuredAyahs = (page: number) =>
  (ayahBoxes ??= require("../_data/ayahBoxes.json") as Record<
    string,
    MeasuredAyah[]
  >)[page] ?? null;

const rectPath = (boxes: Box[]) =>
  boxes.map(([x0, y0, x1, y1]) => `M${x0} ${y0}H${x1}V${y1}H${x0}Z`).join("");

const parsed = new Map<number, PageSvg>();
const pending = new Map<number, Promise<PageSvg>>();

async function readSource(page: number) {
  const asset = Asset.fromModule(PAGE_SVGS[page - 1]);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  if (Platform.OS === "web" || uri.startsWith("http")) {
    return (await fetch(uri)).text();
  }
  const { File } = await import("expo-file-system");
  return new File(uri).text();
}

type XmlNode = {
  props: Record<string, unknown>;
  children: (XmlNode | string)[];
};

function prepare(node: XmlNode, ayahs: AyahShape[]) {
  node.children = node.children.filter((child) => {
    if (typeof child === "string") return true;
    if (child.props.class === "ayahPolygon") {
      ayahs.push({
        surah: Number(child.props.surah),
        ayah: Number(child.props.ayah),
        d: String(child.props.d),
      });
      return false;
    }
    if (typeof child.props.fill === "string" && INK.test(child.props.fill)) {
      child.props.fill = "currentColor";
    }
    prepare(child, ayahs);
    return true;
  });
}

function build(page: number, xml: string): PageSvg | null {
  const ayahs: AyahShape[] = [];
  const ast = parse(xml, (root) => {
    prepare(root as unknown as XmlNode, ayahs);
    return root;
  });
  if (!ast) return null;
  const polygons = ayahs.map((a) => ({
    surah: a.surah,
    ayah: a.ayah,
    boxes: boxesOf(a.d),
  }));
  const measured = measuredAyahs(page);
  const hits = measured
    ? measured.map(([surah, ayah, boxes]) => ({ surah, ayah, boxes }))
    : polygons;
  return {
    viewBox: String(ast.props.viewBox ?? "0 0 345 550"),
    content: ast.children,
    ayahs: measured
      ? hits.map((h) => ({
          surah: h.surah,
          ayah: h.ayah,
          d: rectPath(h.boxes),
        }))
      : ayahs,
    titles: findTitles(page, polygons),
    hits,
  };
}

export function loadPageSvg(page: number) {
  const hit = parsed.get(page);
  if (hit) return Promise.resolve(hit);
  let task = pending.get(page);
  if (!task) {
    task = readSource(page)
      .then((xml) => {
        const result = build(page, xml);
        if (!result) throw new Error("Invalid page");
        parsed.set(page, result);
        if (parsed.size > CACHE_SIZE) {
          parsed.delete(parsed.keys().next().value!);
        }
        return result;
      })
      .finally(() => pending.delete(page));
    pending.set(page, task);
  }
  return task;
}

export function paintMarkers(nodes: ReactNode[], color: string): ReactNode[] {
  let changed = false;
  const next = nodes.map((node) => {
    if (!isValidElement(node)) return node;
    const element = node as ReactElement<{
      id?: string;
      color?: string;
      children?: ReactNode;
    }>;
    if (element.props.id === "ayah_markers") {
      changed = true;
      return cloneElement(element, { color });
    }
    const children = element.props.children;
    if (children === undefined || children === null) return node;
    const list = Array.isArray(children) ? children : [children];
    const painted = paintMarkers(list, color);
    if (painted === list) return node;
    changed = true;
    return cloneElement(element, undefined, ...painted);
  });
  return changed ? next : nodes;
}

export default function usePageSvg(page: number) {
  const [svg, setSvg] = useState<PageSvg | null>(
    () => parsed.get(page) ?? null,
  );
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const hit = parsed.get(page);
    if (hit) {
      setSvg(hit);
      return;
    }
    let alive = true;
    setSvg(null);
    setFailed(false);
    loadPageSvg(page)
      .then((result) => alive && setSvg(result))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [page, attempt]);

  return { svg, failed, retry: () => setAttempt((n) => n + 1) };
}
