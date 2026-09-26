import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function usePageInsets() {
  const insets = useSafeAreaInsets();
  return {
    paddingTop: (Platform.OS === "ios" ? 0 : insets.top) + 4,
    paddingBottom: 16,
  };
}
