import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { DorarSlice } from "./Slices/DorarSlice";
import { PrayerTimesSlice } from "./Slices/PrayerTimesSlice";
import { SettingsSlice } from "./Slices/SettingsSlice";
import { AzkarSlice } from "./Slices/AzkarSlice";
import { persistMiddleware } from "./persist";

export const Store = configureStore({
  reducer: {
    [SettingsSlice.name]: SettingsSlice.reducer,
    [AzkarSlice.name]: AzkarSlice.reducer,
    [DorarSlice.reducerPath]: DorarSlice.reducer,
    [PrayerTimesSlice.reducerPath]: PrayerTimesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(persistMiddleware.middleware)
      .concat([DorarSlice.middleware, PrayerTimesSlice.middleware]),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export function clearApiCache(dispatch: AppDispatch) {
  dispatch(DorarSlice.util.resetApiState());
  dispatch(PrayerTimesSlice.util.resetApiState());
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
