import { useLocalSearchParams } from "expo-router";
import AzkarDetails from "@/features/azkar/AzkarDetails";

export default function CategoryPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <AzkarDetails id={id} />;
}
