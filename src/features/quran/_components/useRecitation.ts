import { AyahRef, nextAyah } from "@/features/azkar/_data/quran";
import { useAppSelector } from "@/store/Store";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";
import { ayahAudioUrl } from "../_data/reciters";
import { audioSource, cacheAudio } from "./audioCache";

let stopOthers: (() => void) | null = null;

const needsBasmala = ({ surah, ayah }: AyahRef) =>
  ayah === 1 && surah !== 1 && surah !== 9;

export default function useRecitation() {
  const reciter = useAppSelector((s) => s.settings.reciter);
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const [current, setCurrent] = useState<AyahRef | null>(null);
  const [playing, setPlaying] = useState(false);
  const basmala = useRef(false);
  const until = useRef<AyahRef | null>(null);
  const stopSelf = useRef<() => void>(() => {});

  const load = useCallback(
    (ref: AyahRef, withBasmala: boolean) => {
      basmala.current = withBasmala;
      const url = withBasmala
        ? ayahAudioUrl(reciter, 1, 1)
        : ayahAudioUrl(reciter, ref.surah, ref.ayah);
      try {
        player.replace({ uri: audioSource(url) });
        player.play();
      } catch {}
      let ahead: AyahRef | null = ref;
      for (let i = 0; i < 2 && ahead; i++) {
        const end = until.current;
        if (end && end.surah === ahead.surah && end.ayah === ahead.ayah) break;
        ahead = nextAyah(ahead);
        if (ahead) cacheAudio(ayahAudioUrl(reciter, ahead.surah, ahead.ayah));
      }
      setCurrent(ref);
      setPlaying(true);
    },
    [player, reciter],
  );

  const play = useCallback(
    (from: AyahRef, stopAt: AyahRef | null = null) => {
      until.current = stopAt;
      if (stopOthers && stopOthers !== stopSelf.current) stopOthers();
      stopOthers = stopSelf.current;
      setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
      }).catch(() => {});
      load(from, needsBasmala(from));
    },
    [load],
  );

  const pause = useCallback(() => {
    try {
      player.pause();
    } catch {}
    setPlaying(false);
  }, [player]);

  const resume = useCallback(() => {
    if (!current) return;
    try {
      player.play();
    } catch {}
    setPlaying(true);
  }, [player, current]);

  const stop = useCallback(() => {
    pause();
    setCurrent(null);
  }, [pause]);

  stopSelf.current = stop;

  useEffect(
    () => () => {
      if (stopOthers === stopSelf.current) stopOthers = null;
    },
    [],
  );

  useEffect(() => {
    if (!status.didJustFinish || !current || !playing) return;
    if (basmala.current) {
      load(current, false);
      return;
    }
    const end = until.current;
    const reachedEnd =
      end && end.surah === current.surah && end.ayah === current.ayah;
    const next = reachedEnd ? null : nextAyah(current);
    if (next) load(next, needsBasmala(next));
    else stop();
  }, [status.didJustFinish]);

  useEffect(() => {
    if (current && playing) load(current, false);
  }, [reciter]);

  return {
    current,
    playing,
    loading: playing && !status.playing && !status.didJustFinish,
    play,
    pause,
    resume,
    stop,
  };
}
