import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PrayerStatus } from "../_components/usePrayerSchedule";
import usePrayerReminder from "../_components/usePrayerReminder";
import { PRAYER_ICONS, PrayerName } from "../_data/types";

const INK = "#0e3a33";
const MINT_FILL = "#dff3ea";

export default function PrayerCell({
  prayer,
  label,
  time,
  status,
  onDenied,
}: {
  prayer: PrayerName;
  label: string;
  time: string;
  status: PrayerStatus;
  onDenied: () => void;
}) {
  const { t } = useTranslation("prayer");
  const { enabled, toggle } = usePrayerReminder(prayer, onDenied);
  const isNext = status === "next";
  const color = isNext ? INK : "#ffffff";

  return (
    <PressableScale
      scaleTo={0.92}
      onPress={toggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: enabled }}
      accessibilityLabel={`${label} ${time}, ${t(enabled ? "reminderOn" : "reminderOff")}`}
      className="flex-1 items-center gap-1 rounded-2xl py-3"
      style={[
        isNext && { backgroundColor: MINT_FILL },
        status === "passed" && { opacity: 0.55 },
      ]}
    >
      <AppText
        weight={isNext ? "bold" : "regular"}
        className="text-xs"
        style={{ color }}
        numberOfLines={1}
      >
        {label}
      </AppText>
      <AppText
        weight="bold"
        className="text-[15px]"
        style={{ color, writingDirection: "ltr" }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {time}
      </AppText>
      <View>
        <Icon name={PRAYER_ICONS[prayer]} size={18} tintColor={color} />
        {enabled ? null : (
          <View
            className="absolute -end-2.5 -top-1.5 size-3.5 items-center justify-center rounded-full"
            style={{ backgroundColor: isNext ? INK : "#ffffff" }}
          >
            <Icon
              name="bellSlash"
              size={8}
              tintColor={isNext ? MINT_FILL : INK}
            />
          </View>
        )}
      </View>
    </PressableScale>
  );
}
