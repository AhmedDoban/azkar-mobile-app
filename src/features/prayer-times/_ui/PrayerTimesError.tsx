import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";

const openSettings = () => Linking.openSettings();

export default function PrayerTimesError({
  denied,
  onRetry,
}: {
  denied: boolean;
  onRetry: () => void;
}) {
  const { t } = useTranslation(["prayer", "common"]);
  const colors = useThemeColors();

  return (
    <PressableScale
      onPress={denied ? openSettings : onRetry}
      className="flex-row items-center justify-center gap-3 rounded-3xl border border-line bg-surface p-5"
    >
      <Icon
        name={denied ? "location" : "wifiOff"}
        size={16}
        tintColor={colors.orange}
      />
      <AppText className="shrink text-main-gray">
        {t(denied ? "locationNeeded" : "error")}
      </AppText>
      <AppText weight="bold" className="text-main">
        {t(denied ? "openSettings" : "common:retry")}
      </AppText>
    </PressableScale>
  );
}
