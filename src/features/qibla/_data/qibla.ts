import {
  Coords,
  distanceKm,
  toRadians as rad,
} from "@/features/prayer-times/_data/geo";

const KAABA = { latitude: 21.422487, longitude: 39.826206 };

const deg = (rad: number) => (rad * 180) / Math.PI;

const normalize360 = (angle: number) => ((angle % 360) + 360) % 360;

export const normalize180 = (angle: number) => {
  const a = normalize360(angle);
  return a > 180 ? a - 360 : a;
};

export function qiblaBearing({ latitude, longitude }: Coords) {
  const φ1 = rad(latitude);
  const φ2 = rad(KAABA.latitude);
  const Δλ = rad(KAABA.longitude - longitude);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return normalize360(deg(Math.atan2(y, x)));
}

export const distanceToKaaba = (coords: Coords) => distanceKm(coords, KAABA);
