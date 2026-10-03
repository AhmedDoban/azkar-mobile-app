import AppText from "@/components/ui/AppText";
import { PALETTE_IDS } from "@/constants/palettes";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { androidAppIconAvailable } from "../../../../modules/app-icon";
import usePaletteChange from "../_components/usePaletteChange";
import useSettingsColors from "../_components/useSettingsColors";
import PaletteApplyingDialog from "./PaletteApplyingDialog";
import PaletteSwatch from "./PaletteSwatch";

export default function PalettePicker() {
  const { t } = useTranslation("settings");
  const palette = useSettingsColors();
  const { current, applying, change } = usePaletteChange();

  return (
    <View className="gap-3">
      <View
        accessibilityRole="radiogroup"
        className="flex-row flex-wrap gap-y-4"
      >
        {PALETTE_IDS.map((id) => (
          <PaletteSwatch
            key={id}
            id={id}
            label={t(`palettes.${id}`)}
            selected={current === id}
            onPress={() => change(id)}
          />
        ))}
      </View>
      {androidAppIconAvailable ? (
        <AppText className="text-xs" style={{ color: palette.subtitle }}>
          {t("paletteIconHint")}
        </AppText>
      ) : null}
      <PaletteApplyingDialog visible={applying} />
    </View>
  );
}
