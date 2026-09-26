import type * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { distanceToKaaba, qiblaBearing } from "../_data/qibla";

type Status = "loading" | "denied" | "error" | "ready";

/**
 * Asks for location, then works out the qibla bearing and distance and streams
 * the device heading. `heading` stays null where there is no compass (web).
 */
export default function useQibla() {
  const [status, setStatus] = useState<Status>("loading");
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null,
  );
  const [city, setCity] = useState<string | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  // 0-3; below 2 the compass needs calibrating
  const [accuracy, setAccuracy] = useState(3);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let subscription: Location.LocationSubscription | undefined;

    (async () => {
      setStatus("loading");
      // Loaded on demand so a missing native module can't break app startup
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

      if (Platform.OS !== "web") {
        try {
          subscription = await Location.watchHeadingAsync((h) => {
            // trueHeading is -1 until the device knows where true north is
            setHeading(h.trueHeading >= 0 ? h.trueHeading : h.magHeading);
            setAccuracy(h.accuracy);
          });
          if (cancelled) subscription.remove();
        } catch {
          // No compass: the screen falls back to showing the bearing only
        }
      }

      let fix: Location.LocationObjectCoords | null = null;
      try {
        // A cached fix shows the direction right away; the fresh one refines it
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

      // City name for the header; optional (no geocoder on web)
      if (fix) {
        try {
          const [place] = await Location.reverseGeocodeAsync(fix);
          if (!cancelled) {
            setCity(place?.city ?? place?.subregion ?? place?.region ?? null);
          }
        } catch {}
      }
    })();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [attempt]);

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
