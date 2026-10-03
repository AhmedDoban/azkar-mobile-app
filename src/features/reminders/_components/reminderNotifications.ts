import { ReminderKind } from "@/store/Slices/SettingsSlice";
import { isRunningInExpoGo } from "expo";
import { Platform } from "react-native";
import { ReminderContent, ReminderSlot } from "../_data/reminders";

const ID_PREFIX = "reminder-";
const CHANNEL_ID = "reminders";

const supported =
  Platform.OS !== "web" && !(Platform.OS === "android" && isRunningInExpoGo());
const Notifications: typeof import("expo-notifications") | null = supported
  ? require("expo-notifications")
  : null;

export type ReminderPlan = {
  kind: ReminderKind;
  slots: ReminderSlot[];
  contents: ReminderContent[];
};

let generation = 0;

export async function syncReminderNotifications(
  plans: ReminderPlan[],
  channelName: string,
) {
  if (!Notifications) return;
  const run = ++generation;
  const stale = () => run !== generation;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  if (stale()) return;
  await Promise.all(
    scheduled
      .map((item) => item.identifier)
      .filter((id) => id.startsWith(ID_PREFIX))
      .map((id) =>
        Notifications.cancelScheduledNotificationAsync(id).catch(() => {}),
      ),
  );
  if (stale() || plans.length === 0) return;
  if (!(await Notifications.getPermissionsAsync()).granted || stale()) return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: channelName,
      importance: Notifications.AndroidImportance.DEFAULT,
    }).catch(() => null);
  }

  for (const { kind, slots, contents } of plans) {
    for (let i = 0; i < slots.length; i++) {
      if (stale()) return;
      const { hour, minute } = slots[i];
      const { title, body } = contents[i];
      await Notifications.scheduleNotificationAsync({
        identifier: `${ID_PREFIX}${kind}-${hour}-${minute}`,
        content: { title, body, data: { reminder: kind } },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
          channelId: CHANNEL_ID,
        },
      }).catch(() => {});
    }
  }
}
