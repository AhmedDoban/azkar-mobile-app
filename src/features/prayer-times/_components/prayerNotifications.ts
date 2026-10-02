import { isRunningInExpoGo } from "expo";
import { Platform } from "react-native";
import {
  AdhanSoundId,
  BUNDLED_SOUNDS,
  channelId,
  notificationSound,
} from "../_data/adhanSounds";
import { PrayerName } from "../_data/types";
import {
  adhanAlarmAvailable,
  addAdhanListener,
  consumeAdhanLaunch,
  dismissAdhanAlarm,
  scheduleAdhanAlarms,
} from "../../../../modules/adhan-alarm";

const ID_PREFIX = "prayer-";
const supported =
  Platform.OS !== "web" && !(Platform.OS === "android" && isRunningInExpoGo());
const Notifications: typeof import("expo-notifications") | null = supported
  ? require("expo-notifications")
  : null;

let configured: Promise<void> | null = null;

export function configurePrayerNotifications() {
  if (!Notifications) return Promise.resolve();
  if (configured) return configured;

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

  const channels =
    Platform.OS === "android"
      ? BUNDLED_SOUNDS.map(({ id }) =>
          Notifications.setNotificationChannelAsync(channelId(id), {
            name: `Adhan (${id})`,
            importance: Notifications.AndroidImportance.MAX,
            sound: notificationSound(id, false),
            vibrationPattern: [0, 400, 200, 400],
          }).catch(() => null),
        )
      : [];
  configured = Promise.all(channels).then(() => {});
  return configured;
}

export async function ensureNotificationPermission() {
  if (!Notifications) return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  return (await Notifications.requestPermissionsAsync()).granted;
}

export type PrayerAlert = { prayer: PrayerName; date: Date };

type SyncOptions = {
  alerts: PrayerAlert[];
  sound: AdhanSoundId;
  title: (prayer: PrayerName, date: Date) => string;
  body: string;
};

const SYNC_DELAY = 500;
let generation = 0;
let pendingSync: ReturnType<typeof setTimeout> | undefined;

const signature = (value: string) => {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) + hash + value.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
};

export function syncPrayerNotifications(options: SyncOptions) {
  if (!Notifications) return;
  clearTimeout(pendingSync);
  const run = ++generation;
  pendingSync = setTimeout(() => {
    reschedule(options, run).catch(() => {});
  }, SYNC_DELAY);
}

async function reschedule(
  { alerts, sound, title, body }: SyncOptions,
  run: number,
) {
  if (!Notifications) return;
  const stale = () => run !== generation;
  await configurePrayerNotifications();
  if (stale()) return;
  if (!(await Notifications.getPermissionsAsync()).granted || stale()) return;

  const now = Date.now();
  const wanted = new Map<
    string,
    { prayer: PrayerName; date: Date; title: string }
  >();
  for (const { prayer, date } of alerts) {
    if (date.getTime() <= now) continue;
    const text = title(prayer, date);
    const id = `${ID_PREFIX}${date.getTime()}-${prayer}-${signature(
      `${sound}|${text}|${body}`,
    )}`;
    wanted.set(id, { prayer, date, title: text });
  }

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  if (stale()) return;

  if (adhanAlarmAvailable) {
    await Promise.all(
      scheduled
        .map((item) => item.identifier)
        .filter((id) => id.startsWith(ID_PREFIX))
        .map((id) =>
          Notifications.cancelScheduledNotificationAsync(id).catch(() => {}),
        ),
    );
    if (stale()) return;
    scheduleAdhanAlarms(
      [...wanted].map(([id, { prayer, date, title: text }]) => ({
        id,
        at: date.getTime(),
        prayer,
        title: text,
        body,
        channelId: channelId(sound),
      })),
    );
    return;
  }

  const existing = new Set(
    scheduled
      .map((item) => item.identifier)
      .filter((id) => id.startsWith(ID_PREFIX)),
  );

  await Promise.all(
    [...existing]
      .filter((id) => !wanted.has(id))
      .map((id) =>
        Notifications.cancelScheduledNotificationAsync(id).catch(() => {}),
      ),
  );

  for (const [identifier, { prayer, date, title: text }] of wanted) {
    if (stale()) return;
    if (existing.has(identifier)) continue;
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: {
        title: text,
        body,
        sound: notificationSound(sound, Platform.OS === "ios"),
        data: { prayer },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: channelId(sound),
      },
    }).catch(() => {});
  }
}

export function onPrayerNotificationOpened(onOpen: (prayer: unknown) => void) {
  if (adhanAlarmAvailable) {
    const open = (
      launch: { prayer: string; id: string; at: number } | null,
    ) => {
      if (!launch) return;
      dismissAdhanAlarm(launch.id);
      if (Date.now() - launch.at > 30 * 60 * 1000) return;
      onOpen(launch.prayer);
    };
    open(consumeAdhanLaunch());
    const sub = addAdhanListener(open);
    return () => sub?.remove();
  }
  if (!Notifications) return () => {};
  Notifications.getLastNotificationResponseAsync()
    .then((response) => {
      if (!response) return;
      const opened = response.notification.request;
      if (!opened.identifier.startsWith(ID_PREFIX)) return;
      if (Date.now() - response.notification.date > 30 * 60 * 1000) return;
      onOpen(opened.content.data?.prayer);
    })
    .catch(() => {});
  const sub = Notifications.addNotificationResponseReceivedListener(
    (response) => onOpen(response.notification.request.content.data?.prayer),
  );
  return () => sub.remove();
}
