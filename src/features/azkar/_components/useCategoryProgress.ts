import { useAppSelector } from "@/store/Store";
import { progressKey } from "@/store/Slices/AzkarSlice";
import { AzkarCategory } from "../_data";

export default function useCategoryProgress(category: AzkarCategory) {
  const done = useAppSelector((state) => {
    const progress = state.azkar.progress;
    const counted = (id: number) => progress[progressKey(category.id, id)] ?? 0;
    if (category.items.length === 1) {
      const [item] = category.items;
      return Math.min(counted(item.id), item.count);
    }
    return category.items.filter((item) => counted(item.id) >= item.count)
      .length;
  });

  const total =
    category.items.length === 1
      ? category.items[0].count
      : category.items.length;

  return { done, total, complete: done >= total };
}
