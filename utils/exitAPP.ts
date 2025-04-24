import { useNavigation } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { Log } from "@/utils/logger";

export const ExitApp = (navigation: ReturnType<typeof useNavigation>) => () => {
  let lastBackPressed = 0;
  const onBackPress = () => {
    const now = Date.now();
    if (now - lastBackPressed < 2000) {
      BackHandler.exitApp();
      return true;
    }
    lastBackPressed = now;
    Log.Toast("再次返回以退出应用", "SHORT", "BOTTOM");
    if (Platform.OS === "ios") {
      (navigation as any).setOptions({
        gestureEnabled: false
      });
    }
    return true;
  };
  BackHandler.addEventListener("hardwareBackPress", onBackPress);
  return () => {
    BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  };
};
