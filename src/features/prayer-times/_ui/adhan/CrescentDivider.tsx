import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { crescentPath } from "./crescent";

export default function CrescentDivider({ color }: { color: string }) {
  const line = (
    <View
      className="h-px flex-1"
      style={{ backgroundColor: color, opacity: 0.45 }}
    />
  );
  const dot = (
    <View
      className="size-1.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );

  return (
    <View className="w-full flex-row items-center gap-2 px-6">
      {line}
      {dot}
      <Svg width={26} height={26} viewBox="0 0 26 26">
        <Path d={crescentPath(12, 13, 9)} fill={color} />
        <Circle cx="18" cy="8" r="1.6" fill={color} />
      </Svg>
      {dot}
      {line}
    </View>
  );
}
