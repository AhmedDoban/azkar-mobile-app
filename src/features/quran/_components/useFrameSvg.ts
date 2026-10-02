import { Asset } from "expo-asset";
import { ReactNode, useEffect, useState } from "react";
import { Platform } from "react-native";
import { parse } from "react-native-svg";
import { FRAME_SVGS } from "../_data/frameSvgs";

export type FrameSvg = {
  x: number;
  y: number;
  width: number;
  height: number;
  content: ReactNode[];
};

const parsed = new Map<number, FrameSvg>();
const pending = new Map<number, Promise<FrameSvg>>();

async function readSource(id: number) {
  const asset = Asset.fromModule(FRAME_SVGS[id - 1]);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  if (Platform.OS === "web" || uri.startsWith("http")) {
    return (await fetch(uri)).text();
  }
  const { File } = await import("expo-file-system");
  return new File(uri).text();
}

export function loadFrameSvg(id: number) {
  const hit = parsed.get(id);
  if (hit) return Promise.resolve(hit);
  let task = pending.get(id);
  if (!task) {
    task = readSource(id)
      .then((xml) => {
        const ast = parse(xml);
        if (!ast) throw new Error("Invalid frame");
        const [x, y, width, height] = String(ast.props.viewBox)
          .split(/\s+/)
          .map(Number);
        const frame = { x, y, width, height, content: ast.children };
        parsed.set(id, frame);
        return frame;
      })
      .finally(() => pending.delete(id));
    pending.set(id, task);
  }
  return task;
}

export default function useFrameSvg(id: number) {
  const [frame, setFrame] = useState<FrameSvg | null>(
    () => parsed.get(id) ?? null,
  );

  useEffect(() => {
    const hit = parsed.get(id);
    if (hit) {
      setFrame(hit);
      return;
    }
    let alive = true;
    loadFrameSvg(id)
      .then((result) => alive && setFrame(result))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id]);

  return frame;
}
