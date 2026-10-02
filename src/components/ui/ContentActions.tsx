import IconButton from "@/components/Buttons/IconButton";
import useThemeColors from "@/hooks/useThemeColors";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Share, StyleProp, View, ViewStyle } from "react-native";

export default function ContentActions({
  text,
  loved,
  loveLabel,
  onToggleLove,
  idleColor,
  activeColor,
  buttonClassName,
  buttonStyle,
}: {
  text: string;
  loved: boolean;
  loveLabel: string;
  onToggleLove: () => void;
  idleColor: string;
  activeColor: string;
  buttonClassName?: string;
  buttonStyle?: StyleProp<ViewStyle>;
}) {
  const { t } = useTranslation("common");
  const colors = useThemeColors();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <View className="flex-row items-center gap-2">
      <IconButton
        icon="share"
        color={idleColor}
        className={buttonClassName}
        style={buttonStyle}
        accessibilityLabel={t("share")}
        onPress={() => Share.share({ message: text })}
      />
      <IconButton
        icon={copied ? "check" : "copy"}
        color={copied ? activeColor : idleColor}
        className={buttonClassName}
        style={buttonStyle}
        accessibilityLabel={t(copied ? "copied" : "copy")}
        onPress={async () => {
          await Clipboard.setStringAsync(text);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setCopied(true);
        }}
      />
      <IconButton
        icon={loved ? "heartFill" : "heart"}
        color={loved ? colors.love : idleColor}
        className={buttonClassName}
        style={buttonStyle}
        accessibilityLabel={loveLabel}
        accessibilityState={{ selected: loved }}
        onPress={() => {
          Haptics.selectionAsync();
          onToggleLove();
        }}
      />
    </View>
  );
}
