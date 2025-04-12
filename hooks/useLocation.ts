import { useAsync } from "@/hooks/useAsync";
import logger from "@/utils/logger";
import {
  Accuracy,
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync
} from "expo-location";
import { Alert, Linking, ToastAndroid } from "react-native";

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
    return await getCurrentPositionAsync({ accuracy: Accuracy.Low });
  } catch (e) {
    logger("console", e);
    throw e;
  }
};
export const useLocation = () => {
  const [data, loading, err] = useAsync(getLocation, true);
  if (err) {
    logger("console", err);
    ToastAndroid.showWithGravity("定位失败，请检查网络或权限", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    return null;
  }
  if (loading || !data) return null;
  return data;
};
