import { useAppSelector } from "@/store/Store";

export default function useArabicTextStyle(scale = 1) {
  const size = useAppSelector((s) => s.settings.textSize) * scale;
  return { fontSize: size, lineHeight: Math.round(size * 1.9) };
}
