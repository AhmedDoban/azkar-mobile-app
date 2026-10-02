import useDirection from "@/hooks/useDirection";
import useThemeColors from "@/hooks/useThemeColors";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated, { type SharedValue } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import useCompassRotation from "../_components/useCompassRotation";
import CompassDial from "./CompassDial";

function Compass({
  size,
  heading,
  bearing,
  aligned,
}: {
  size: number;
  heading: SharedValue<number>;
  bearing: number;
  aligned: boolean;
}) {
  const { t } = useTranslation("qibla");
  const colors = useThemeColors();
  const { isRTL } = useDirection();
  const font = isRTL ? "LamaSans" : "SpaceGrotesk";

  const dialStyle = useCompassRotation(heading, 0);
  const arrowStyle = useCompassRotation(heading, bearing);

  const arrow = size * 0.16;

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[StyleSheet.absoluteFill, dialStyle]}>
        <CompassDial
          size={size}
          aligned={aligned}
          main={colors.main}
          line={colors.line}
          gray={colors.gray}
          font={font}
          north={t("north")}
          east={t("east")}
          south={t("south")}
          west={t("west")}
        />
      </Animated.View>

      <Animated.View
        style={[StyleSheet.absoluteFill, arrowStyle]}
        className="items-center justify-center"
      >
        <Svg width={arrow * 2} height={arrow * 2} viewBox="-20 -20 40 40">
          <Path
            d="M 0 -18 L 13 14 L 0 7 L -13 14 Z"
            fill={aligned ? colors.mainFill : colors.main}
            fillOpacity={aligned ? 1 : 0.85}
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

export default memo(Compass);
