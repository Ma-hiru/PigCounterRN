import { FC, Fragment, ReactNode } from "react";
import { View, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";

interface props {
  title?: string;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
}

export const MyPagesCard: FC<props> = ({ title, children, contentStyle, cardStyle }) => {
  return (
    <>
      <View className="w-full bg-white" style={[cardStyle, styles.container]}>
        {
          title &&
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "600"
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
export default MyPagesCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5
  }
});
