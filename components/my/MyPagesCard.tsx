import { useNavigation } from "expo-router";
import { FC, memo, ReactNode } from "react";
import { View, Text, StyleProp, ViewStyle, StyleSheet, Pressable, TextStyle } from "react-native";

type props = {
  title?: string;
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  className?: string;
}
type CanPressType = {
  children: ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  onLongPress?: () => void;
}
const MyPagesCard: FC<props> & { CanPress: FC<CanPressType> } = (
  {
    title,
    children,
    contentStyle,
    cardStyle,
    titleStyle,
    className
  }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation();
  return (
    <>
      <View className={"w-full bg-white shadow-hard-2 " + className}
            style={[cardStyle, styles.container]}>
        {
          title &&
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "600",
              ...titleStyle as object
            }}
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
const CanPress: FC<CanPressType> = ({ children, onPress, containerStyle, onLongPress }) => {
  return <>
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      {
        ({ pressed }) =>
          <View style={[pressed && styles.Shadow, containerStyle]}>
            {children}
          </View>
      }
    </Pressable>
  </>;
};
MyPagesCard.CanPress = memo(CanPress);
export default MyPagesCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5
  },
  Shadow: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  }
} as const);
