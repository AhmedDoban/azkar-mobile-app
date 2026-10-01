import AppText from "@/components/ui/AppText";
import useDirection from "@/hooks/useDirection";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import CountdownUnit from "./CountdownUnit";

const MINT = "#4fd1a1";
const R = 35;
const SWEEP = 150;
const STROKE = 7;
const HALF = (SWEEP / 5) * (Math.PI / 180);
const ARC_H = Math.ceil(2 * R * Math.sin(HALF)) + STROKE;
const ARC_W = Math.ceil(R * (1 - Math.cos(HALF))) + STROKE;
const ARC_LEN = R * HALF * 2;

export default function PrayerCountdown({
  hours,
  minutes,
  progress,
}: {
  hours: number;
  minutes: number;
  progress: number;
}) {
  const { t } = useTranslation("prayer");
  const { isRTL } = useDirection();
  const p = Math.min(1, Math.max(0, progress));
  const cx = R + STROKE / 2;
  const cy = ARC_H / 2;
  const top = { x: cx - R * Math.cos(HALF), y: cy - R * Math.sin(HALF) };
  const bottom = { x: cx - R * Math.cos(HALF), y: cy + R * Math.sin(HALF) };
  const d = `M ${bottom.x} ${bottom.y} A ${R} ${R} 0 0 1 ${top.x} ${top.y}`;

  return (
    <View className="flex-row items-center gap-1.5">
      <Svg
        width={ARC_W}
        height={ARC_H}
        viewBox={`${cx - R - STROKE / 2} 0 ${ARC_W} ${ARC_H}`}
        style={isRTL ? { transform: [{ scaleX: -1 }] } : undefined}
      >
        <Path
          d={d}
          stroke="#ffffff"
          strokeOpacity={0.15}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d={d}
          stroke={MINT}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${ARC_LEN} ${ARC_LEN}`}
          strokeDashoffset={ARC_LEN * (1 - p)}
        />
      </Svg>

      <View className="items-center">
        <AppText className="text-xs text-white" style={{ opacity: 0.8 }}>
          {t("left")}
        </AppText>
        <View className="flex-row items-start" style={{ direction: "ltr" }}>
          <CountdownUnit value={String(hours)} unit={t("hour")} />
          <AppText weight="bold" className="text-[28px] leading-9 text-white">
            :
          </AppText>
          <CountdownUnit
            value={String(minutes).padStart(2, "0")}
            unit={t("minute")}
          />
        </View>
      </View>
    </View>
  );
}
