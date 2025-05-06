import { FC, memo, useState } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { Image, ImageSource } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";
import PressFeedback from "@/components/animate/PressFeedback";

interface props {
  text: string;
  img: ImageSource | number;
  onPress?: (e: GestureResponderEvent) => void;
  iconSize?: number;
}

const MyPagesCardItem: FC<props> = ({ text, img, onPress, iconSize }) => {
  const [scale, setScale] = useState(1);
  return (
    <>
      <PressFeedback onPress={onPress} minScale={0.98}>
        {
          ({ pressed }) =>
            (
              <>
                <View className="flex w-full justify-start flex-row items-center mt-4"
                      style={[pressed && styles.ContainerActive]}
                >
                  <View style={styles.IconContainer}
                        className="flex justify-center items-center">
                    <Image source={img}
                           style={{
                             ...styles.Icon,
                             aspectRatio: scale,
                             width: iconSize ?? styles.Icon.width
                           }}
                           onLoad={
                             setImageScale(scale, setScale)
                           }
                    />
                  </View>
                  <Text style={styles.Text}>{text}</Text>
                </View>
              </>
            )
        }
      </PressFeedback>
    </>
  );
};
export default memo(MyPagesCardItem);

const styles = StyleSheet.create({
  IconContainer: {
    width: 35,
    height: 35
  },
  ContainerActive: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  },
  Icon: {
    width: 20
  },
  Text: {
    marginLeft: 5
  }
} as const);
