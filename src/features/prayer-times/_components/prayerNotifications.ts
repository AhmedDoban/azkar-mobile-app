import { isRunningInExpoGo } from "expo";
import { Platform } from "react-native";
import {
  AdhanSoundId,
  BUNDLED_SOUNDS,
  channelId,
  notificationSound,
} from "../_data/adhanSounds";
import { PrayerName } from "../_data/types";

const ID_PREFIX = "prayer-";
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

export type PrayerAlert = { prayer: PrayerName; date: Date };

export async function syncPrayerNotifications({
  alerts,
  sound,
  title,
  body,
}: {
  alerts: PrayerAlert[];
  sound: AdhanSoundId;
  title: (prayer: PrayerName, date: Date) => string;
  body: string;
}) {
  if (!Notifications) return;
  if (!(await Notifications.getPermissionsAsync()).granted) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((item) => item.identifier.startsWith(ID_PREFIX))
      .map((item) =>
        Notifications.cancelScheduledNotificationAsync(item.identifier).catch(
          () => {},
        ),
      ),
  );

  const now = Date.now();
  for (const { prayer, date } of alerts) {
    if (date.getTime() <= now) continue;
    await Notifications.scheduleNotificationAsync({
      identifier: `${ID_PREFIX}${date.getTime()}-${prayer}`,
      content: {
        title: title(prayer, date),
        body,
        sound: notificationSound(sound, Platform.OS === "ios"),
        data: { prayer },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
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
