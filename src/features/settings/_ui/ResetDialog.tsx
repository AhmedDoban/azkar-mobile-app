import AppText from "@/components/ui/AppText";
import Dialog from "@/components/ui/Dialog";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

const DONE_ANIMATION = require("@/assets/animations/reset-done.json");

export type ResetDialogContent = {
  icon: IconKey;
  title: string;
  message: string;
  confirmLabel: string;
  doneText: string;
  danger: boolean;
  onConfirm: () => void;
};

export default function ResetDialog({
  content,
  onClose,
}: {
  content: ResetDialogContent | null;
  onClose: () => void;
}) {
  const { t } = useTranslation("settings");
  const colors = useThemeColors();
  const palette = useSettingsColors();
  const [done, setDone] = useState(false);

  const visible = content !== null;
  const tone = content?.danger ? palette.danger : colors.accent;

  useEffect(() => {
    if (visible) setDone(false);
  }, [visible]);

  const confirm = () => {
    content?.onConfirm();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setDone(true);
  };

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      closeLabel={t("cancel")}
      dismissible={!done}
    >
      {done ? (
        <>
          <LottieView
            source={DONE_ANIMATION}
            autoPlay
            loop={false}
            style={{ width: 120, height: 120 }}
            colorFilters={[
              { keypath: "circle", color: colors.accent },
              { keypath: "check", color: colors.accent },
            ]}
            onAnimationFinish={() => setTimeout(onClose, 500)}
          />
          <AppText
            weight="bold"
            className="text-lg"
            style={{ textAlign: "center" }}
          >
            {content?.doneText}
          </AppText>
        </>
      ) : (
        <>
          <View
            className="size-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${tone.slice(0, 7)}1f` }}
          >
            {content ? (
              <Icon name={content.icon} size={28} tintColor={tone} />
            ) : null}
          </View>
          <View className="gap-2">
            <AppText
              weight="bold"
              className="text-lg"
              style={{ textAlign: "center" }}
            >
              {content?.title}
            </AppText>
            <AppText
              className="text-sm leading-6"
              style={{ color: palette.subtitle, textAlign: "center" }}
            >
              {content?.message}
            </AppText>
          </View>
          <View className="w-full flex-row gap-3 pt-1">
            <PressableScale
              onPress={onClose}
              className="flex-1 items-center rounded-full py-3.5"
              style={{ backgroundColor: palette.track }}
            >
              <AppText weight="bold">{t("cancel")}</AppText>
            </PressableScale>
            <PressableScale
              onPress={confirm}
              className="flex-1 items-center rounded-full py-3.5"
              style={{ backgroundColor: tone }}
            >
              <AppText
                weight="bold"
                style={{
                  color:
                    content?.danger || !colors.isDark ? "#ffffff" : "#0a0a0a",
                }}
              >
                {content?.confirmLabel}
              </AppText>
            </PressableScale>
          </View>
        </>
      )}
    </Dialog>
  );
}
