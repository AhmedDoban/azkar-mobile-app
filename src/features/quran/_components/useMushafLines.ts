import { Surah } from "@/features/azkar/_data/quran";
import { useCallback, useState } from "react";
import { estimateLines, surahText, visibleLength } from "./buildPages";
import { lineHeightFor } from "./pageLayout";

const measured = new Map<string, string[]>();
const estimated = new Map<string, string[]>();
const lineHeights = new Map<number, number>();
const calibration = { chars: 1 / 0.42, lineRatio: 1 };

function calibrate(
  lines: string[],
  width: number,
  fontSize: number,
  lineHeight?: number,
) {
  const full = lines.slice(0, -1);
  if (full.length >= 3) {
    const average =
      full.reduce((sum, line) => sum + visibleLength(line.trim()), 0) /
      full.length;
    calibration.chars = (average * fontSize) / width;
  }
  if (lineHeight && lineHeight > 0) {
    calibration.lineRatio = lineHeight / lineHeightFor(fontSize);
  }
}

export default function useMushafLines(width: number, fontSize: number) {
  const [version, setVersion] = useState(0);
  const perLine = Math.max(
    8,
    Math.floor((width * calibration.chars) / fontSize),
  );

  const linesOf = useCallback(
    (surah: Surah) => {
      const exact = measured.get(`${width}:${fontSize}:${surah.id}`);
      if (exact) return exact;
      const key = `${perLine}:${surah.id}`;
      let guess = estimated.get(key);
      if (!guess) {
        guess = estimateLines(surahText(surah), perLine);
        estimated.set(key, guess);
      }
      return guess;
    },
    [width, fontSize, perLine, version],
  );

  const isMeasured = useCallback(
    (surahId: number) => measured.has(`${width}:${fontSize}:${surahId}`),
    [width, fontSize, version],
  );

  const save = useCallback(
    (surahId: number, lines: string[], lineHeight?: number) => {
      if (lineHeight && lineHeight > 0) lineHeights.set(fontSize, lineHeight);
      calibrate(lines, width, fontSize, lineHeight);
      measured.set(`${width}:${fontSize}:${surahId}`, lines);
      setVersion((v) => v + 1);
    },
    [width, fontSize],
  );

  return {
    linesOf,
    isMeasured,
    save,
    version,
    lineHeight:
      lineHeights.get(fontSize) ??
      Math.round(lineHeightFor(fontSize) * calibration.lineRatio),
  };
}
