import IconButton from "@/components/Buttons/IconButton";
import useThemeColors from "@/hooks/useThemeColors";
import { SavedHadith, toggleFavoriteHadith } from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Share, View } from "react-native";

/** Share, copy (shows ✓ for a moment) and love, as on the dhikr cards */
export default function HadithActions({
  text,
  saved,
  tint,
  buttonClassName,
}: {
  /** What share and copy put out */
  text: string;
  /** What the heart stores in favorites */
  saved: SavedHadith;
  /** Icon color override, e.g. on the teal hero card */
  tint?: string;
  buttonClassName?: string;
}) {
  const { t } = useTranslation(["common", "hadith"]);
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const loved = useAppSelector((s) =>
    s.azkar.favoriteHadiths.some((h) => h.key === saved.key),
  );

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const idle = tint ?? colors.gray;

  return (
    <View className="flex-row items-center gap-2">
      <IconButton
        icon="share"
        color={idle}
        className={buttonClassName}
        accessibilityLabel={t("share")}
        onPress={() => Share.share({ message: text })}
      />
      <IconButton
        icon={copied ? "check" : "copy"}
        color={copied ? (tint ?? colors.main) : idle}
        className={buttonClassName}
        accessibilityLabel={t(copied ? "copied" : "copy")}
        onPress={async () => {
          await Clipboard.setStringAsync(text);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setCopied(true);
        }}
      />
      <IconButton
        icon={loved ? "heartFill" : "heart"}
        color={loved ? (tint ?? colors.orange) : idle}
        className={buttonClassName}
        accessibilityLabel={t("hadith:saveHadith")}
        accessibilityState={{ selected: loved }}
        onPress={() => {
          Haptics.selectionAsync();
          dispatch(toggleFavoriteHadith(saved));
        }}
      />
    </View>
  );
}
