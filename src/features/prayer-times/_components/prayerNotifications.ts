import { isRunningInExpoGo } from "expo";
import { Platform } from "react-native";
import {
  AdhanSoundId,
  BUNDLED_SOUNDS,
  channelId,
  notificationSound,
} from "../_data/adhanSounds";
import {
  PrayerName,
  PrayerTimesResponse,
  REMINDER_PRAYERS,
} from "../_data/types";

const notificationId = (prayer: PrayerName) => `prayer-${prayer}`;
const supported =
  Platform.OS !== "web" && !(Platform.OS === "android" && isRunningInExpoGo());
const Notifications: typeof import("expo-notifications") | null = supported
  ? require("expo-notifications")
  : null;

export function configurePrayerNotifications() {
  if (!Notifications) return;

  Notifications.setNotificationHandler({
    handleNotification: async (notification) => ({
      shouldShowBanner: false,
      shouldShowList: true,
      shouldPlaySound: !String(
        notification.request.content.sound ?? "",
      ).startsWith("adhan_"),
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === "android") {
    for (const { id } of BUNDLED_SOUNDS) {
      Notifications.setNotificationChannelAsync(channelId(id), {
        name: `Adhan (${id})`,
        importance: Notifications.AndroidImportance.MAX,
        sound: notificationSound(id, false),
        vibrationPattern: [0, 400, 200, 400],
      });
    }
  }
}

export async function ensureNotificationPermission() {
  if (!Notifications) return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  return (await Notifications.requestPermissionsAsync()).granted;
}

export async function syncPrayerNotifications({
  times,
  reminders,
  sound,
  title,
  body,
}: {
  sound: AdhanSoundId;
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
        sound: notificationSound(sound, Platform.OS === "ios"),
        data: { prayer },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: channelId(sound),
      },
    });
  }
}

export function onPrayerNotificationOpened(onOpen: (prayer: unknown) => void) {
  if (!Notifications) return () => {};
  const sub = Notifications.addNotificationResponseReceivedListener(
    (response) => onOpen(response.notification.request.content.data?.prayer),
  );
  return () => sub.remove();
}
