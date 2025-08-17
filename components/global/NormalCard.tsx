import { FC, memo, ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const NormalCard: FC<props> = (
  {
    title,
    titleStyle,
    contentStyle,
    cardStyle,
    children,
    className
  }) => {
  return (
    <>
      <View className={"w-full bg-white shadow-hard-2 " + className}
            style={[cardStyle, Container]}>
        {
          title &&
          <Text style={[{ marginBottom: 10, fontWeight: "600" }, titleStyle]}
                selectable={false}
          >
            {title}
          </Text>
        }
        <View style={contentStyle}>
          {children}
        </View>
      </View>
    </>
  );
};
export default memo(NormalCard);

const {
  Container
} = StyleSheet.create({
  Container: {
    padding: 10,
    borderRadius: 5
  }
} as const);

interface props {
  title?: string;
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  className?: string;
}
