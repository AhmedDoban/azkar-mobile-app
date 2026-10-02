import { Platform } from "react-native";
import { requireOptionalNativeModule } from "expo";
import type { EventSubscription } from "expo-modules-core";

export type AdhanAlarm = {
  id: string;
  at: number;
  prayer: string;
  title: string;
  body: string;
  channelId: string;
};

export type AdhanLaunch = { prayer: string; id: string; at: number };

type NativeAdhanAlarm = {
  schedule(alarms: AdhanAlarm[]): void;
  consumeLaunch(): AdhanLaunch | null;
  dismiss(id: string): void;
  addListener(
    event: "onAdhan",
    listener: (launch: AdhanLaunch) => void,
  ): EventSubscription;
};

const native =
  Platform.OS === "android"
    ? requireOptionalNativeModule<NativeAdhanAlarm>("AdhanAlarm")
    : null;

export const adhanAlarmAvailable = native !== null;

export const scheduleAdhanAlarms = (alarms: AdhanAlarm[]) =>
  native?.schedule(alarms);

export const consumeAdhanLaunch = () => native?.consumeLaunch() ?? null;

export const dismissAdhanAlarm = (id: string) => native?.dismiss(id);

export const addAdhanListener = (listener: (launch: AdhanLaunch) => void) =>
  native?.addListener("onAdhan", listener) ?? null;
