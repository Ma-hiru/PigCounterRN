import { FC, memo, useState } from "react";
import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from "react-native";
import { Image, ImageSource } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";
import PressFeedback from "@/components/animate/PressFeedback";

interface props {
  text: string;
  img: ImageSource | number;
  onPress?: (e: GestureResponderEvent) => void;
}

const MyPagesCardIcon: FC<props> = ({ text, img, onPress }) => {
  const [scale, setScale] = useState(1);

  return (
    <>
      <PressFeedback onPress={onPress}>
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
      </PressFeedback>
    </>
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
