import useDirection from "@/hooks/useDirection";
import useThemeColors from "@/hooks/useThemeColors";
import Svg, { Path } from "react-native-svg";

export default function HeroCurve() {
  const colors = useThemeColors();
  const { isRTL } = useDirection();

  return (
    <Svg
      width="100%"
      height={46}
      viewBox="0 0 400 46"
      preserveAspectRatio="none"
      style={[
        { position: "absolute", left: 0, right: 0, bottom: -1 },
        isRTL && { transform: [{ scaleX: -1 }] },
      ]}
    >
      <Path d="M0 46 L0 0 C 110 44, 250 4, 400 36 L400 46 Z" fill={colors.bg} />
    </Svg>
  );
}
