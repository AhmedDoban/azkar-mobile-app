import { useFonts } from "expo-font";
import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";

// Keys here are the family names referenced by the --font-* tokens in global.css
export default function useAppFonts() {
  const [loaded, error] = useFonts({
    SpaceGrotesk: require("@/assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Bold": require("@/assets/fonts/SpaceGrotesk-Bold.ttf"),
    LamaSans: require("@/assets/fonts/LamaSans-Regular.ttf"),
    "LamaSans-ExtraBold": require("@/assets/fonts/LamaSans-ExtraBold.ttf"),
    Amiri: Amiri_400Regular,
    "Amiri-Bold": Amiri_700Bold,
  });

  return loaded || !!error;
}
