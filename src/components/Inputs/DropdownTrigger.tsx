import { View } from "react-native";
import useThemeColors from "@/hooks/useThemeColors";
import AppText from "../ui/AppText";
import Icon, { IconKey } from "../ui/Icon";

export type DropdownOption<T extends string> = {
  value: T;
  icon: IconKey;
  label: string;
};

export type DropdownProps<T extends string> = {
  options: readonly DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
};

/** The row that shows the current choice; shared by the iOS and fallback dropdowns */
export default function DropdownTrigger({
  icon,
  label,
}: {
  icon: IconKey;
  label: string;
}) {
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center gap-3">
      <View className="size-9 items-center justify-center rounded-full bg-main-soft">
        <Icon name={icon} size={18} tintColor={colors.main} />
      </View>
      <AppText weight="bold" className="flex-1 text-base">
        {label}
      </AppText>
      <Icon name="chevronUpDown" size={14} tintColor={colors.gray} />
    </View>
  );
}
