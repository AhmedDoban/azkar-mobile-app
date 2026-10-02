import AppText from "@/components/ui/AppText";
import Dialog from "@/components/ui/Dialog";
import PressableScale from "@/components/ui/PressableScale";
import useSettingsColors from "@/features/settings/_components/useSettingsColors";
import useThemeColors from "@/hooks/useThemeColors";
import openNetworkSettings from "@/lib/openNetworkSettings";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const ANIMATION = require("@/assets/animations/no-internet.json");

const ANIMATION_STYLE = { width: 120, height: 120 };

export default function NoInternetDialog({
  visible,
  message,
  onClose,
}: {
  visible: boolean;
  message?: string;
  onClose: () => void;
}) {
  const { t } = useTranslation("common");
  const colors = useThemeColors();
  const palette = useSettingsColors();

  const openSettings = () => {
    onClose();
    openNetworkSettings();
  };

  return (
    <Dialog visible={visible} onClose={onClose} closeLabel={t("offline.later")}>
      <LottieView
        source={ANIMATION}
        autoPlay
        loop
        style={ANIMATION_STYLE}
        colorFilters={[
          { keypath: "wifi", color: colors.accent },
          { keypath: "slash", color: colors.accent },
          { keypath: "glow", color: colors.accent },
        ]}
      />
      <View className="gap-2">
        <AppText
          weight="bold"
          className="text-lg"
          style={{ textAlign: "center" }}
        >
          {t("offline.title")}
        </AppText>
        <AppText
          className="text-sm leading-6"
          style={{ color: palette.subtitle, textAlign: "center" }}
        >
          {message ?? t("offline.message")}
        </AppText>
      </View>
      <View className="w-full flex-row gap-3 pt-1">
        <PressableScale
          onPress={onClose}
          className="flex-1 items-center rounded-full py-3.5"
          style={{ backgroundColor: palette.track }}
        >
          <AppText weight="bold">{t("offline.later")}</AppText>
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
            {t("offline.openSettings")}
          </AppText>
        </PressableScale>
      </View>
    </Dialog>
  );
}
