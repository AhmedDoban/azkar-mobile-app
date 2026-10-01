import SurahReader from "@/features/quran/SurahReader";
import { useLocalSearchParams } from "expo-router";

export default function SurahPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SurahReader id={Number(id)} />;
}
