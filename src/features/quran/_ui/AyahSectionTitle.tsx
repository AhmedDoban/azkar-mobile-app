import AppText from "@/components/ui/AppText";
import { ReactNode } from "react";
import usePopupColors from "../_components/usePopupColors";

export default function AyahSectionTitle({
  children,
}: {
  children: ReactNode;
}) {
  const c = usePopupColors();
  return (
    <AppText weight="bold" className="px-1 text-xl" style={{ color: c.ink }}>
      {children}
    </AppText>
  );
}
