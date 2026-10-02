import {
  clearRecitations,
  recitationsSize,
} from "@/features/quran/_components/audioCache";
import { resetAllProgress, resetAzkarData } from "@/store/Slices/AzkarSlice";
import { resetQuranData, resetSettings } from "@/store/Slices/SettingsSlice";
import { clearApiCache, useAppDispatch } from "@/store/Store";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { formatSize, RESET_ACTIONS, ResetKind } from "../_data/resetActions";
import ResetDialog, { ResetDialogContent } from "../_ui/ResetDialog";
import SettingsActionRow from "../_ui/SettingsActionRow";

export default function DataSection() {
  const { t, i18n } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<ResetKind | null>(null);
  const [audioBytes, setAudioBytes] = useState(0);
  const ar = i18n.language === "ar";

  useFocusEffect(
    useCallback(() => {
      setAudioBytes(recitationsSize());
    }, []),
  );

  const confirm: Record<ResetKind, () => void> = {
    progress: () => dispatch(resetAllProgress()),
    cache: () => clearApiCache(dispatch),
    recitations: () => {
      clearRecitations();
      setAudioBytes(0);
    },
    quran: () => dispatch(resetQuranData()),
    settings: () => dispatch(resetSettings()),
    all: () => {
      dispatch(resetAzkarData());
      dispatch(resetSettings());
      dispatch(resetQuranData());
      clearApiCache(dispatch);
      clearRecitations();
      setAudioBytes(0);
    },
  };

  const action = RESET_ACTIONS.find((a) => a.kind === pending);
  const content: ResetDialogContent | null = action
    ? {
        icon: action.icon,
        title: t(`confirm.${action.kind}.title`),
        message: t(`confirm.${action.kind}.message`),
        confirmLabel: t(`confirm.${action.kind}.action`),
        doneText: t(`confirm.${action.kind}.done`),
        danger: action.danger,
        onConfirm: confirm[action.kind],
      }
    : null;

  return (
    <>
      <View className="gap-3">
        {RESET_ACTIONS.map(({ kind, icon, label, danger }) => (
          <SettingsActionRow
            key={kind}
            icon={icon}
            label={t(label)}
            danger={danger}
            value={
              kind === "recitations" ? formatSize(audioBytes, ar) : undefined
            }
            onPress={() => setPending(kind)}
          />
        ))}
      </View>
      <ResetDialog content={content} onClose={() => setPending(null)} />
    </>
  );
}
