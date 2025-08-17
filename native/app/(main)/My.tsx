import MyPagesAvatar from "@/components/my/MyPagesAvatar";
import MyPagesOptions from "@/components/my/MyPagesOptions";
import { StatusBar, View } from "react-native";
import { memo } from "react";
import { Log } from "@/utils/logger";
import { LinearGradient } from "expo-linear-gradient";


const My = () => {
  Log.Console("My");
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#dfe9f3","#ffffff"]}
        style={{ flex: 1 }}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      >
        <View className="flex-1">
          <MyPagesAvatar />
          <MyPagesOptions />
        </View>
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(My);
