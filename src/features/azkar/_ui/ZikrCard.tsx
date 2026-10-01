import IconButton from "@/components/Buttons/IconButton";
import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import useHadithColors from "@/features/hadith/_components/useHadithColors";
import useArabicTextStyle from "@/hooks/useArabicTextStyle";
import useThemeColors from "@/hooks/useThemeColors";
import {
  incrementCount,
  progressKey,
  toggleFavoriteZikr,
} from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Share, View } from "react-native";
import { Zikr } from "../_data";
import Icon from "@/components/ui/Icon";
import useDirection from "@/hooks/useDirection";
import ZikrCardBackdrop from "./ZikrCardBackdrop";
import ZikrOrnament from "./ZikrOrnament";

type Props = {
  categoryId: string;
  zikr: Zikr;
  counting?: boolean;
  position?: { index: number; total: number };
};

const ORNAMENT_GOLD = "#c9a96e";

export default function ZikrCard({
  categoryId,
  zikr,
  counting = true,
  position,
}: Props) {
  const { t } = useTranslation(["azkar", "common"]);
  const colors = useThemeColors();
  const p = useHadithColors();
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

  const [size, setSize] = useState({ width: 0, height: 0 });
  const { isRTL } = useDirection();

  const actions = [
    {
      icon: loved ? ("heartFill" as const) : ("heart" as const),
      label: t("azkar:saveZikr"),
      color: loved ? colors.love : p.muted,
      onPress: () => {
        Haptics.selectionAsync();
        dispatch(toggleFavoriteZikr(key));
      },
    },
    {
      icon: copied ? ("check" as const) : ("copy" as const),
      label: t(copied ? "common:copied" : "common:copy"),
      color: copied ? p.accent : p.muted,
      onPress: async () => {
        await Clipboard.setStringAsync(shareText);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCopied(true);
      },
    },
    {
      icon: "share" as const,
      label: t("common:share"),
      color: p.muted,
      onPress: () => Share.share({ message: shareText }),
    },
  ];

  return (
    <PressableScale
      scaleTo={0.98}
      onPress={counting ? onCount : undefined}
      className="gap-3 overflow-hidden rounded-3xl border px-4 pb-4 pt-3"
      style={{
        borderColor: done ? p.accent : p.line,
        backgroundColor: p.card,
        boxShadow: "0 4px 14px rgba(9, 43, 56, 0.07)",
      }}
      onLayout={(e) =>
        setSize({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        })
      }
    >
      {size.width > 0 ? (
        <ZikrCardBackdrop
          top={p.card}
          bottom={p.paper}
          wave={p.chip}
          ornament={p.accent}
          cornerX={isRTL ? 0 : size.width}
          width={size.width}
          height={size.height}
        />
      ) : null}

      <View className="flex-row items-center">
        <View className="flex-1 items-start">
          {position && position.total > 1 ? (
            <View
              className="rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: p.chip }}
            >
              <AppText className="text-xs" style={{ color: p.muted }}>
                {`${position.index} / ${position.total}`}
              </AppText>
            </View>
          ) : null}
        </View>
        <ZikrOrnament color={ORNAMENT_GOLD} />
        <View className="flex-1" />
      </View>

      {zikr.title ? (
        <AppText weight="bold" className="text-sm" style={{ color: p.accent }}>
          {zikr.title}
        </AppText>
      ) : null}

      <AppText variant="quran" style={[textStyle, { color: p.ink }]} selectable>
        {zikr.text}
      </AppText>

      <View className="flex-row items-center gap-2 pt-1">
        {counting ? (
          <View
            className="flex-row items-baseline gap-1 rounded-full px-3.5 py-1.5"
            style={{ backgroundColor: done ? p.accent : p.chip }}
          >
            {done ? (
              <Icon
                name="check"
                size={16}
                strokeWidth={2.6}
                tintColor={p.onAccent}
              />
            ) : (
              <>
                <AppText
                  weight="bold"
                  className="text-xl"
                  style={{ color: p.accent }}
                >
                  {counted}
                </AppText>
                <AppText className="text-sm" style={{ color: p.muted }}>
                  {`/ ${zikr.count}`}
                </AppText>
              </>
            )}
          </View>
        ) : null}

        <View className="flex-1" />

        {actions
          .slice()
          .reverse()
          .map((action) => (
            <IconButton
              key={action.label}
              icon={action.icon}
              color={action.color}
              accessibilityLabel={action.label}
              className="size-11 rounded-full"
              style={{
                backgroundColor: p.card,
                boxShadow: "0 2px 8px rgba(9, 43, 56, 0.1)",
              }}
              onPress={action.onPress}
            />
          ))}
      </View>
    </PressableScale>
  );
}
