import { FC, memo, useEffect, useRef } from "react";
import { Modal, Pressable, Animated } from "react-native";
import { ImageSource, Image } from "expo-image";


interface props {
  source: ImageSource;
  isPreviewVisible: boolean;
  setPreviewVisible: (isPreviewVisible: boolean) => void;
}

const ImagePreview: FC<props> = ({ source, isPreviewVisible, setPreviewVisible }) => {
  // eslint-disable-next-line react-compiler/react-compiler
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPreviewVisible) {
      Animated.timing(opacity, {
        useNativeDriver: false,
        toValue: 1,
        duration: 200
      }).start();
    } else {
      Animated.timing(opacity, {
        useNativeDriver: false,
        toValue: 0,
        duration: 200
      }).start();
    }
  }, [isPreviewVisible, opacity]);
  return (
    <>
      <Modal visible={isPreviewVisible} transparent={true}>
        <Animated.View
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", opacity }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setPreviewVisible(false)}
          >
            <Image
              source={source}
              style={{ flex: 1 }}
              contentFit="contain"
            />
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
};
export default memo(ImagePreview);
