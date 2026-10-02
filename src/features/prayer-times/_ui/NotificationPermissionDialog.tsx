import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import useSettingsColors from "@/features/settings/_components/useSettingsColors";
import useThemeColors from "@/hooks/useThemeColors";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Linking, Modal, Pressable, StyleSheet, View } from "react-native";

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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center px-8">
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.5)" },
          ]}
          onPress={onClose}
          accessibilityLabel={t("notNow")}
        />

        <View
          className="w-full max-w-sm items-center gap-4 rounded-3xl border p-6"
          style={{ backgroundColor: palette.card, borderColor: palette.border }}
        >
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
        </View>
      </View>
    </Modal>
  );
}
