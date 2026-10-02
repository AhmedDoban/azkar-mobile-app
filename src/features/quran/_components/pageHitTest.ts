import { AyahRef } from "@/features/azkar/_data/quran";

type HitTest = (x: number, y: number) => AyahRef | null;

const testers = new Map<number, HitTest>();

export function registerHitTest(page: number, test: HitTest) {
  testers.set(page, test);
  return () => {
    if (testers.get(page) === test) testers.delete(page);
  };
}

export const hitTest = (page: number, x: number, y: number) =>
  testers.get(page)?.(x, y) ?? null;
