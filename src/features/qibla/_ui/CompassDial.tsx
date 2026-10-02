import { memo } from "react";
import Svg, { Circle, Line, Text } from "react-native-svg";

const TICKS = Array.from({ length: 60 }, (_, i) => i * 6);

function CompassDial({
  size,
  aligned,
  main,
  line,
  gray,
  font,
  north,
  east,
  south,
  west,
}: {
  size: number;
  aligned: boolean;
  main: string;
  line: string;
  gray: string;
  font: string;
  north: string;
  east: string;
  south: string;
  west: string;
}) {
  const c = size / 2;
  const ring = c - 34;
  const point = (angle: number, radius: number) => ({
    x: c + radius * Math.sin((angle * Math.PI) / 180),
    y: c - radius * Math.cos((angle * Math.PI) / 180),
  });
  const cardinals = [
    { angle: 0, label: north },
    { angle: 90, label: east },
    { angle: 180, label: south },
    { angle: 270, label: west },
  ];

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={c}
        cy={c}
        r={ring}
        fill="none"
        stroke={aligned ? main : line}
        strokeWidth={aligned ? 2 : 1.5}
      />
      {TICKS.map((angle) => {
        const major = angle % 90 === 0;
        const from = point(angle, ring - 6);
        const to = point(angle, ring - (major ? 16 : 11));
        return (
          <Line
            key={angle}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={major ? main : gray}
            strokeOpacity={major ? 1 : 0.35}
            strokeWidth={major ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}
      {cardinals.map(({ angle, label }) => {
        const p = point(angle, ring + 20);
        return (
          <Text
            key={angle}
            x={p.x}
            y={p.y + 5}
            fill={angle === 0 ? main : gray}
            fontSize={14}
            fontFamily={font}
            textAnchor="middle"
            rotation={angle}
            origin={`${p.x}, ${p.y}`}
          >
            {label}
          </Text>
        );
      })}
    </Svg>
  );
}

export default memo(CompassDial);
