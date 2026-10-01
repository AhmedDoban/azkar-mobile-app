import { isRunningInExpoGo } from "expo";

export type AdhanSoundId = "other" | "qassas" | "qatami" | "sobhi" | "custom";

export type CustomAdhan = { uri: string; name: string };

export const DEFAULT_ADHAN: AdhanSoundId = "other";

export const ADHAN_SOUNDS: { id: AdhanSoundId; source: number | null }[] = [
  { id: "other", source: require("@/assets/audio/adhan_other.mp3") },
  { id: "qassas", source: require("@/assets/audio/adhan_qassas.mp3") },
  { id: "qatami", source: require("@/assets/audio/adhan_qatami.mp3") },
  { id: "sobhi", source: require("@/assets/audio/adhan_sobhi.mp3") },
  { id: "custom", source: null },
];

export const BUNDLED_SOUNDS = ADHAN_SOUNDS.filter((sound) => sound.source);

export const isAdhanSound = (value: unknown): value is AdhanSoundId =>
  ADHAN_SOUNDS.some((sound) => sound.id === value);

export const adhanSource = (id: AdhanSoundId, custom: CustomAdhan | null) =>
  id === "custom"
    ? custom
      ? { uri: custom.uri }
      : null
    : (ADHAN_SOUNDS.find((sound) => sound.id === id)?.source ?? null);

const notifiable = (id: AdhanSoundId) => (id === "custom" ? DEFAULT_ADHAN : id);

export const notificationSound = (id: AdhanSoundId, ios: boolean) => {
  if (isRunningInExpoGo()) return "default";
  const sound = notifiable(id);
  return ios ? `adhan_${sound}_ios.caf` : `adhan_${sound}.mp3`;
};

export const channelId = (id: AdhanSoundId) => `adhan_${notifiable(id)}`;
