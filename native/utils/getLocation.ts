import { Log } from "@/utils/logger";
import {
  Accuracy,
  getCurrentPositionAsync, getLastKnownPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync
} from "expo-location";
import { Alert, Linking } from "react-native";

export const getLocation = async (): Promise<LocationObject | null> => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("权限被拒绝", "请前往设置开启位置权限", [
      { text: "取消", style: "cancel" },
      { text: "去设置", onPress: () => Linking.openSettings() }
    ]);
    return null;
  }
  try {
    const [location, lastKnownLocation] = await Promise.allSettled([
      getCurrentPositionAsync({
        accuracy: Accuracy.High
      }),
      getLastKnownPositionAsync()
    ]);
    if (location.status === "fulfilled") {
      Log.Console("精确位置");
      return location.value;
    }
    if (lastKnownLocation.status === "fulfilled") {
      Log.Console("使用上次位置");
      return lastKnownLocation.value;
    }
    return null;
  } catch (e) {
    Log.Console(e);
    throw e;
  }
};
