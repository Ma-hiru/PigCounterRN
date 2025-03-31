import MyPagesAvatar from "@/components/my/MyPagesAvatar";
import MyPagesOptions from "@/components/my/MyPagesOptions";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { memo } from "react";


const My = () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1">
        <MyPagesAvatar />
        <MyPagesOptions />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(My);
