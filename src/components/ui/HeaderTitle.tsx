import AppText from "./AppText";

/** Native header title rendered by React Native, so Arabic is shaped correctly */
export default function HeaderTitle({ children }: { children: string }) {
  return (
    <AppText weight="bold" className="text-lg" numberOfLines={1}>
      {children}
    </AppText>
  );
}
