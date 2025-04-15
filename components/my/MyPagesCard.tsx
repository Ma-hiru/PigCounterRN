import { useNavigation } from "expo-router";
import { FC, memo, ReactNode } from "react";
import { View, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";

interface props {
  title?: string;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
}

const MyPagesCard: FC<props> = ({ title, children, contentStyle, cardStyle }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation();
  return (
    <>
      <View className="w-full bg-white shadow-hard-2" style={[cardStyle, styles.container]}>
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
export default memo(MyPagesCard);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5
  }
});
