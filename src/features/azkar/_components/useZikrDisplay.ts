import { useAppSelector } from "@/store/Store";
import { shallowEqual } from "react-redux";

export default function useZikrDisplay() {
  return useAppSelector(
    (s) => ({
      prefix: s.settings.reading.showPrefix,
      suffix: s.settings.reading.showSuffix,
      virtue: s.settings.reading.showVirtue,
      source: s.settings.reading.showSource,
    }),
    shallowEqual,
  );
}
