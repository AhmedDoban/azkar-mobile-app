import { normalize } from "@/features/azkar/_data";

export type GradeLevel = "sahih" | "hasan" | "daif" | "mawdu";

// Terms as they appear in Dorar's "خلاصة حكم المحدث", grouped by strength
const TERMS: Record<GradeLevel, string[]> = {
  mawdu: [
    "موضوع",
    "كذب",
    "باطل",
    "لا أصل له",
    "ليس له أصل",
    "ضعيف جدا",
    "منكر",
    "واه",
    "متروك",
  ],
  daif: [
    "ضعيف",
    "ضعفه",
    "فيه ضعف",
    "فيه مقال",
    "مرسل",
    "منقطع",
    "معضل",
    "مضطرب",
    "معلول",
    "شاذ",
    "لا يصح",
    "لم يصح",
    "ليس بصحيح",
    "غير صحيح",
    "لا يثبت",
    "لم يثبت",
    "ليس بثابت",
    "مجهول",
  ],
  hasan: ["حسن"],
  sahih: [
    // al-Tirmidhi's "hasan sahih" counts as sahih (longer term beats "حسن")
    "حسن صحيح",
    "صحيح",
    "صححه",
    "جيد",
    "ثابت",
    "ثقات",
    "على شرط",
    "متفق عليه",
    "أخرجه البخاري",
    "أخرجه مسلم",
  ],
};

const MATCHERS = (Object.keys(TERMS) as GradeLevel[]).flatMap((level) =>
  TERMS[level].map((term) => ({
    level,
    length: term.length,
    // At the start of a word (optionally after و/ف/ب), any ending allowed
    pattern: new RegExp(`(^|[\\s\\[\\(،,.:؛-])[وفب]?${normalize(term)}`),
  })),
);

/**
 * Strength of a Dorar ruling. The term that appears first wins, so
 * "صحيح لغيره وهذا إسناد ضعيف" is sahih; on a tie the longer term wins, so
 * "ضعيف جدا" beats "ضعيف" and "ليس بصحيح" beats "صحيح". Unknown → null.
 */
export function gradeLevel(grade: string): GradeLevel | null {
  const text = normalize(grade);
  let best: { level: GradeLevel; index: number; length: number } | null = null;

  for (const { level, length, pattern } of MATCHERS) {
    const match = pattern.exec(text);
    if (!match) continue;
    const index = match.index + match[1].length;
    if (
      !best ||
      index < best.index ||
      (index === best.index && length > best.length)
    ) {
      best = { level, index, length };
    }
  }
  return best?.level ?? null;
}
