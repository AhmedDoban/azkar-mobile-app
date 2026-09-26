import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "@/i18n/config";
import { getDeviceLocale } from "@/i18n";
import {
  PrayerName,
  REMINDER_PRAYERS,
} from "@/features/prayer-times/_data/types";

export type ThemePreference = "system" | "light" | "dark";
/** Font size (px) of Arabic adhkar/hadith text, set with the slider in Settings */
export type TextSize = number;
export const TEXT_SIZE = { min: 18, max: 40, step: 2, default: 24 } as const;

// Earlier versions stored small / medium / large
const LEGACY_TEXT_SIZES: Record<string, number> = { sm: 20, md: 24, lg: 30 };

const clampTextSize = (value: unknown): number => {
  const size = typeof value === "string" ? LEGACY_TEXT_SIZES[value] : value;
  if (typeof size !== "number" || !Number.isFinite(size))
    return TEXT_SIZE.default;
  return Math.min(TEXT_SIZE.max, Math.max(TEXT_SIZE.min, Math.round(size)));
};

/** The three "Reading settings" switches */
export interface ReadingSettings {
  /** Strong haptic when a dhikr's remaining count reaches 0 */
  hapticOnComplete: boolean;
  /** Light haptic on every tap of a dhikr card */
  hapticOnTap: boolean;
  /** Fade a card out of the list once its count reaches 0 */
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
  textSize: TextSize;
  /** Adhan reminder on/off per prayer (the bell on each prayer row) */
  prayerReminders: Partial<Record<PrayerName, boolean>>;
  reading: ReadingSettings;
}

const initialState: SettingsState = {
  locale: getDeviceLocale(),
  theme: "system",
  textSize: TEXT_SIZE.default,
  prayerReminders: Object.fromEntries(REMINDER_PRAYERS.map((p) => [p, true])),
  reading: DEFAULT_READING,
};

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
    setTextSize(state, action: PayloadAction<TextSize>) {
      state.textSize = clampTextSize(action.payload);
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
    hydrateSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      return {
        ...state,
        ...action.payload,
        textSize: clampTextSize(action.payload.textSize ?? state.textSize),
        // Saved before reminders existed: keep the defaults for missing prayers
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
  setTextSize,
  togglePrayerReminder,
  setReadingOption,
  hydrateSettings,
} = SettingsSlice.actions;
