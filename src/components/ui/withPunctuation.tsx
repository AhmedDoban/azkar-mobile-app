import { ReactNode } from "react";
import { Text } from "react-native";

const PUNCTUATION = /([،؛؟.,:!"«»-]+)/;
const PUNCTUATION_FONT = { fontFamily: "LamaSans" };

export default function withPunctuation(children: ReactNode) {
  if (typeof children !== "string" || !PUNCTUATION.test(children)) {
    return children;
  }
  return children.split(PUNCTUATION).map((part, i) =>
    i % 2 ? (
      <Text key={i} style={PUNCTUATION_FONT}>
        {part}
      </Text>
    ) : (
      part
    ),
  );
}
