import AppText from "@/components/ui/AppText";
import useThemeColors from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";
import { View } from "react-native";
import { PrayerName } from "../_data/types";
import { PrayerStatus } from "../_components/usePrayerSchedule";
import ReminderBell from "./ReminderBell";

/**
 * One chip in the hero card's prayer row: name, time and the reminder bell.
 * The next prayer's chip is solid; passed ones fade back.
 */
export default function PrayerCell({
  prayer,
  label,
  time,
  status,
}: {
  prayer: PrayerName;
  label: string;
  time: string;
  status: PrayerStatus;
}) {
  const colors = useThemeColors();
  const isNext = status === "next";

  return (
    <View
      className={cn(
        "flex-1 items-center rounded-2xl px-1 pt-2.5",
        isNext ? "bg-on-hero" : "bg-hero-blob",
        status === "passed" && "opacity-50",
      )}
    >
      <AppText
        weight={isNext ? "bold" : "regular"}
        className={cn("text-[11px]", isNext ? "text-hero" : "text-on-hero-muted")}
        numberOfLines={1}
      >
        {label}
      </AppText>
      <AppText
        weight="bold"
        className={cn("text-xs", isNext ? "text-hero" : "text-on-hero")}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {time}
      </AppText>
      <ReminderBell
        prayer={prayer}
        tint={isNext ? colors.hero : colors.onHero}
      />
    </View>
  );
}
