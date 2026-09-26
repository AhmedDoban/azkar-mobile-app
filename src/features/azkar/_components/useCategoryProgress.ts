import { useAppSelector } from "@/store/Store";
import { progressKey } from "@/store/Slices/AzkarSlice";
import { AzkarCategory } from "../_data";

/** How many adhkar in the category have reached their repeat count today */
export default function useCategoryProgress(category: AzkarCategory) {
  const progress = useAppSelector((state) => state.azkar.progress);

  const done = category.items.filter(
    (item) => (progress[progressKey(category.id, item.id)] ?? 0) >= item.count,
  ).length;

  return {
    done,
    total: category.items.length,
    complete: done === category.items.length,
  };
}
