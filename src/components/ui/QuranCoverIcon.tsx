import type { ColorValue } from "react-native";
import Svg, { Path, Text } from "react-native-svg";

const OUTLINE = [
  "M21 17H6.5C5.11929 17 4 18.1193 4 19.5C4 20.8807 5.11929 22 6.5 22H21",
  "M21 22C19.6193 22 18.5 20.8807 18.5 19.5C18.5 18.1193 19.6193 17 21 17",
  "M4 19.5V5.5C4 3.567 5.567 2 7.5 2H17.5C19.433 2 21 3.567 21 5.5V17",
];

export default function QuranCoverIcon({
  size,
  color,
  strokeWidth,
}: {
  size: number;
  color?: ColorValue;
  strokeWidth: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {OUTLINE.map((d) => (
        <Path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      <Text
        x={12.5}
        y={8.6}
        fontFamily="Amiri-Bold"
        fontSize={5.6}
        textAnchor="middle"
        fill={color}
      >
        القرءان
      </Text>
      <Text
        x={12.5}
        y={14.2}
        fontFamily="Amiri-Bold"
        fontSize={5.6}
        textAnchor="middle"
        fill={color}
      >
        الكريم
      </Text>
    </Svg>
  );
}
