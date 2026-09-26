import useThemeColors from "@/hooks/useThemeColors";
import Svg, { Path } from "react-native-svg";

/** The Kaaba in the app's teal: a cube seen slightly from above, with its band and door */
export default function KaabaIcon({ size = 48 }: { size?: number }) {
  const colors = useThemeColors();

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {/* Top face */}
      <Path d="M8 14 L24 8 L40 14 L24 20 Z" fill={colors.main} fillOpacity={0.55} />
      {/* Front faces */}
      <Path d="M8 14 L24 20 L24 42 L8 36 Z" fill={colors.main} />
      <Path d="M24 20 L40 14 L40 36 L24 42 Z" fill={colors.main} fillOpacity={0.8} />
      {/* The band (hizam) */}
      <Path d="M8 19 L24 25 L40 19 L40 22 L24 28 L8 22 Z" fill={colors.surface} fillOpacity={0.9} />
      {/* Door */}
      <Path d="M30 31.75 L35 29.9 L35 37.9 L30 39.75 Z" fill={colors.surface} fillOpacity={0.75} />
    </Svg>
  );
}
