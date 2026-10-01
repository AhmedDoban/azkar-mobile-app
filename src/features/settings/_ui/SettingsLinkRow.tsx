import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { Linking, View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

export default function SettingsLinkRow({
  icon,
  title,
  subtitle,
  url,
}: {
  icon: IconKey;
  title: string;
  subtitle?: string;
  url?: string;
}) {
  const colors = useThemeColors();
  const palette = useSettingsColors();

  const body = (
    <View className="flex-row items-center gap-3">
      <View className="size-9 items-center justify-center rounded-full bg-accent-soft">
        <Icon name={icon} size={16} tintColor={colors.accent} />
      </View>
      <View className="flex-1 gap-0.5">
        <AppText weight="bold" className="text-[15px]">
          {title}
        </AppText>
        {subtitle ? (
          <AppText className="text-xs" style={{ color: palette.subtitle }}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {url ? (
        <Icon name="arrowUpForward" size={14} tintColor={palette.subtitle} />
      ) : null}
    </View>
  );

  if (!url) return body;

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => Linking.openURL(url)}
      accessibilityRole="link"
      accessibilityLabel={title}
    >
      {body}
    </PressableScale>
  );
}
