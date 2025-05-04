import { useSafeArea } from "@/hooks/useSafeArea";
import { GlobalStyles } from "@/settings";
import { FC, ReactNode } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface props {
  height?: number;
  title?: string;
  className?: string;
  shadowDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
}

const Header: FC<props> = (
  {
    height = 50,
    title,
    className,
    containerStyle,
    children,
    contentStyle,
    titleStyle,
    shadowDisabled
  }) => {
  const { topInset } = useSafeArea();
  return (
    <>
      <Shadow
        containerStyle={{ backgroundColor: "#fff", ...containerStyle as object }}
        disabled={shadowDisabled}
      >
        <View
          className="h-auto justify-center items-start w-screen pl-8 pr-8"
          style={{
            height: height + topInset,
            paddingTop: topInset,
            ...contentStyle as object
          }}
        >
          <View className="items-center justify-center">
            <Text className="text-3xl font-bold"
                  style={{
                    color: GlobalStyles.HeaderText,
                    fontFamily: "baigetianxingtiRegular" as Fonts,
                    fontWeight: "normal",
                    lineHeight: 40,
                    ...titleStyle as object
                  }}
            >
              {title}
            </Text>
            {children}
          </View>
        </View>
      </Shadow>
      <View style={{ marginBottom: shadowDisabled ? 0 : 10 }} />
    </>
  );
};
export default Header;
