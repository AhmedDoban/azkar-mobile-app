import pickCustomAdhan from "@/features/prayer-times/_components/pickCustomAdhan";
import useAdhanPlayer from "@/features/prayer-times/_components/useAdhanPlayer";
import {
  ADHAN_SOUNDS,
  AdhanSoundId,
} from "@/features/prayer-times/_data/adhanSounds";
import { setAdhanSound, setCustomAdhan } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import AdhanSoundCard from "./AdhanSoundCard";

export default function AdhanSoundPicker() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const selected = useAppSelector((s) => s.settings.adhanSound);
  const custom = useAppSelector((s) => s.settings.customAdhan);
  const { current, play, stop } = useAdhanPlayer();

  useFocusEffect(useCallback(() => stop, [stop]));

  const toggle = (id: AdhanSoundId) => {
    if (current === id) stop();
    else play(id);
  };

  const upload = async () => {
    stop();
    try {
      const file = await pickCustomAdhan();
      if (!file) return;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      dispatch(setCustomAdhan(file));
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const select = (id: AdhanSoundId) => {
    Haptics.selectionAsync();
    dispatch(setAdhanSound(id));
  };

  return ADHAN_SOUNDS.map(({ id, source }) => {
    if (id === "custom") {
      return (
        <AdhanSoundCard
          key={id}
          label={custom?.name ?? t("sounds.custom")}
          hint={t(custom ? "soundHints.customNotice" : "soundHints.custom")}
          selected={selected === id}
          playing={current === id}
          previewLabel={t(current === id ? "stopAdhan" : "previewAdhan")}
          onPress={custom ? () => select(id) : upload}
          onPreview={custom ? () => toggle(id) : undefined}
          changeLabel={t("changeFile")}
          onChange={custom ? upload : undefined}
        />
      );
    }
    return (
      <AdhanSoundCard
        key={id}
        label={t(`sounds.${id}`)}
        hint={t(`soundHints.${id === "other" ? "other" : "reciter"}`)}
        selected={selected === id}
        playing={current === id}
        previewLabel={t(current === id ? "stopAdhan" : "previewAdhan")}
        onPress={() => select(id)}
        onPreview={source ? () => toggle(id) : undefined}
      />
    );
  });
}
