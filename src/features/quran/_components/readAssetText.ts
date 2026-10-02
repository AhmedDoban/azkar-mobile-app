import { Asset } from "expo-asset";
import { Platform } from "react-native";

const message = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

export default async function readAssetText(module: number) {
  const asset = Asset.fromModule(module);
  if (Platform.OS === "web" || asset.uri.startsWith("http")) {
    return (await fetch(asset.uri)).text();
  }
  const errors: string[] = [];
  if (asset.localUri && !asset.localUri.includes(":")) {
    asset.localUri = null;
    asset.downloaded = false;
  }
  try {
    await asset.downloadAsync();
  } catch (error) {
    errors.push(`download: ${message(error)}`);
  }
  const uri = asset.localUri ?? asset.uri;
  try {
    const { File } =
      require("expo-file-system") as typeof import("expo-file-system");
    const text = await new File(uri).text();
    if (text) return text;
    errors.push("file: empty");
  } catch (error) {
    errors.push(`file: ${message(error)}`);
  }
  try {
    const legacy =
      require("expo-file-system/legacy") as typeof import("expo-file-system/legacy");
    const text = await legacy.readAsStringAsync(uri);
    if (text) return text;
    errors.push("legacy: empty");
  } catch (error) {
    errors.push(`legacy: ${message(error)}`);
  }
  throw new Error(`${uri} → ${errors.join(" | ")}`);
}
