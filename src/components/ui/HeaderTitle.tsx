import AppText from "./AppText";

export default function HeaderTitle({ children }: { children: string }) {
  return (
    <AppText weight="bold" className="text-lg" numberOfLines={1}>
      {children}
    </AppText>
  );
}
