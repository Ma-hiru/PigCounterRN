import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, Platform, StatusBar } from "react-native";
import { useMemo } from "react";

const { width, height, scale, fontScale } = Dimensions.get("window");
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  return useMemo(() => ({
    topInset: Platform.select({
      android: StatusBar.currentHeight,
      ios: insets.top
    }) ?? 0,
    bottomInset: insets.bottom,
    screenWidth: width,
    screenHeight: height,
    scale,
    fontScale
  }), [insets.bottom, insets.top]);
};
