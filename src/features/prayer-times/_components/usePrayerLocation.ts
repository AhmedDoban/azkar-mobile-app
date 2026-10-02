import { setPrayerLocation } from "@/store/Slices/SettingsSlice";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/store/Store";
import { useCallback, useEffect, useState } from "react";
import type { PrayerLocation } from "../_data/calculate";
import { lookupCityName } from "../_data/cityName";

export type LocationStatus = "loading" | "ready" | "denied" | "error";

const MOVED_KM = 5;
const LOOKUP_RETRY = 7 * 24 * 60 * 60 * 1000;
let refresh: Promise<LocationStatus> | null = null;

const distanceKm = (a: PrayerLocation, b: PrayerLocation) => {
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLon = (b.longitude - a.longitude) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.latitude * rad) *
      Math.cos(b.latitude * rad) *
      Math.sin(dLon / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

async function locate(
  dispatch: AppDispatch,
  saved: PrayerLocation | null,
): Promise<LocationStatus> {
  let Location: typeof import("expo-location");
  try {
    Location = await import("expo-location");
  } catch {
    return saved ? "ready" : "error";
  }

  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) return saved ? "ready" : "denied";

  try {
    const fix =
      (await Location.getLastKnownPositionAsync()) ??
      (await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }));
    const next = {
      latitude: fix.coords.latitude,
      longitude: fix.coords.longitude,
      city: saved?.city ?? null,
    };
    const moved = !saved || distanceKm(saved, next) > MOVED_KM;
    const untranslated = !saved?.city || saved.city.ar === saved.city.en;
    const due =
      !saved?.cityLookupAt || Date.now() - saved.cityLookupAt > LOOKUP_RETRY;
    if (moved || (untranslated && due)) {
      const found = await lookupCityName(next, Location);
      const city = found ?? (moved ? null : (saved?.city ?? null));
      const base = moved || !saved ? next : saved;
      dispatch(setPrayerLocation({ ...base, city, cityLookupAt: Date.now() }));
    }
    return "ready";
  } catch {
    return saved ? "ready" : "error";
  }
}

export default function usePrayerLocation() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((s) => s.settings.prayerLocation);
  const [status, setStatus] = useState<LocationStatus>(
    location ? "ready" : "loading",
  );

  const run = useCallback(
    (force: boolean) => {
      if (force || !refresh) refresh = locate(dispatch, location);
      refresh.then(setStatus);
    },
    [dispatch, location],
  );

  useEffect(() => {
    run(false);
  }, []);

  const retry = useCallback(() => {
    setStatus("loading");
    run(true);
  }, [run]);

  return { location, status: location ? "ready" : status, retry };
}
