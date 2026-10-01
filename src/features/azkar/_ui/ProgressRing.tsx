import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";

export default function ProgressRing({
  progress,
  color,
  track,
  checkColor = "#ffffff",
  size = 44,
  stroke = 4,
}: {
  progress: number;
  color: string;
  track: string;
  checkColor?: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const complete = progress >= 1;

  if (complete) {
    return (
      <View
        className="items-center justify-center rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      >
        <Icon name="check" size={18} tintColor={checkColor} />
      </View>
    );
  }

  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center"
    >
      <Svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={track}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </Svg>
      <AppText
        weight="bold"
        className="text-[11px]"
        style={{ color, textAlign: "center" }}
      >
        {`${Math.round(progress * 100)}%`}
      </AppText>
    </View>
  );
}
