import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { GlobalStyles } from "@/settings";
import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function MainLayout() {
  return (
    <Tabs
      backBehavior="firstRoute"
      screenOptions={{
        tabBarButton: (props) => (
          <Pressable
            android_ripple={{
              color: Platform.select({
                android: "rgba(192,192,192,0.2)",
                ios: "transparent",
                web: "transparent"
              })
            }}
            style={({ pressed }) => ({
              opacity: Platform.select({
                ios: pressed ? 0.5 : 1,
                android: 1,
                web: pressed ? 0.5 : 1,
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
        tabBarActiveTintColor: GlobalStyles.ThemeColor,
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
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          title: "首页"
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="upload-cloud" size={24} color={color} />
          ),
          title: "上传"
        }}
      />
      <Tabs.Screen
        name="Report"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" size={24} color={color} />
          ),
          title: "上报"
        }}
      />
      <Tabs.Screen
        name="My"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
          title: "组织"
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabsBarBorder: {
    borderWidth: 0
  }
});
