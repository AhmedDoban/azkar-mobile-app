import { isRunningInExpoGo } from "expo";
import { Platform } from "react-native";
import {
  PrayerName,
  PrayerTimesResponse,
  REMINDER_PRAYERS,
} from "../_data/types";

const CHANNEL_ID = "adhan";
const notificationId = (prayer: PrayerName) => `prayer-${prayer}`;
// Expo Go on Android dropped expo-notifications (SDK 53): importing it there
// throws, so the module is only loaded where it works (dev and store builds)
const supported =
  Platform.OS !== "web" && !(Platform.OS === "android" && isRunningInExpoGo());
const Notifications: typeof import("expo-notifications") | null = supported
  ? require("expo-notifications")
  : null;

export function configurePrayerNotifications() {
  if (!Notifications) return;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      // While the app is open the full-screen adhan screen shows instead of a banner
      shouldShowBanner: false,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Adhan",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
      vibrationPattern: [0, 400, 200, 400],
    });
  }
}

/** Asks once; returns whether reminders can be delivered */
export async function ensureNotificationPermission() {
  if (!Notifications) return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  return (await Notifications.requestPermissionsAsync()).granted;
}

/**
 * One daily notification per enabled prayer at today's time. Times move by a
 * minute or two per day, so this reruns whenever the app loads fresh times.
 */
export async function syncPrayerNotifications({
  times,
  reminders,
  title,
  body,
}: {
  times: PrayerTimesResponse["prayer_times"];
  reminders: Partial<Record<PrayerName, boolean>>;
  title: (prayer: PrayerName) => string;
  body: string;
}) {
  if (!Notifications) return;
  if (!(await Notifications.getPermissionsAsync()).granted) return;

  for (const prayer of REMINDER_PRAYERS) {
    await Notifications.cancelScheduledNotificationAsync(
      notificationId(prayer),
    ).catch(() => {});
    if (reminders[prayer] === false) continue;

    const [hour, minute] = times[prayer].split(":").map(Number);
    await Notifications.scheduleNotificationAsync({
      identifier: notificationId(prayer),
      content: {
        title: title(prayer),
        body,
        sound: "default",
        data: { prayer },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: CHANNEL_ID,
      },
    });
  }
}

/** Runs `onOpen` with the prayer when the user taps an adhan notification */
export function onPrayerNotificationOpened(onOpen: (prayer: unknown) => void) {
  if (!Notifications) return () => {};
  const sub = Notifications.addNotificationResponseReceivedListener((response) =>
    onOpen(response.notification.request.content.data?.prayer),
  );
  return () => sub.remove();
}
