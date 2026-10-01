import { StyleSheet } from "react-native";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

const petal = (r: number) =>
  `M 0 0 C ${-r * 0.45} ${-r * 0.5}, ${-r * 0.32} ${-r}, 0 ${-r} C ${r * 0.32} ${-r}, ${r * 0.45} ${-r * 0.5}, 0 0 Z`;

export default function ZikrCardBackdrop({
  top,
  bottom,
  wave,
  ornament,
  width,
  height,
  cornerX,
}: {
  top: string;
  bottom: string;
  wave: string;
  ornament: string;
  width: number;
  height: number;
  cornerX: number;
}) {
  const start = height * 0.6;
  const back = `M 0 ${start + 14} C ${width * 0.3} ${start - 10}, ${width * 0.62} ${start + 26}, ${width} ${start - 4} L ${width} ${height} L 0 ${height} Z`;
  const front = `M 0 ${start + 30} C ${width * 0.35} ${start + 8}, ${width * 0.7} ${start + 40}, ${width} ${start + 16} L ${width} ${height} L 0 ${height} Z`;

  return (
    <Svg
      width={width}
      height={height}
      style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]}
    >
      <Defs>
        <LinearGradient id="zikrFade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={top} />
          <Stop offset="1" stopColor={bottom} />
        </LinearGradient>
      </Defs>
      <Rect width={width} height={height} fill="url(#zikrFade)" />
      <Path d={back} fill={wave} opacity={0.35} />
      <Path d={front} fill={wave} opacity={0.6} />
      <G opacity={0.08} transform={`translate(${cornerX} 0)`}>
        {Array.from({ length: 8 }, (_, i) => (
          <G key={i} transform={`rotate(${i * 45})`}>
            <Path d={petal(40)} fill="none" stroke={ornament} strokeWidth={1} />
            <Path
              d={petal(22)}
              fill="none"
              stroke={ornament}
              strokeWidth={0.8}
            />
          </G>
        ))}
      </G>
    </Svg>
  );
}
