import { useAppSelector } from "@/store/Store";
import { progressKey } from "@/store/Slices/AzkarSlice";
import { AzkarCategory } from "../_data";

export default function useCategoryProgress(category: AzkarCategory) {
  const progress = useAppSelector((state) => state.azkar.progress);
  const counted = (id: number) => progress[progressKey(category.id, id)] ?? 0;

  if (category.items.length === 1) {
    const [item] = category.items;
    const done = Math.min(counted(item.id), item.count);
    return { done, total: item.count, complete: done >= item.count };
  }

  const done = category.items.filter(
    (item) => counted(item.id) >= item.count,
  ).length;

  return {
    done,
    total: category.items.length,
    complete: done === category.items.length,
  };
}
