import ContentActions from "@/components/ui/ContentActions";
import { SavedHadith, toggleFavoriteHadith } from "@/store/Slices/AzkarSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { useTranslation } from "react-i18next";
import useHadithColors from "../_components/useHadithColors";

export default function HadithActions({
  text,
  saved,
}: {
  text: string;
  saved: SavedHadith;
}) {
  const { t } = useTranslation("hadith");
  const p = useHadithColors();
  const dispatch = useAppDispatch();
  const loved = useAppSelector((s) =>
    s.azkar.favoriteHadiths.some((h) => h.key === saved.key),
  );

  return (
    <ContentActions
      text={text}
      loved={loved}
      loveLabel={t("saveHadith")}
      onToggleLove={() => dispatch(toggleFavoriteHadith(saved))}
      idleColor={p.accent}
      activeColor={p.accent}
      buttonClassName="bg-transparent"
    />
  );
}
