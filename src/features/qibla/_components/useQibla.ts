import type * as Location from "expo-location";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  CityName,
  lookupCityName,
} from "@/features/prayer-times/_data/cityName";
import { distanceToKaaba, qiblaBearing } from "../_data/qibla";

type Status = "loading" | "denied" | "error" | "ready";

export default function useQibla() {
  const [status, setStatus] = useState<Status>("loading");
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null,
  );
  const [city, setCity] = useState<CityName | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState(3);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      let Location: typeof import("expo-location");
      try {
        Location = await import("expo-location");
      } catch {
        if (!cancelled) setStatus("error");
        return;
      }
      const permission = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;
      if (!permission.granted) {
        setCanAskAgain(permission.canAskAgain);
        setStatus("denied");
        return;
      }

      let fix: Location.LocationObjectCoords | null = null;
      try {
        const last = await Location.getLastKnownPositionAsync();
        if (last && !cancelled) {
          fix = last.coords;
          setCoords(last.coords);
          setStatus("ready");
        }
      } catch {}

      try {
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (cancelled) return;
        fix = current.coords;
        setCoords(current.coords);
        setStatus("ready");
      } catch {
        if (!cancelled && !fix) setStatus("error");
      }

      if (fix) {
        const name = await lookupCityName(fix, Location);
        if (!cancelled) setCity(name);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useFocusEffect(
    useCallback(() => {
      if (status !== "ready" || Platform.OS === "web") return;
      let cancelled = false;
      let subscription: Location.LocationSubscription | undefined;

      (async () => {
        try {
          const Location = await import("expo-location");
          const next = await Location.watchHeadingAsync((h) => {
            setHeading(h.trueHeading >= 0 ? h.trueHeading : h.magHeading);
            setAccuracy(h.accuracy);
          });
          if (cancelled) next.remove();
          else subscription = next;
        } catch {}
      })();

      return () => {
        cancelled = true;
        subscription?.remove();
        setHeading(null);
      };
    }, [status]),
  );

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return {
    status,
    canAskAgain,
    city,
    heading,
    accuracy,
    bearing: coords ? qiblaBearing(coords) : null,
    distance: coords ? distanceToKaaba(coords) : null,
    retry,
  };
}
