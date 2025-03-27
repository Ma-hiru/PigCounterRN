import { View, Text, BackHandler, ToastAndroid, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "expo-router";
import { memo, useCallback } from "react";


const Home = () => {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      let lastBackPressed = 0;
      const onBackPress = () => {
        const now = Date.now();
        if (now - lastBackPressed < 2000) { // 2秒内双击退出
          BackHandler.exitApp();
          return true;
        }
        lastBackPressed = now;
        ToastAndroid.show("再次返回以退出应用", ToastAndroid.SHORT);
        if (Platform.OS === "ios") {
          navigation.setOptions({
            gestureEnabled: false,
          });
        }
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation]),
  );
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 flex justify-center items-center w-screen h-screen bg-gray-50">
        <Text>Home1</Text>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Home);
