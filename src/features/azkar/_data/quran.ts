export type Surah = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  verses: { id: number; text: string; translation: string }[];
};

export type Verse = {
  text: string;
  translation: string;
  surah: string;
  surahEn: string;
  ayah: number;
};

const MAX_LENGTH = 150;

let quran: Surah[] | null = null;
export const loadQuran = (): Surah[] => (quran ??= require("./Qoran.json"));

export const getSurah = (id: number) => loadQuran().find((s) => s.id === id);

export type SurahSummary = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  verses: number;
};

export const getSurahList = (): SurahSummary[] =>
  loadQuran().map((s) => ({
    id: s.id,
    name: s.name,
    transliteration: s.transliteration,
    translation: s.translation,
    type: s.type,
    verses: s.verses.length,
  }));

const JUZ_STARTS: [number, number][] = [
  [1, 1],
  [2, 142],
  [2, 253],
  [3, 93],
  [4, 24],
  [4, 148],
  [5, 82],
  [6, 111],
  [7, 88],
  [8, 41],
  [9, 93],
  [11, 6],
  [12, 53],
  [15, 1],
  [17, 1],
  [18, 75],
  [21, 1],
  [23, 1],
  [25, 21],
  [27, 56],
  [29, 46],
  [33, 31],
  [36, 28],
  [39, 32],
  [41, 47],
  [46, 1],
  [51, 31],
  [58, 1],
  [67, 1],
  [78, 1],
];

export function juzOf(surah: number, ayah: number) {
  let juz = 1;
  JUZ_STARTS.forEach(([s, a], i) => {
    if (surah > s || (surah === s && ayah >= a)) juz = i + 1;
  });
  return juz;
}

export const toArabicDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

let picked: Verse | null = null;

export function getRandomVerse(): Verse {
  if (picked) return picked;
  const quran = loadQuran();
  const pool = quran.flatMap((surah) =>
    surah.verses
      .filter((verse) => verse.text.length <= MAX_LENGTH)
      .map((verse) => ({
        text: verse.text,
        translation: verse.translation,
        surah: surah.name,
        surahEn: surah.transliteration,
        ayah: verse.id,
      })),
  );
  picked = pool[Math.floor(Math.random() * pool.length)];
  return picked;
}

export type VerseMatch = {
  surahId: number;
  surah: string;
  ayah: number;
  text: string;
  translation: string;
};

export const normalizeQuran = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ً-ٰٟۖ-ۭـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ");

let verseIndex: (VerseMatch & { key: string })[] | null = null;

const loadVerseIndex = () =>
  (verseIndex ??= loadQuran().flatMap((surah) =>
    surah.verses.map((verse) => ({
      surahId: surah.id,
      surah: surah.name,
      ayah: verse.id,
      text: verse.text,
      translation: verse.translation,
      key: `${normalizeQuran(verse.text)} ${verse.translation.toLowerCase()}`,
    })),
  ));

export function searchVerses(query: string, limit = 60): VerseMatch[] {
  const q = normalizeQuran(query.trim());
  if (q.length < 2) return [];
  const matches: VerseMatch[] = [];
  for (const { key, ...verse } of loadVerseIndex()) {
    if (key.includes(q)) matches.push(verse);
    if (matches.length >= limit) break;
  }
  return matches;
}
