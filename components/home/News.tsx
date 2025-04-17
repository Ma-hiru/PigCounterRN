import { FC, useState } from "react";
import { View, Text } from "react-native";
import NewCover from "@/assets/images/new2.png";
import { Image } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";

type props = object;

const News: FC<props> = () => {
  const [scale, setScale] = useState(1);
  return (
    <>
      <View className="w-full">
        <Image source={NewCover} style={{ width: "100%", aspectRatio: scale }}
               onLoad={setImageScale(scale, setScale)} contentFit={"contain"} />
        <Text style={{
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 16
        }}>
          这家养殖巨头扭亏为盈，“猪周期”黄金时间来了？
        </Text>
      </View>
    </>
  );
};
export default News;
