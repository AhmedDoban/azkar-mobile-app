import { useAppSelector } from "@/store/Store";
import KhatmaProgress from "./KhatmaProgress";
import KhatmaSetup from "./KhatmaSetup";

export default function KhatmaTab() {
  const plan = useAppSelector((s) => s.settings.khatma);
  return plan ? <KhatmaProgress plan={plan} /> : <KhatmaSetup />;
}
