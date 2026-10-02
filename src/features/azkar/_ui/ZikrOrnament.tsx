import { memo } from "react";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const FLOWER =
  "M 0 -1 C -2.6 -2.4, -2 -6.6, 0 -7 C 2 -6.6, 2.6 -2.4, 0 -1 Z " +
  "M 1 0 C 2.4 -2.6, 6.6 -2, 7 0 C 6.6 2, 2.4 2.6, 1 0 Z " +
  "M 0 1 C 2.6 2.4, 2 6.6, 0 7 C -2 6.6, -2.6 2.4, 0 1 Z " +
  "M -1 0 C -2.4 2.6, -6.6 2, -7 0 C -6.6 -2, -2.4 -2.6, -1 0 Z";

export default memo(function ZikrOrnament({ color }: { color: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <View className="h-px w-10" style={{ backgroundColor: color }} />
      <Svg width={16} height={16} viewBox="-8 -8 16 16">
        <Path d={FLOWER} fill="none" stroke={color} strokeWidth={1.1} />
        <Circle r={1.2} fill={color} />
      </Svg>
      <View className="h-px w-10" style={{ backgroundColor: color }} />
    </View>
  );
});
