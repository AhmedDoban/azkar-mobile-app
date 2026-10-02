import { useEffect } from "react";
import { AppState } from "react-native";
import { startNewDay } from "@/store/Slices/AzkarSlice";
import { useAppDispatch } from "@/store/Store";

const msUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  return midnight.getTime() - now.getTime() + 1000;
};

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
      schedule();
    });

    return () => {
      clearTimeout(timer);
      sub.remove();
    };
  }, [dispatch]);
}
