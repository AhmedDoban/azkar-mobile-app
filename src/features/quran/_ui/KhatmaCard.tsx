import { ReactNode } from "react";
import { View } from "react-native";

export default function KhatmaCard({ children }: { children: ReactNode }) {
  return (
    <View className="gap-4 rounded-3xl border border-line bg-surface p-5">
      {children}
    </View>
  );
}
