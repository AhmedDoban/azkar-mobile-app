import { searchVerses } from "@/features/azkar/_data/quran";
import { useMemo } from "react";

export default function useVerseSearch(query: string) {
  const results = useMemo(() => searchVerses(query), [query]);
  return { results, loading: false };
}
