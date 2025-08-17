import { FC, memo } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import icon from "@/assets/images/blank.svg";
import { Image } from "expo-image";

type props = {
  tips?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

const Blank: FC<props> = ({ tips, style, className }) => {
  return (
    <>
      <View className={"flex-1 justify-center items-center " + className} style={style}>
        <Image source={icon} style={{ width: 200, height: 200 }} />
        <Text style={{ fontSize: 16, fontFamily: "baigetianxingtiRegular" as Fonts }}>{tips}</Text>
      </View>
    </>
  );
};
export default memo(Blank);
