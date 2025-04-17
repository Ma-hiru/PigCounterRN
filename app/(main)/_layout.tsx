import { Tabs } from "expo-router";
import { GlobalStyles } from "@/settings";
import { memo } from "react";
import { ImageStyle as RNImageStyle, Platform, Pressable, StyleProp, View } from "react-native";
import { Image, ImageSource } from "expo-image";
import Home from "@/assets/images/NavBar/home.svg";
import Home_Active from "@/assets/images/NavBar/home_active.svg";
import See from "@/assets/images/NavBar/see.svg";
import See_Active from "@/assets/images/NavBar/see_active.svg";
import Data from "@/assets/images/NavBar/data.svg";
import Data_Active from "@/assets/images/NavBar/data_active.svg";
import User from "@/assets/images/NavBar/user.svg";
import User_Active from "@/assets/images/NavBar/user_active.svg";

const MainLayout = () => {
  const RenderIcon = (focused: boolean, defaultIcon: ImageSource | number, activeIcon: ImageSource | number, style?: StyleProp<RNImageStyle>) => {
    return (
      focused ? <Image source={activeIcon} style={{
          width: 35,
          height: 35,
          position: "relative",
          right: 1.4,
          ...style as object
        }} /> :
        <Image source={defaultIcon} style={{
          width: 35, height: 35,
          position: "relative",
          right: 1.4,
          ...style as object
        }} />
    );
  };
  return (
    <>
      <Tabs
        backBehavior="firstRoute"
        screenOptions={{
          tabBarButton: (props) => (
            <Pressable
              android_ripple={{
                color: Platform.select({
                  android: GlobalStyles.ThemeColor2,
                  ios: "transparent",
                  web: "transparent"
                })
              }}
              style={({ pressed }) => ({
                opacity: Platform.select({
                  ios: pressed ? 0.5 : 1,
                  android: 1,
                  web: pressed ? 0.5 : 1
                })
              })}
              key={props.key}
              onPress={props.onPress}
            >
              <View className="flex flex-col justify-center items-center w-full h-full">
                {props.children}
              </View>
            </Pressable>
          ),
          tabBarLabelPosition: "below-icon",
          headerShown: false,
          tabBarActiveTintColor: "#000",
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: GlobalStyles.TabBarBg
          },
          tabBarItemStyle: {
            overflow: "hidden",
            borderRadius: 12
          }
        }}>
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ focused }) => RenderIcon(focused, Home, Home_Active),
            title: "首页"
          }}
        />
        <Tabs.Screen
          name="Upload"
          options={{
            tabBarIcon: ({ focused }) => RenderIcon(focused, See, See_Active, {
              bottom: 1.5,
              right: 0
            }),
            title: "计数"
          }}
        />
        <Tabs.Screen
          name="More"
          options={{
            tabBarIcon: ({ focused }) => RenderIcon(focused, Data, Data_Active, { right: 0 }),
            title: "数据"
          }}
        />
        <Tabs.Screen
          name="My"
          options={{
            tabBarIcon: ({ focused }) => RenderIcon(focused, User, User_Active, {
              right: 0.5
            }),
            title: "我的"
          }}
        />
      </Tabs>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(MainLayout);
