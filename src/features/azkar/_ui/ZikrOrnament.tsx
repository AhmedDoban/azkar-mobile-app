import { View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

export default function ZikrOrnament({ color }: { color: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <View className="h-px w-10" style={{ backgroundColor: color }} />
      <Svg width={16} height={16} viewBox="-8 -8 16 16">
        <G>
          {[0, 90, 180, 270].map((angle) => (
            <Path
              key={angle}
              d="M 0 -1 C -2.6 -2.4, -2 -6.6, 0 -7 C 2 -6.6, 2.6 -2.4, 0 -1 Z"
              fill="none"
              stroke={color}
              strokeWidth={1.1}
              transform={`rotate(${angle})`}
            />
          ))}
          <Circle r={1.2} fill={color} />
        </G>
      </Svg>
      <View className="h-px w-10" style={{ backgroundColor: color }} />
    </View>
  );
}
