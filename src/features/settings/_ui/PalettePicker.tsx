import { PALETTE_IDS } from "@/constants/palettes";
import { setPalette } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import PaletteSwatch from "./PaletteSwatch";

export default function PalettePicker() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.settings.palette);

  return (
    <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-y-4">
      {PALETTE_IDS.map((id) => (
        <PaletteSwatch
          key={id}
          id={id}
          label={t(`palettes.${id}`)}
          selected={current === id}
          onPress={() => {
            Haptics.selectionAsync();
            dispatch(setPalette(id));
          }}
        />
      ))}
    </View>
  );
}
