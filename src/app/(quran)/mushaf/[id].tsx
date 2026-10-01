import SurahReader from "@/features/quran/SurahReader";
import { useLocalSearchParams } from "expo-router";

export default function SurahPage() {
  const { id, ayah } = useLocalSearchParams<{ id: string; ayah?: string }>();
  return (
    <SurahReader id={Number(id)} ayah={ayah ? Number(ayah) : undefined} />
  );
}
