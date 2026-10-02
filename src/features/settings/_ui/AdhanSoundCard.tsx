import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";
import SelectableCard from "./SelectableCard";
import SelectionCheck from "./SelectionCheck";

export default function AdhanSoundCard({
  label,
  hint,
  selected,
  playing,
  previewLabel,
  onPress,
  onPreview,
  changeLabel,
  onChange,
}: {
  label: string;
  hint: string;
  selected: boolean;
  playing: boolean;
  previewLabel: string;
  onPress: () => void;
  onPreview?: () => void;
  changeLabel?: string;
  onChange?: () => void;
}) {
  const colors = useThemeColors();
  const palette = useSettingsColors();

  return (
    <SelectableCard label={label} selected={selected} onPress={onPress}>
      {onPreview ? (
        <PressableScale
          onPress={onPreview}
          accessibilityRole="button"
          accessibilityLabel={previewLabel}
          className="size-11 items-center justify-center rounded-full"
          style={{ backgroundColor: playing ? colors.accent : palette.track }}
        >
          <Icon
            name={playing ? "stop" : "play"}
            size={18}
            tintColor={
              playing ? (colors.isDark ? "#0a0a0a" : "#ffffff") : colors.accent
            }
          />
        </PressableScale>
      ) : (
        <View
          className="size-11 items-center justify-center rounded-full"
          style={{ backgroundColor: palette.track }}
        >
          <Icon name="upload" size={18} tintColor={colors.accent} />
        </View>
      )}

      <View className="flex-1">
        <AppText weight="bold" className="text-base">
          {label}
        </AppText>
        <AppText className="text-xs" style={{ color: palette.subtitle }}>
          {hint}
        </AppText>
      </View>

      {onChange ? (
        <PressableScale
          onPress={onChange}
          accessibilityRole="button"
          accessibilityLabel={changeLabel}
          className="size-9 items-center justify-center rounded-full"
          style={{ backgroundColor: palette.track }}
        >
          <Icon name="upload" size={16} tintColor={colors.accent} />
        </PressableScale>
      ) : null}

      <SelectionCheck selected={selected} idleColor={palette.subtitle} />
    </SelectableCard>
  );
}
