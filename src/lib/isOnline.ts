import { getNetworkStateAsync } from "expo-network";

export default async function isOnline() {
  try {
    const state = await getNetworkStateAsync();
    return !!state.isConnected && state.isInternetReachable !== false;
  } catch {
    return true;
  }
}
