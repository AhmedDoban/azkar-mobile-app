import Icon, { IconKey } from "./Icon";
import { View } from "react-native";

export default function IconCircle({
  icon,
  tintColor,
  backgroundColor,
}: {
  icon: IconKey;
  tintColor: string;
  backgroundColor: string;
}) {
  return (
    <View
      className="size-10 items-center justify-center rounded-full"
      style={{ backgroundColor }}
    >
      <Icon name={icon} size={20} tintColor={tintColor} />
    </View>
  );
}
