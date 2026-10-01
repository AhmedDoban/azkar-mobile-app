import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "@/i18n/config";
import { getDeviceLocale } from "@/i18n";
import {
  PrayerName,
  REMINDER_PRAYERS,
} from "@/features/prayer-times/_data/types";
import {
  AdhanSoundId,
  CustomAdhan,
  DEFAULT_ADHAN,
  isAdhanSound,
} from "@/features/prayer-times/_data/adhanSounds";
import type { PrayerLocation } from "@/features/prayer-times/_data/calculate";
import { toCityName } from "@/features/prayer-times/_data/cityName";
import {
  AsrMethod,
  isAsrMethod,
  isPrayerMethod,
  PrayerMethodSetting,
} from "@/features/prayer-times/_data/methods";

import { DEFAULT_PALETTE, isPaletteId, PaletteId } from "@/constants/palettes";

export type ThemePreference = "system" | "light" | "dark";
export type TextSize = number;
export const TEXT_SIZE = { min: 18, max: 40, step: 2, default: 24 } as const;
export const QURAN_SIZE = { min: 18, max: 34, step: 1, default: 23 } as const;

const clampQuranSize = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.min(QURAN_SIZE.max, Math.max(QURAN_SIZE.min, Math.round(value)))
    : QURAN_SIZE.default;

const LEGACY_TEXT_SIZES: Record<string, number> = { sm: 20, md: 24, lg: 30 };

const clampTextSize = (value: unknown): number => {
  const size = typeof value === "string" ? LEGACY_TEXT_SIZES[value] : value;
  if (typeof size !== "number" || !Number.isFinite(size))
    return TEXT_SIZE.default;
  return Math.min(TEXT_SIZE.max, Math.max(TEXT_SIZE.min, Math.round(size)));
};

export interface ReadingSettings {
  hapticOnComplete: boolean;
  hapticOnTap: boolean;
  hideCompleted: boolean;
}

const DEFAULT_READING: ReadingSettings = {
  hapticOnComplete: true,
  hapticOnTap: true,
  hideCompleted: false,
};

export interface SettingsState {
  locale: Locale;
  theme: ThemePreference;
  palette: PaletteId;
  textSize: TextSize;
  quranSize: number;
  prayerReminders: Partial<Record<PrayerName, boolean>>;
  adhanSound: AdhanSoundId;
  customAdhan: CustomAdhan | null;
  prayerLocation: PrayerLocation | null;
  prayerMethod: PrayerMethodSetting;
  asrMethod: AsrMethod;
  reading: ReadingSettings;
}

export const defaultSettings = (
  locale: Locale = getDeviceLocale(),
): SettingsState => ({
  locale,
  theme: "system",
  palette: DEFAULT_PALETTE,
  textSize: TEXT_SIZE.default,
  quranSize: QURAN_SIZE.default,
  prayerReminders: Object.fromEntries(REMINDER_PRAYERS.map((p) => [p, true])),
  adhanSound: DEFAULT_ADHAN,
  customAdhan: null,
  prayerLocation: null,
  prayerMethod: "auto",
  asrMethod: "auto",
  reading: { ...DEFAULT_READING },
});

const initialState: SettingsState = defaultSettings();

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
    setPalette(state, action: PayloadAction<PaletteId>) {
      state.palette = action.payload;
    },
    setTextSize(state, action: PayloadAction<TextSize>) {
      state.textSize = clampTextSize(action.payload);
    },
    setQuranSize(state, action: PayloadAction<number>) {
      state.quranSize = clampQuranSize(action.payload);
    },
    setReadingOption(
      state,
      action: PayloadAction<{ key: keyof ReadingSettings; value: boolean }>,
    ) {
      state.reading[action.payload.key] = action.payload.value;
    },
    togglePrayerReminder(state, action: PayloadAction<PrayerName>) {
      const name = action.payload;
      state.prayerReminders[name] = !(state.prayerReminders[name] ?? true);
    },
    setAdhanSound(state, action: PayloadAction<AdhanSoundId>) {
      state.adhanSound = action.payload;
    },
    setCustomAdhan(state, action: PayloadAction<CustomAdhan>) {
      state.customAdhan = action.payload;
      state.adhanSound = "custom";
    },
    setPrayerLocation(state, action: PayloadAction<PrayerLocation>) {
      state.prayerLocation = action.payload;
    },
    setPrayerMethod(state, action: PayloadAction<PrayerMethodSetting>) {
      state.prayerMethod = action.payload;
    },
    setAsrMethod(state, action: PayloadAction<AsrMethod>) {
      state.asrMethod = action.payload;
    },
    resetSettings(state) {
      return {
        ...defaultSettings(state.locale),
        prayerLocation: state.prayerLocation,
      };
    },
    hydrateSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      return {
        ...state,
        ...action.payload,
        textSize: clampTextSize(action.payload.textSize ?? state.textSize),
        palette: isPaletteId(action.payload.palette)
          ? action.payload.palette
          : state.palette,
        quranSize: clampQuranSize(action.payload.quranSize ?? state.quranSize),
              adhanSound: isAdhanSound(action.payload.adhanSound)
          ? action.payload.adhanSound
          : state.adhanSound,
        customAdhan: action.payload.customAdhan ?? state.customAdhan,
        prayerLocation: action.payload.prayerLocation
          ? {
              ...action.payload.prayerLocation,
              city: toCityName(action.payload.prayerLocation.city),
            }
          : state.prayerLocation,
        prayerMethod: isPrayerMethod(action.payload.prayerMethod)
          ? action.payload.prayerMethod
          : state.prayerMethod,
        asrMethod: isAsrMethod(action.payload.asrMethod)
          ? action.payload.asrMethod
          : state.asrMethod,
        prayerReminders: {
          ...state.prayerReminders,
          ...action.payload.prayerReminders,
        },
        reading: { ...state.reading, ...action.payload.reading },
      };
    },
  },
});

export const {
  setLocale,
  setTheme,
  setPalette,
  setTextSize,
  setQuranSize,
  togglePrayerReminder,
  setAdhanSound,
  setCustomAdhan,
  setPrayerLocation,
  setPrayerMethod,
  setAsrMethod,
  setReadingOption,
  resetSettings,
  hydrateSettings,
} = SettingsSlice.actions;
