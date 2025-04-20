import { FC, memo } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { Image, ImageSource, ImageStyle } from "expo-image";
import MyPagesCard from "@/components/my/MyPagesCard";

type props = {
  title: string;
  icon: ImageSource | number;
  iconStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const IconOptionItem: FC<props> = ({ icon, title, iconStyle, titleStyle, onPress }) => {
  return (
    <>
      <MyPagesCard cardStyle={{ marginBottom: 15, width: "45%" }}>
        <Pressable onPress={onPress}>
          {
            ({ pressed }) => (
              <>
                <View className="justify-between flex-row items-center"
                      style={[pressed && styles.Shadow]}>
                  <Text className="text-center" style={titleStyle}>{title}</Text>
                  <Image source={icon}
                         style={{
                           width: 40,
                           height: 40, ...iconStyle as object
                         }}
                  />
                </View>
              </>
            )
          }
        </Pressable>
      </MyPagesCard>
    </>
  );
};
export default memo(IconOptionItem);
const styles = StyleSheet.create({
  Shadow: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  }
} as const);
