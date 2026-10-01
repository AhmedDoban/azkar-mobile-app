import { StyleSheet, useWindowDimensions } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Rect,
  Stop,
} from "react-native-svg";
import { AdhanPalette } from "./palette";
import { cloudBandPath, crescentPath } from "./crescent";

export default function AdhanBackdrop({
  palette: p,
}: {
  palette: AdhanPalette;
}) {
  const { width, height } = useWindowDimensions();
  const W = 400;
  const H = (W * height) / width;
  const archTop = H * 0.1;
  const base = H * 0.56;
  const mosque = (y: number) => base - 470 + y;

  const arch =
    `M 14 ${H} L 14 ${archTop + 150} ` +
    `C 14 ${archTop + 118} 70 ${archTop + 108} 118 ${archTop + 88} ` +
    `C 168 ${archTop + 66} 192 ${archTop + 34} 200 ${archTop} ` +
    `C 208 ${archTop + 34} 232 ${archTop + 66} 282 ${archTop + 88} ` +
    `C 330 ${archTop + 108} 386 ${archTop + 118} 386 ${archTop + 150} ` +
    `L 386 ${H} Z`;

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={p.bgTop} />
          <Stop offset="1" stopColor={p.bgBottom} />
        </LinearGradient>
        <LinearGradient id="arch" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={p.archTop} />
          <Stop offset="0.6" stopColor={p.archBottom} />
          <Stop offset="1" stopColor={p.bgBottom} />
        </LinearGradient>
        <LinearGradient id="mint" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={p.mint} stopOpacity="0.98" />
          <Stop offset="1" stopColor={p.mintDeep} stopOpacity="0.35" />
        </LinearGradient>
        <LinearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={p.mint} stopOpacity="0.8" />
          <Stop offset="1" stopColor={p.archBottom} stopOpacity="0" />
        </LinearGradient>
        <LinearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <Stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
        </LinearGradient>
        <Pattern
          id="stars"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <Rect
            x="11"
            y="11"
            width="14"
            height="14"
            fill="none"
            stroke={p.pattern}
            strokeWidth="0.8"
          />
          <Rect
            x="11"
            y="11"
            width="14"
            height="14"
            fill="none"
            stroke={p.pattern}
            strokeWidth="0.8"
            transform="rotate(45 18 18)"
          />
          <Circle
            cx="0"
            cy="0"
            r="2"
            fill="none"
            stroke={p.pattern}
            strokeWidth="0.6"
          />
          <Circle
            cx="36"
            cy="36"
            r="2"
            fill="none"
            stroke={p.pattern}
            strokeWidth="0.6"
          />
        </Pattern>
        <Mask id="topFade">
          <Rect x="0" y="0" width={W} height={H} fill="url(#fadeDown)" />
        </Mask>
      </Defs>

      <Rect x="0" y="0" width={W} height={H} fill="url(#bg)" />
      <Rect
        x="0"
        y="0"
        width={W}
        height={H}
        fill="url(#stars)"
        opacity="0.1"
        mask="url(#topFade)"
      />

      <Path d={arch} fill="url(#arch)" stroke={p.outline} strokeWidth="1.4" />

      <G fill="url(#mint)">
        {[60, 316].map((x) => (
          <G key={x}>
            <Rect x={x} y={mosque(262)} width="24" height="208" rx="3" />
            <Rect x={x - 4} y={mosque(300)} width="32" height="7" rx="2" />
            <Rect x={x - 4} y={mosque(372)} width="32" height="7" rx="2" />
            <Path
              d={`M ${x} ${mosque(262)} C ${x} ${mosque(236)} ${x + 24} ${mosque(236)} ${x + 24} ${mosque(262)} Z`}
            />
            <Rect x={x + 11} y={mosque(222)} width="2" height="16" />
            <Path d={crescentPath(x + 12, mosque(214), 6)} />
          </G>
        ))}
        {[112, 288].map((cx) => (
          <G key={cx}>
            <Rect x={cx - 26} y={mosque(410)} width="52" height="60" />
            <Path
              d={`M ${cx - 24} ${mosque(410)} C ${cx - 24} ${mosque(378)} ${cx} ${mosque(372)} ${cx} ${mosque(358)} C ${cx} ${mosque(372)} ${cx + 24} ${mosque(378)} ${cx + 24} ${mosque(410)} Z`}
            />
            <Path d={crescentPath(cx, mosque(348), 5)} />
          </G>
        ))}
        <Rect x="140" y={mosque(392)} width="120" height="78" />
        <Path
          d={`M 138 ${mosque(392)} C 136 ${mosque(338)} 196 ${mosque(330)} 200 ${mosque(296)} C 204 ${mosque(330)} 264 ${mosque(338)} 262 ${mosque(392)} Z`}
        />
        <Rect x="199" y={mosque(272)} width="2" height="26" />
        <Path d={crescentPath(200, mosque(258), 11)} />
      </G>

      <Path
        d={cloudBandPath(base - 6, base + 140, [
          [70, 26],
          [84, 34],
          [66, 22],
          [92, 36],
          [78, 28],
          [86, 32],
        ])}
        fill="url(#cloud)"
        opacity="0.55"
      />
      <Path
        d={cloudBandPath(
          base + 26,
          base + 170,
          [
            [88, 30],
            [72, 24],
            [96, 38],
            [80, 28],
            [90, 34],
            [70, 24],
          ],
          -46,
        )}
        fill="url(#cloud)"
      />
    </Svg>
  );
}
