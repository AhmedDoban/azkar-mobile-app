import type * as ExpoLocation from "expo-location";

export type CityName = { ar: string; en: string };

type Coords = { latitude: number; longitude: number };

async function nominatim(coords: Coords, language: "ar" | "en") {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&lat=${coords.latitude}&lon=${coords.longitude}&accept-language=${language}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "AzkarApp/1.0" },
  });
  if (!response.ok) return null;
  const json = await response.json();
  const address = json?.address ?? {};
  return (address.city ??
    address.town ??
    address.village ??
    address.county ??
    address.state ??
    null) as string | null;
}

export async function lookupCityName(
  coords: Coords,
  Location: typeof ExpoLocation,
): Promise<CityName | null> {
  const [ar, en] = await Promise.all([
    nominatim(coords, "ar").catch(() => null),
    nominatim(coords, "en").catch(() => null),
  ]);
  if (ar || en) return { ar: ar ?? en!, en: en ?? ar! };

  try {
    const [place] = await Location.reverseGeocodeAsync(coords);
    const name = place?.city ?? place?.subregion ?? place?.region ?? null;
    return name ? { ar: name, en: name } : null;
  } catch {
    return null;
  }
}

export const toCityName = (value: unknown): CityName | null => {
  if (typeof value === "string") return { ar: value, en: value };
  if (
    value &&
    typeof value === "object" &&
    typeof (value as CityName).ar === "string" &&
    typeof (value as CityName).en === "string"
  ) {
    return value as CityName;
  }
  return null;
};
