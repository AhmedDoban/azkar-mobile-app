import { useAppSelector } from "@/store/Store";
import { G } from "react-native-svg";
import useFrameSvg from "../_components/useFrameSvg";

export default function SurahFrame({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  nameX?: number;
  nameWidth?: number;
}) {
  const id = useAppSelector((s) => s.settings.surahFrame);
  const frame = useFrameSvg(id);
  if (!frame) return null;

  const h = height * 1.2;
  const top = y + height / 2 - h / 2;
  const sx = width / frame.width;
  const sy = h / frame.height;

  return (
    <G
      transform={`translate(${x} ${top}) scale(${sx} ${sy}) translate(${-frame.x} ${-frame.y})`}
    >
      {frame.content}
    </G>
  );
}
