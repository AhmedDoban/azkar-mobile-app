import { toArabicDigits } from "@/features/azkar/_data/quran";

export const localDigits = (n: number, ar: boolean) =>
  ar ? toArabicDigits(n) : String(n);
