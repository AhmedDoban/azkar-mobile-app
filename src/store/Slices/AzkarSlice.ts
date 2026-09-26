import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DorarHadith } from "@/features/hadith/_components/parseDorar";

/**
 * A loved hadith. Local ones are looked up by id; Dorar results only live in
 * the search response, so the whole hadith is kept.
 */
export type SavedHadith = { key: string } & (
  | { kind: "local"; id: string }
  | { kind: "dorar"; hadith: DorarHadith }
);

export interface AzkarState {
  /** Category keys, e.g. "morning_azkar" */
  favorites: string[];
  /** Single adhkar the user loved, keyed like progress: `${categoryId}:${itemId}` */
  favoriteAdhkar: string[];
  favoriteHadiths: SavedHadith[];
  /** How many times each dhikr was counted today, keyed by `${categoryId}:${itemId}` */
  progress: Record<string, number>;
  /** Local date (YYYY-MM-DD) the progress belongs to; counters reset each day */
  progressDate: string;
}

export const today = () => new Date().toLocaleDateString("en-CA");
export const progressKey = (categoryId: string, itemId: number) =>
  `${categoryId}:${itemId}`;

const initialState: AzkarState = {
  favorites: [],
  favoriteAdhkar: [],
  favoriteHadiths: [],
  progress: {},
  progressDate: today(),
};

export const AzkarSlice = createSlice({
  name: "azkar",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.favorites = state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];
    },
    toggleFavoriteZikr(state, action: PayloadAction<string>) {
      const key = action.payload;
      state.favoriteAdhkar = state.favoriteAdhkar.includes(key)
        ? state.favoriteAdhkar.filter((k) => k !== key)
        : [...state.favoriteAdhkar, key];
    },
    toggleFavoriteHadith(state, action: PayloadAction<SavedHadith>) {
      const { key } = action.payload;
      state.favoriteHadiths = state.favoriteHadiths.some((h) => h.key === key)
        ? state.favoriteHadiths.filter((h) => h.key !== key)
        : [...state.favoriteHadiths, action.payload];
    },
    /** Clears yesterday's counters once the local date has changed (no-op otherwise) */
    startNewDay(state) {
      if (state.progressDate === today()) return;
      state.progress = {};
      state.progressDate = today();
    },
    incrementCount(
      state,
      action: PayloadAction<{
        categoryId: string;
        itemId: number;
        max: number;
      }>,
    ) {
      const { categoryId, itemId, max } = action.payload;
      if (state.progressDate !== today()) {
        state.progress = {};
        state.progressDate = today();
      }
      const key = progressKey(categoryId, itemId);
      state.progress[key] = Math.min((state.progress[key] ?? 0) + 1, max);
    },
    resetCategory(state, action: PayloadAction<string>) {
      const prefix = `${action.payload}:`;
      for (const key of Object.keys(state.progress)) {
        if (key.startsWith(prefix)) delete state.progress[key];
      }
    },
    resetAllProgress(state) {
      state.progress = {};
      state.progressDate = today();
    },
    hydrateAzkar(state, action: PayloadAction<Partial<AzkarState>>) {
      const next = { ...state, ...action.payload };
      // Older builds stored numeric category ids; those categories no longer exist
      next.favorites = (next.favorites ?? []).filter(
        (f) => typeof f === "string",
      );
      if (next.progressDate !== today()) {
        next.progress = {};
        next.progressDate = today();
      }
      return next;
    },
  },
});

export const {
  toggleFavorite,
  toggleFavoriteZikr,
  toggleFavoriteHadith,
  incrementCount,
  startNewDay,
  resetCategory,
  resetAllProgress,
  hydrateAzkar,
} = AzkarSlice.actions;
