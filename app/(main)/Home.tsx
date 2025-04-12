import Header from "@/components/Header";
import Weather from "@/components/home/Weather";
import { View, Text, BackHandler, ToastAndroid, Platform, StatusBar } from "react-native";
import { Button } from "@rneui/themed";
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
      <Header title="首页" />
      <Weather></Weather>
      <View className="flex-1 flex justify-center items-center bg-gray-50">
        <Text>Home1</Text>
        <Button>123</Button>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Home);
