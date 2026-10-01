import { VariableContextProvider } from "nativewind";
import { PropsWithChildren, useMemo } from "react";
import toCssVariables from "./cssVariables";
import { useTheme } from "./ThemeProvider";

export default function ThemeScope({ children }: PropsWithChildren) {
  const theme = useTheme();
  const variables = useMemo(() => toCssVariables(theme), [theme]);
  return (
    <VariableContextProvider value={variables}>
      {children}
    </VariableContextProvider>
  );
}
