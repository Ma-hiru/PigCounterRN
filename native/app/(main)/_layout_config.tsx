import { Image, ImageSource } from "expo-image";
import { ImageStyle as RNImageStyle, Platform, Pressable, StyleProp, View } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/lib/typescript/module/src";
import { GlobalStyles } from "@/settings.theme";
import { Tabs } from "expo-router";

//types
type ScreenOptions = Parameters<typeof Tabs>[0]["screenOptions"];
type TabOptions = Parameters<typeof Tabs.Screen>[0]["options"];

//exports
export function create_icon(
  defaultIcon: ImageSource | number,
  activeIcon: ImageSource | number,
  title: string,
  style?: StyleProp<RNImageStyle>
): TabOptions {
  return {
    tabBarIcon: (event) => {
      return render_icon(event.focused, defaultIcon, activeIcon, style);
    },
    title
  };
}

export const screen_options: ScreenOptions = {
  animation: "shift",
  tabBarButton: render_tab_bar_button,
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
  },
};

//func
function render_icon(
  focused: boolean,
  defaultIcon: ImageSource | number,
  activeIcon: ImageSource | number,
  style?: StyleProp<RNImageStyle>
) {
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
}

function render_tab_bar_button(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      android_ripple={android_ripple}
      style={pressable_style}
      key={props.key}
      onPress={props.onPress}
    >
      <View className="flex flex-col justify-center items-center w-full h-full">
        {props.children}
      </View>
    </Pressable>
  );
}


const android_ripple = {
  color: Platform.select({
    android: "#f5f5f5",
    ios: "transparent",
    web: "transparent"
  })
};

const pressable_style = (event => {
  return {
    opacity: Platform.select({
      ios: event.pressed ? 0.5 : 1,
      android: 1,
      web: event.pressed ? 0.5 : 1
    })
  };
}) satisfies Parameters<typeof Pressable>[0]["style"];
