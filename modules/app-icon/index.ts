import { requireOptionalNativeModule } from "expo";
import { Platform } from "react-native";

type NativeAppIcon = {
  setIcon(name: string, names: string[]): void;
};

const native =
  Platform.OS === "android"
    ? requireOptionalNativeModule<NativeAppIcon>("AppIcon")
    : null;

export const androidAppIconAvailable = native !== null;

export function setAndroidAppIcon(name: string, names: string[]) {
  try {
    native?.setIcon(name, names);
  } catch {}
}
