import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";


export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  return {
    topInset: Platform.select({
      android: StatusBar.currentHeight,
      ios: insets.top
    }) ?? 0,
    bottomInset: insets.bottom
  };
};
