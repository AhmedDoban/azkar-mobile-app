import SectionTitle from "@/components/ui/SectionTitle";
import CategoryGrid from "@/features/azkar/_ui/CategoryGrid";
import ZikrCard from "@/features/azkar/_ui/ZikrCard";
import DorarHadithCard from "@/features/hadith/_ui/DorarHadithCard";
import LocalHadithCard from "@/features/hadith/_ui/LocalHadithCard";
import { View } from "react-native";
import { FavoriteRowData } from "../_data/types";

export default function FavoriteRow({
  row,
  index,
}: {
  row: FavoriteRowData;
  index: number;
}) {
  return (
    <View style={{ marginTop: index === 0 ? 0 : row.first ? 24 : 12 }}>
      {row.kind === "title" ? (
        <SectionTitle title={row.title} />
      ) : row.kind === "zikr" ? (
        <ZikrCard
          categoryId={row.categoryId}
          zikr={row.zikr}
          counting={false}
        />
      ) : row.kind === "dorar" ? (
        <DorarHadithCard hadith={row.hadith} />
      ) : row.kind === "local" ? (
        <LocalHadithCard hadith={row.hadith} />
      ) : (
        <CategoryGrid categories={row.categories} showProgress={false} />
      )}
    </View>
  );
}
