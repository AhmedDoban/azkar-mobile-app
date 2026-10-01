import { ImageSourcePropType } from "react-native";
import Svg, {
  ClipPath,
  Defs,
  Image,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

function arch(w: number, h: number, i = 0) {
  const spring = Math.min(w * 0.75, h * 0.45) + i;
  const tip = i * 1.6;
  return (
    `M${i} ${h} L${i} ${spring} ` +
    `C${i} ${spring * 0.6}, ${w * 0.24} ${spring * 0.32}, ${w / 2} ${tip} ` +
    `C${w * 0.76} ${spring * 0.32}, ${w - i} ${spring * 0.6}, ${w - i} ${spring} ` +
    `L${w - i} ${h} Z`
  );
}

export default function ArchWindow({
  source,
  width,
  height,
}: {
  source: ImageSourcePropType;
  width: number;
  height: number;
}) {
  const outer = arch(width, height);
  const inner = arch(width, height, 6);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <ClipPath id="archClip">
          <Path d={inner} />
        </ClipPath>
        <LinearGradient id="archShade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0.55" stopColor="#0d3630" stopOpacity="0" />
          <Stop offset="1" stopColor="#0d3630" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>
      <Path d={outer} fill="#ffffff" fillOpacity={0.08} />
      <Path
        d={outer}
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.22}
        strokeWidth={1}
      />
      <Image
        href={source}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#archClip)"
      />
      <Rect
        width={width}
        height={height}
        fill="url(#archShade)"
        clipPath="url(#archClip)"
      />
      <Path
        d={inner}
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.35}
        strokeWidth={1}
      />
    </Svg>
  );
}
