import AppText from "@/components/ui/AppText";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Share, View } from "react-native";

import IconButton from "@/components/Buttons/IconButton";
import Icon from "@/components/ui/Icon";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import useThemeColors from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";
import {
  incrementCount,
  progressKey,
  toggleFavoriteZikr,
} from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { Zikr } from "../_data";
import PressableScale from "@/components/ui/PressableScale";

type Props = {
  categoryId: string;
  zikr: Zikr;
  counting?: boolean;
};

export default function ZikrCard({ categoryId, zikr, counting = true }: Props) {
  const { t } = useTranslation(["azkar", "common"]);
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const textStyle = useArabicTextStyle();
  const reading = useAppSelector((s) => s.settings.reading);
  const key = progressKey(categoryId, zikr.id);
  const counted = useAppSelector((s) => s.azkar.progress[key] ?? 0);
  const loved = useAppSelector((s) => s.azkar.favoriteAdhkar.includes(key));
  const shareText = zikr.title ? `${zikr.title}\n\n${zikr.text}` : zikr.text;

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);
  const done = counting && counted >= zikr.count;

  const onCount = () => {
    if (done) return;
    const finishing = counted + 1 >= zikr.count;
    if (finishing && reading.hapticOnComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (reading.hapticOnTap) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    dispatch(incrementCount({ categoryId, itemId: zikr.id, max: zikr.count }));
  };

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={counting ? onCount : undefined}
      className={cn(
        "gap-4 overflow-hidden rounded-3xl border bg-surface p-5",
        done ? "border-main-border opacity-70" : "border-line",
      )}
    >
      {zikr.title ? (
        <AppText weight="bold" className="text-main f">
          {zikr.title}
        </AppText>
      ) : null}
      <AppText variant="quran" style={textStyle} selectable>
        {zikr.text}
      </AppText>

      <View className="flex-row items-center gap-2 border-t border-line pt-4">
        {counting ? (
          <View
            className={cn(
              "flex-row items-center gap-2 rounded-full px-4 py-2",
              done ? "bg-main-fill" : "bg-main-soft",
            )}
          >
            {done ? (
              <Icon name="check" size={14} tintColor={colors.onFill} />
            ) : null}
            <AppText
              weight="bold"
              className={done ? "text-on-fill" : "text-main"}
            >
              {done
                ? t("done")
                : t("progress", { done: counted, total: zikr.count })}
            </AppText>
          </View>
        ) : null}

        <View className="flex-1" />

        <IconButton
          icon="share"
          color={colors.gray}
          accessibilityLabel={t("common:share")}
          onPress={() => Share.share({ message: shareText })}
        />
        <IconButton
          icon={copied ? "check" : "copy"}
          color={copied ? colors.main : colors.gray}
          accessibilityLabel={t(copied ? "common:copied" : "common:copy")}
          onPress={async () => {
            await Clipboard.setStringAsync(shareText);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setCopied(true);
          }}
        />
        <IconButton
          icon={loved ? "heartFill" : "heart"}
          color={loved ? colors.love : colors.gray}
          accessibilityLabel={t("azkar:saveZikr")}
          accessibilityState={{ selected: loved }}
          onPress={() => {
            Haptics.selectionAsync();
            dispatch(toggleFavoriteZikr(key));
          }}
        />
      </View>
    </PressableScale>
  );
}
