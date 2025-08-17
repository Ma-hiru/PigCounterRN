import { FC, memo } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

const BottomTips: FC<props> = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text {...props} style={TipsStyle}>{props.tips || "没有更多数据了~"}</Text>
    </View>
  );
};

export default memo(BottomTips);

const {
  TipsStyle
} = StyleSheet.create({
  TipsStyle: {
    fontFamily: "FlyFlowerSongRegular" as Fonts,
    fontWeight: "normal",
    fontSize: 12
  }
} as const);

interface props extends ViewProps {
  tips?: string;
}
