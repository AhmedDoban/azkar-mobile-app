import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hadiths } from "../_data";

const BATCH = 10;

export default function useHadithPagination() {
  const [count, setCount] = useState(BATCH);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasMore = count < hadiths.length;
  const visible = useMemo(() => hadiths.slice(0, count), [count]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    timer.current = setTimeout(() => {
      setCount((c) => Math.min(c + BATCH, hadiths.length));
      setLoading(false);
    }, 400);
  }, [loading, hasMore]);

  return { visible, hasMore, loadMore };
}
