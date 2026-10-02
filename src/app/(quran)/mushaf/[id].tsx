import SurahReader from "@/features/quran/SurahReader";
import { useLocalSearchParams } from "expo-router";

export default function SurahPage() {
  const { id, ayah, page } = useLocalSearchParams<{
    id: string;
    ayah?: string;
    page?: string;
  }>();
  return (
    <SurahReader
      id={Number(id)}
      ayah={ayah ? Number(ayah) : undefined}
      page={page ? Number(page) : undefined}
    />
  );
}
