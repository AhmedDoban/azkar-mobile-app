import { loadQuran, Surah, toArabicDigits } from "@/features/azkar/_data/quran";
import { contentHeight, headerHeight } from "./pageLayout";

export type Segment =
  | { kind: "header"; surahId: number }
  | { kind: "text"; surahId: number; text: string };

export type MushafPageData = {
  segments: Segment[];
  surahId: number;
  verse: number;
  start: number;
  lines: number;
  free: number;
};

const SURAH_KEY = 1e7;
const DIACRITICS = /[ً-ٰٟۖ-ۭ]/g;

export const verseText = (verse: Surah["verses"][number]) =>
  `${verse.text} ${toArabicDigits(verse.id)}`;

export const surahText = (surah: Surah) =>
  surah.verses.map(verseText).join(" ");

export const positionKey = (surahId: number, offset: number) =>
  surahId * SURAH_KEY + offset + 1;

export function verseOffset(surah: Surah, ayah: number) {
  let offset = 0;
  for (const verse of surah.verses) {
    if (verse.id === ayah) return offset;
    offset += verseText(verse).length + 1;
  }
  return 0;
}

const marksIn = (text: string) => text.match(/[٠-٩]+/g)?.length ?? 0;

export const visibleLength = (text: string) =>
  text.replace(DIACRITICS, "").length;

export function estimateLines(text: string, perLine: number) {
  const lines: string[] = [];
  let line = "";
  let visible = 0;
  for (const word of text.split(" ")) {
    const size = visibleLength(word);
    if (line && visible + size + 1 > perLine) {
      lines.push(`${line} `);
      line = word;
      visible = size;
    } else {
      line = line ? `${line} ${word}` : word;
      visible += size + (visible ? 1 : 0);
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function buildMushaf(
  linesOf: (surah: Surah) => string[],
  height: number,
  lineHeight: number,
): MushafPageData[] {
  const available = contentHeight(height);
  const pages: MushafPageData[] = [];
  let used = 0;

  const open = (surahId: number, verse: number, start: number) => {
    const page: MushafPageData = {
      segments: [],
      surahId,
      verse,
      start,
      lines: 0,
      free: available,
    };
    pages.push(page);
    used = 0;
    return page;
  };

  let page: MushafPageData | undefined;

  for (const surah of loadQuran()) {
    const first = !page || page.segments.length === 0;
    if (
      !page ||
      used + headerHeight(surah.id, first) + lineHeight > available
    ) {
      page = open(surah.id, 1, positionKey(surah.id, -1));
    }
    used += headerHeight(surah.id, page.segments.length === 0);
    page.free = available - used;
    page.segments.push({ kind: "header", surahId: surah.id });

    let chunk: string[] = [];
    let offset = 0;
    let verses = 0;
    const flush = (target: MushafPageData) => {
      if (chunk.length) {
        target.segments.push({
          kind: "text",
          surahId: surah.id,
          text: chunk.map((line) => line.trim()).join(" "),
        });
      }
      chunk = [];
    };

    for (const line of linesOf(surah)) {
      if (used + lineHeight > available && used > 0) {
        flush(page);
        page = open(surah.id, verses + 1, positionKey(surah.id, offset));
      }
      chunk.push(line);
      used += lineHeight;
      page.lines += 1;
      page.free = available - used;
      offset += line.length;
      verses += marksIn(line);
    }
    flush(page);
  }

  pages[pages.length - 1].free = 0;
  return pages;
}

export function stretchedLineHeight(page: MushafPageData, lineHeight: number) {
  if (page.lines === 0 || page.free <= 0) return lineHeight;
  return lineHeight + Math.min(page.free / page.lines, lineHeight * 0.5);
}
