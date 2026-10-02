import { useAppSelector } from "@/store/Store";
import { progressKey } from "@/store/Slices/AzkarSlice";
import { AzkarCategory } from "../_data";

export default function useCategoryProgress(category: AzkarCategory) {
  const done = useAppSelector((state) => {
    const progress = state.azkar.progress;
    const counted = (id: number) => progress[progressKey(category.id, id)] ?? 0;
    if (category.goals.length === 1) {
      const [item] = category.goals;
      return Math.min(counted(item.id), item.count);
    }
    return category.goals.filter((item) => counted(item.id) >= item.count)
      .length;
  });

  const total =
    category.goals.length === 1
      ? category.goals[0].count
      : category.goals.length;

  return { done, total, complete: done >= total };
}
