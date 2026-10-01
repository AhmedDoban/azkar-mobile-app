import { Circle, G, Path } from "react-native-svg";
import { MID, petalPath } from "../_components/bannerPaths";
import useMushafColors from "../_components/useMushafColors";

export default function BannerMedallion({
  cx,
  radius,
}: {
  cx: number;
  radius: number;
}) {
  const c = useMushafColors();
  const petal = petalPath(cx, radius - 6);

  return (
    <G>
      <Circle
        cx={cx}
        cy={MID}
        r={radius}
        fill={c.page}
        stroke={c.gold}
        strokeWidth={1.1}
      />
      <Circle
        cx={cx}
        cy={MID}
        r={radius - 3}
        fill="none"
        stroke={c.frame}
        strokeWidth={0.7}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <Path
          key={i}
          d={petal}
          fill={c.frameFill}
          stroke={c.gold}
          strokeWidth={0.7}
          transform={`rotate(${i * 45} ${cx} ${MID})`}
        />
      ))}
      <Circle cx={cx} cy={MID} r={2.6} fill={c.gold} />
    </G>
  );
}
