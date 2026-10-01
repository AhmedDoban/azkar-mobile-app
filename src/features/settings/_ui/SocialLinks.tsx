import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { DEVELOPER } from "@/constants/developer";
import useThemeColors from "@/hooks/useThemeColors";
import { Linking, View } from "react-native";

export default function SocialLinks() {
  const colors = useThemeColors();

  return (
    <View className="flex-row flex-wrap justify-center gap-5">
      {DEVELOPER.links.map((link) => (
        <PressableScale
          key={link.url}
          scaleTo={0.85}
          onPress={() => Linking.openURL(link.url)}
          accessibilityRole="link"
          accessibilityLabel={link.label}
          className="size-10 items-center justify-center"
        >
          <Icon
            name={link.brand}
            size={24}
            strokeWidth={1.4}
            tintColor={colors.ink}
          />
        </PressableScale>
      ))}
    </View>
  );
}
