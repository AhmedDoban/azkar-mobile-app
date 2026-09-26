import { useEffect } from "react";
import { AppState } from "react-native";
import { startNewDay } from "@/store/Slices/AzkarSlice";
import { useAppDispatch } from "@/store/Store";

/** Milliseconds until the next local midnight (plus a second of margin) */
const msUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return midnight.getTime() - now.getTime() + 1000;
};

/**
 * Resets all adhkar counters automatically every day: at midnight while the
 * app is open, and whenever it comes back to the foreground on a new day
 * (timers don't run while it's in the background).
 */
export default function useDailyReset() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(startNewDay());
        schedule();
      }, msUntilMidnight());
    };

    dispatch(startNewDay());
    schedule();

    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") return;
      dispatch(startNewDay());
      schedule(); // the old timer may have been frozen in the background
    });

    return () => {
      clearTimeout(timer);
      sub.remove();
    };
  }, [dispatch]);
}
