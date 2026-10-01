import AsyncStorage from "@react-native-async-storage/async-storage";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  SettingsSlice,
  SettingsState,
  hydrateSettings,
} from "./Slices/SettingsSlice";
import { AzkarSlice, AzkarState, hydrateAzkar } from "./Slices/AzkarSlice";

const STORAGE_KEY = "AZKAR_STATE_V1";

interface PersistedState {
  settings?: Partial<SettingsState>;
  azkar?: Partial<AzkarState>;
}

export const persistMiddleware = createListenerMiddleware();

persistMiddleware.startListening({
  matcher: isAnyOf(
    ...Object.values(SettingsSlice.actions),
    ...Object.values(AzkarSlice.actions),
  ),
  effect: async (_action, api) => {
    api.cancelActiveListeners();
    await api.delay(400);

    await savePersistedState(api.getState() as Required<PersistedState>);
  },
});

export async function savePersistedState({ settings, azkar }: PersistedState) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ settings, azkar }),
    );
  } catch (error) {
    console.warn("Failed to persist state", error);
  }
}

export async function loadPersistedState(): Promise<PersistedState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export { hydrateAzkar, hydrateSettings };
