import AppText from "@/components/ui/AppText";
import Dialog from "@/components/ui/Dialog";
import PressableScale from "@/components/ui/PressableScale";
import useSettingsColors from "@/features/settings/_components/useSettingsColors";
import useThemeColors from "@/hooks/useThemeColors";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Linking, View } from "react-native";

const BELL_ANIMATION = require("@/assets/animations/bell.json");

export default function NotificationPermissionDialog({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation("prayer");
  const colors = useThemeColors();
  const palette = useSettingsColors();

  const openSettings = () => {
    onClose();
    Linking.openSettings();
  };

  return (
    <Dialog visible={visible} onClose={onClose} closeLabel={t("notNow")}>
      <LottieView
        source={BELL_ANIMATION}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
        colorFilters={[
          { keypath: "bell", color: colors.accent },
          { keypath: "waves", color: colors.accent },
          { keypath: "glow", color: colors.accent },
        ]}
      />
      <View className="gap-2">
        <AppText
          weight="bold"
          className="text-lg"
          style={{ textAlign: "center" }}
        >
          {t("notificationsTitle")}
        </AppText>
        <AppText
          className="text-sm leading-6"
          style={{ color: palette.subtitle, textAlign: "center" }}
        >
          {t("permissionDenied")}
        </AppText>
      </View>
      <View className="w-full flex-row gap-3 pt-1">
        <PressableScale
          onPress={onClose}
          className="flex-1 items-center rounded-full py-3.5"
          style={{ backgroundColor: palette.track }}
        >
          <AppText weight="bold">{t("notNow")}</AppText>
        </PressableScale>
        <PressableScale
          onPress={openSettings}
          className="flex-1 items-center rounded-full py-3.5"
          style={{ backgroundColor: colors.accent }}
        >
          <AppText
            weight="bold"
            style={{ color: colors.isDark ? "#0a0a0a" : "#ffffff" }}
          >
            {t("openSettings")}
          </AppText>
        </PressableScale>
      </View>
    </Dialog>
  );
}
