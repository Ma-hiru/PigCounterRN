import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height, scale, fontScale } = Dimensions.get("window");
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  return {
    topInset: Platform.select({
      android: StatusBar.currentHeight,
      ios: insets.top
    }) ?? 0,
    bottomInset: insets.bottom,
    screenWidth: width,
    screenHeight: height,
    scale,
    fontScale
  };
};
