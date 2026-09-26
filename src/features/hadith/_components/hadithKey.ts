import type { SavedHadith } from "@/store/Slices/AzkarSlice";
import type { DorarHadith } from "./parseDorar";

// Small stable string hash (djb2): Dorar ids are only list positions
function hash(text: string) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

export const savedLocal = (id: string): SavedHadith => ({
  key: `local:${id}`,
  kind: "local",
  id,
});

export const savedDorar = (hadith: DorarHadith): SavedHadith => ({
  key: `dorar:${hash(hadith.text)}`,
  kind: "dorar",
  hadith,
});
