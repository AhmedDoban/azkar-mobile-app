import { PropsWithChildren } from "react";
import { View } from "react-native";
import useHadithColors from "../_components/useHadithColors";

export default function HadithPaper({ children }: PropsWithChildren) {
  const p = useHadithColors();

  return (
    <View
      className="gap-4 overflow-hidden rounded-3xl border p-5"
      style={{
        backgroundColor: p.card,
        borderColor: p.line,
        boxShadow: "0 4px 12px rgba(9, 43, 56, 0.06)",
      }}
    >
      {children}
    </View>
  );
}
