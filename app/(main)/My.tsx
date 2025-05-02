import MyPagesAvatar from "@/components/my/MyPagesAvatar";
import MyPagesOptions from "@/components/my/MyPagesOptions";
import { StatusBar, View } from "react-native";
import { memo } from "react";
import { Log } from "@/utils/logger";


const My = () => {
  Log.Console("My");
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1">
        <MyPagesAvatar />
        <MyPagesOptions />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(My);
