import { FC, memo, useState } from "react";
import { View, Text,StyleSheet, Pressable, GestureResponderEvent } from "react-native";
import { Text as TextInline } from "@/components/ui/text";
import { Image, ImageSource } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";

interface props {
  text: string;
  img: ImageSource;
  onPress?: (e: GestureResponderEvent) => void;
}

const MyPagesCardIcon: FC<props> = ({ text, img, onPress }) => {
  const [scale, setScale] = useState(1);

  return (
    <Pressable onPress={onPress}>
      {
        ({ pressed }) =>
          (
            <View style={pressed ? styles.IconContainerActive : styles.IconContainer}
                  className="flex justify-center items-center">
              <Image source={img}
                     style={{ ...styles.Icon, aspectRatio: scale }}
                     onLoad={
                       setImageScale(scale, setScale)
                     }
              />
              <Text style={styles.Text}>{text}</Text>
            </View>
          )
      }
    </Pressable>
  );
};
export default memo(MyPagesCardIcon);

const styles = StyleSheet.create({
  IconContainer: {},
  IconContainerActive: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  },
  Icon: {
    width: 40
  },
  Text: {}
});
