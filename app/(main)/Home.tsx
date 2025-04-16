import Task from "@/components/home/Task";
import Weather from "@/components/home/Weather";
import MyPagesCard from "@/components/my/MyPagesCard";
import { Avatar } from "@/components/ui/avatar";
import { View, Text, BackHandler, ToastAndroid, Platform, StatusBar } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { memo } from "react";

const ExitApp = (navigation: ReturnType<typeof useNavigation>) => () => {
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
const Home = () => {
  const navigation = useNavigation();
  useFocusEffect(ExitApp(navigation));
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-gray-50">
        <Weather />
        <View className=" flex-1 bg-gray-50" style={{
          paddingLeft: 12,
          paddingRight: 12,
          position: "relative",
          top: -15,
          borderRadius: 15
        }}>
          <MyPagesCard cardStyle={{ marginBottom: 15, marginTop: 15 }}>
            <View className="justify-between flex-row items-center">
              <Text className="text-left">Username</Text>
              <Avatar></Avatar>
            </View>
          </MyPagesCard>
          <MyPagesCard cardStyle={{ marginBottom: 15, paddingBottom: 15 }} title={"今日任务"}>
            <Task />
          </MyPagesCard>
          <MyPagesCard cardStyle={{ marginBottom: 15 }} title={"未处理上传"}>
            <View className="mb-4">
              <Text style={{ textAlign: "center" }}>暂无数据</Text>
            </View>
          </MyPagesCard>
        </View>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Home);
