import useDirection from "@/hooks/useDirection";
import usePageInsets from "@/hooks/usePageInsets";
import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";
import { ScrollView, ScrollViewProps, View } from "react-native";
import PageHeader from "./PageHeader";

type Props = PropsWithChildren<
  ScrollViewProps & {
    className?: string;
    scroll?: boolean;
    /** Tab screens: renders the page title (the native header is hidden) */
    title?: string;
    headerTrailing?: ReactNode;
    /** Replaces the default title row (still needs `title` for the spacing) */
    header?: ReactNode;
  }
>;

/** Page wrapper: cream/navy background, direction-aware */
export default function Screen({
  children,
  className,
  scroll = true,
  title,
  headerTrailing,
  header: customHeader,
  ...props
}: Props) {
  const { direction } = useDirection();
  const insets = usePageInsets();
  const header =
    customHeader ??
    (title ? <PageHeader title={title} trailing={headerTrailing} /> : null);

  if (!scroll) {
    return (
      <View
        className={cn("flex-1 bg-main-bg", className)}
        style={{ direction, paddingTop: title ? insets.paddingTop : 0 }}
      >
        {header}
        {children}
      </View>
    );
  }

  return (
    // The ScrollView must be the screen's root view: iOS 26 finds it there to
    // minimize the tab bar on scroll (and to drive the header scroll effects)
    <ScrollView
      className="flex-1 bg-main-bg"
      style={{ direction }}
      contentContainerClassName={cn("gap-6 px-4 pt-4 pb-8", className)}
      // Tab screens own their top spacing; screens under a native header let iOS inset them
      contentContainerStyle={title ? insets : undefined}
      contentInsetAdjustmentBehavior={title ? "never" : "automatic"}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {header}
      {children}
    </ScrollView>
  );
}
