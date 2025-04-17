import { useNavigation } from "expo-router";
import { BackHandler, Platform, ToastAndroid } from "react-native";

export const ExitApp = (navigation: ReturnType<typeof useNavigation>) => () => {
  let lastBackPressed = 0;
  const onBackPress = () => {
    const now = Date.now();
    if (now - lastBackPressed < 2000) {
      BackHandler.exitApp();
      return true;
    }
    lastBackPressed = now;
    ToastAndroid.show("再次返回以退出应用", ToastAndroid.SHORT);
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
