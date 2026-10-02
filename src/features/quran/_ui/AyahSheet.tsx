import AppText from "@/components/ui/AppText";
import BottomSheet from "@/components/ui/BottomSheet";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import SheetHeader from "@/components/ui/SheetHeader";
import {
  AyahRef,
  getSurah,
  toArabicDigits,
} from "@/features/azkar/_data/quran";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import usePopupColors from "../_components/usePopupColors";
import AyahActions from "./AyahActions";
import AyahPlayUntil from "./AyahPlayUntil";

const CONTENT = { paddingBottom: 12 };

export default memo(function AyahSheet({
  ayah,
  onClose,
  onPlay,
}: {
  ayah: AyahRef | null;
  onClose: () => void;
  onPlay: (from: AyahRef, until: AyahRef | null) => void;
}) {
  const { t } = useTranslation("azkar");
  const c = usePopupColors();
  const [view, setView] = useState<"main" | "until">("main");
  const [tafsirOpen, setTafsirOpen] = useState(false);
  const [tafsirLines, setTafsirLines] = useState(0);
  const [shown, setShown] = useState<AyahRef | null>(ayah);

  useEffect(() => {
    if (!ayah) return;
    setShown(ayah);
    setView("main");
    setTafsirOpen(false);
    setTafsirLines(0);
  }, [ayah]);

  const playUntil = useCallback(
    (until: AyahRef | null) => {
      if (shown) onPlay(shown, until);
      onClose();
    },
    [shown, onPlay, onClose],
  );
  const playAll = useCallback(() => playUntil(null), [playUntil]);
  const showUntil = useCallback(() => setView("until"), []);
  const showMain = useCallback(() => setView("main"), []);
  const toggleTafsir = useCallback(() => setTafsirOpen((open) => !open), []);

  if (!shown) return null;

  const label = `${getSurah(shown.surah)?.name}: ${toArabicDigits(shown.ayah)}`;

  return (
    <BottomSheet
      visible={ayah !== null}
      onClose={onClose}
      closeLabel={t("close")}
      className="max-h-[88%]"
      direction="rtl"
      header={
        <SheetHeader
          title={view === "until" ? t("playUntil") : label}
          onClose={onClose}
          closeLabel={t("close")}
          className="pb-2"
          leading={
            view === "until" ? (
              <PressableScale
                onPress={showMain}
                className="flex-row items-center gap-1"
              >
                <Icon name="chevronRight" size={20} tintColor={c.accent} />
                <AppText weight="bold" style={{ color: c.accent }}>
                  {label}
                </AppText>
              </PressableScale>
            ) : null
          }
        />
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CONTENT}
      >
        {view === "main" ? (
          <AyahActions
            ayah={shown}
            tafsirOpen={tafsirOpen}
            tafsirLines={tafsirLines}
            onTafsirToggle={toggleTafsir}
            onTafsirLines={setTafsirLines}
            onPlay={playAll}
            onPlayUntil={showUntil}
            onClose={onClose}
          />
        ) : (
          <AyahPlayUntil ayah={shown} onPlay={playUntil} />
        )}
      </ScrollView>
    </BottomSheet>
  );
});
