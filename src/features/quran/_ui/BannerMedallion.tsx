import { Circle, G, Path } from "react-native-svg";
import { MID, petalPath } from "../_components/bannerShapes";
import useMushafColors from "../_components/useMushafColors";

const R = 21;

export default function BannerMedallion({ cx }: { cx: number }) {
  const c = useMushafColors();
  const outer = petalPath(cx, MID, R - 4);
  const inner = petalPath(cx, MID, 9);

  return (
    <G>
      <Circle
        cx={cx}
        cy={MID}
        r={R}
        fill={c.page}
        stroke={c.gold}
        strokeWidth={1.2}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <Path
          key={`o${i}`}
          d={outer}
          fill={c.frameFill}
          stroke={c.gold}
          strokeWidth={0.7}
          transform={`rotate(${i * 45 + 22.5} ${cx} ${MID})`}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Path
          key={`i${i}`}
          d={inner}
          fill={c.page}
          stroke={c.gold}
          strokeWidth={0.7}
          transform={`rotate(${i * 45 + 45} ${cx} ${MID})`}
        />
      ))}
      <Circle cx={cx} cy={MID} r={2.5} fill={c.gold} />
    </G>
  );
}
