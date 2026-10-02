import AppText from "@/components/ui/AppText";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { Linking, View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";
import SettingsIconBadge from "./SettingsIconBadge";

export default function SourceRow({
  icon,
  name,
  usage,
  url,
}: {
  icon: IconKey;
  name: string;
  usage: string;
  url: string;
}) {
  const palette = useSettingsColors();

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => Linking.openURL(url)}
      accessibilityRole="link"
      accessibilityLabel={name}
      className="flex-row items-center gap-3 py-3"
    >
      <SettingsIconBadge icon={icon} size={17} />
      <View className="flex-1 gap-0.5">
        <AppText weight="bold" className="text-[15px]">
          {name}
        </AppText>
        <AppText className="text-sm" style={{ color: palette.subtitle }}>
          {usage}
        </AppText>
        <AppText
          className="text-xs"
          style={{ color: palette.subtitle, writingDirection: "ltr" }}
        >
          {url.replace(/^https?:\/\/(www\.)?/, "")}
        </AppText>
      </View>
      <Icon name="arrowUpForward" size={16} tintColor={palette.subtitle} />
    </PressableScale>
  );
}
