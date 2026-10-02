import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import {
  AyahRef,
  getSurah,
  toArabicDigits,
} from "@/features/azkar/_data/quran";
import { useAppSelector } from "@/store/Store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import useMushafColors from "../_components/useMushafColors";
import { getReciter } from "../_data/reciters";
import ReciterPicker from "./ReciterPicker";

export default function RecitationPlayer({
  current,
  playing,
  loading,
  onPlay,
  onPause,
  onStop,
}: {
  current: AyahRef | null;
  playing: boolean;
  loading: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}) {
  const { t, i18n } = useTranslation("azkar");
  const c = useMushafColors();
  const reciterId = useAppSelector((s) => s.settings.reciter);
  const reciter = getReciter(reciterId);
  const [picking, setPicking] = useState(false);
  const ar = i18n.language === "ar";
  const surah = current ? getSurah(current.surah) : null;

  return (
    <View
      className="flex-row items-center gap-3 rounded-full border px-2 py-2"
      style={{
        backgroundColor: c.page,
        borderColor: c.frame,
        direction: "rtl",
      }}
    >
      <PressableScale
        onPress={playing ? onPause : onPlay}
        accessibilityLabel={t(playing ? "pause" : "play")}
        className="size-11 items-center justify-center rounded-full"
        style={{ backgroundColor: c.accent }}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Icon
            name={playing ? "pause" : "play"}
            size={20}
            tintColor="#ffffff"
          />
        )}
      </PressableScale>

      <PressableScale
        scaleTo={0.98}
        onPress={() => setPicking(true)}
        accessibilityLabel={t("chooseReciter")}
        className="flex-1 flex-row items-center gap-2"
      >
        <View className="flex-1">
          <AppText weight="bold" numberOfLines={1}>
            {ar ? reciter.ar : reciter.en}
          </AppText>
          {surah && current ? (
            <AppText className="text-xs" style={{ color: c.gold }}>
              {t("verseRef", {
                surah: surah.name,
                ayah: ar ? toArabicDigits(current.ayah) : current.ayah,
              })}
            </AppText>
          ) : null}
        </View>
        <Icon name="chevronDown" size={16} tintColor={c.gold} />
      </PressableScale>

      {current ? (
        <PressableScale
          onPress={onStop}
          accessibilityLabel={t("stop")}
          className="size-11 items-center justify-center rounded-full"
          style={{ backgroundColor: c.frameFill }}
        >
          <Icon name="stop" size={18} tintColor={c.ink} />
        </PressableScale>
      ) : null}

      <ReciterPicker visible={picking} onClose={() => setPicking(false)} />
    </View>
  );
}
