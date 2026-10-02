import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { setAyahColor } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { View } from "react-native";
import usePopupColors from "../_components/usePopupColors";
import { AYAH_COLORS } from "../_data/ayahColors";

const OPTIONS = [null, ...AYAH_COLORS.map((_, i) => i)];

export default function AyahColorPicker({ ayahKey }: { ayahKey: string }) {
  const c = usePopupColors();
  const dispatch = useAppDispatch();
  const color = useAppSelector((s) => s.settings.ayahColors[ayahKey]);

  return (
    <View
      className="flex-row items-center justify-between rounded-2xl px-4 py-3"
      style={{ backgroundColor: c.page }}
    >
      {OPTIONS.map((value) => {
        const selected = value === null ? color === undefined : color === value;
        return (
          <PressableScale
            key={String(value)}
            onPress={() => {
              Haptics.selectionAsync();
              dispatch(setAyahColor({ key: ayahKey, color: value }));
            }}
            className="size-11 items-center justify-center rounded-full"
            style={{
              borderWidth: selected ? 2.5 : 0,
              borderColor: c.accent,
            }}
          >
            <View
              className="size-9 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  value === null ? "transparent" : AYAH_COLORS[value],
                borderWidth: value === null ? 1.5 : 0,
                borderColor: c.gold,
              }}
            >
              {value === null ? (
                <Icon name="close" size={16} tintColor={c.gold} />
              ) : null}
            </View>
          </PressableScale>
        );
      })}
    </View>
  );
}
