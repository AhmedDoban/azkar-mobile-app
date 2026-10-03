import {
  ensureNotificationPermission,
  hasNotificationPermission,
} from "@/features/prayer-times/_components/prayerNotifications";
import {
  ReminderInterval,
  ReminderKind,
  setReminder,
} from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";
import { shallowEqual } from "react-redux";

export default function useReminderSetting(
  kind: ReminderKind,
  onDenied: () => void,
) {
  const dispatch = useAppDispatch();
  const { enabled, every } = useAppSelector(
    (s) => s.settings.reminders[kind],
    shallowEqual,
  );
  const [granted, setGranted] = useState(true);

  useEffect(() => {
    const check = () =>
      hasNotificationPermission()
        .then(setGranted)
        .catch(() => {});
    check();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") check();
    });
    return () => sub.remove();
  }, []);

  const setEnabled = useCallback(
    async (value: boolean) => {
      if (value && !(await ensureNotificationPermission())) {
        setGranted(false);
        onDenied();
        return;
      }
      if (value) setGranted(true);
      dispatch(setReminder({ kind, patch: { enabled: value } }));
    },
    [dispatch, kind, onDenied],
  );

  const setEvery = useCallback(
    (value: ReminderInterval) =>
      dispatch(setReminder({ kind, patch: { every: value } })),
    [dispatch, kind],
  );

  return { enabled: enabled && granted, every, setEnabled, setEvery };
}
