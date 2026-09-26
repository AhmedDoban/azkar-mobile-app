/** The Kaaba, Makkah */
export const KAABA = { latitude: 21.422487, longitude: 39.826206 };

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (rad: number) => (rad * 180) / Math.PI;

/** Wraps any angle into [0, 360) */
export const normalize360 = (angle: number) => ((angle % 360) + 360) % 360;

/** Wraps any angle into (-180, 180]: the shortest turn to reach it */
export const normalize180 = (angle: number) => {
  const a = normalize360(angle);
  return a > 180 ? a - 360 : a;
};

type Coords = { latitude: number; longitude: number };

/** Great-circle bearing from `from` to the Kaaba, in degrees clockwise from true north */
export function qiblaBearing({ latitude, longitude }: Coords) {
  const φ1 = rad(latitude);
  const φ2 = rad(KAABA.latitude);
  const Δλ = rad(KAABA.longitude - longitude);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return normalize360(deg(Math.atan2(y, x)));
}

/** Haversine distance to the Kaaba in kilometers */
export function distanceToKaaba({ latitude, longitude }: Coords) {
  const Δφ = rad(KAABA.latitude - latitude);
  const Δλ = rad(KAABA.longitude - longitude);
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(rad(latitude)) * Math.cos(rad(KAABA.latitude)) * Math.sin(Δλ / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
