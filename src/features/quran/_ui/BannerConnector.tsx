import { Circle, G, Path, Rect } from "react-native-svg";
import { MID } from "../_components/bannerPaths";
import useMushafColors from "../_components/useMushafColors";

const STAR = 12;
const DIAMOND = 2.6;

const diamond = (x: number) =>
  `M ${x - DIAMOND} ${MID} L ${x} ${MID - DIAMOND} L ${x + DIAMOND} ${MID} L ${x} ${MID + DIAMOND} Z`;

export default function BannerConnector({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const c = useMushafColors();
  const mid = (from + to) / 2;

  return (
    <G>
      <Path
        d={`M ${from} ${MID - 2} H ${to} M ${from} ${MID + 2} H ${to}`}
        stroke={c.gold}
        strokeWidth={0.7}
      />
      <Path
        d={`${diamond(from + (mid - from) * 0.45)} ${diamond(to - (to - mid) * 0.45)}`}
        fill={c.gold}
      />
      {[0, 45].map((angle) => (
        <Rect
          key={angle}
          x={mid - STAR / 2}
          y={MID - STAR / 2}
          width={STAR}
          height={STAR}
          fill={c.page}
          stroke={c.gold}
          strokeWidth={0.9}
          transform={`rotate(${angle} ${mid} ${MID})`}
        />
      ))}
      <Circle cx={mid} cy={MID} r={1.6} fill={c.gold} />
    </G>
  );
}
