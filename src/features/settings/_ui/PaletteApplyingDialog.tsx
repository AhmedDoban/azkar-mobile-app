import AppText from "@/components/ui/AppText";
import Dialog from "@/components/ui/Dialog";
import useThemeColors from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

const noop = () => {};

export default function PaletteApplyingDialog({
  visible,
}: {
  visible: boolean;
}) {
  const { t } = useTranslation("settings");
  const colors = useThemeColors();
  const palette = useSettingsColors();

  return (
    <Dialog visible={visible} onClose={noop} dismissible={false}>
      <ActivityIndicator size="large" color={colors.accent} />
      <AppText weight="bold" className="text-center text-base">
        {t("paletteApplying")}
      </AppText>
      <AppText
        className="text-center text-sm"
        style={{ color: palette.subtitle }}
      >
        {t("paletteApplyingHint")}
      </AppText>
    </Dialog>
  );
}
