import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, ImageLoadEventData, ImageSource, ImageStyle, ImageProps } from "expo-image";
import { Animated, Modal, Pressable, StyleProp, StyleSheet } from "react-native";


const ScaledImage: FC<props> = (props) => {
  const [imgScale, setImgScale] = useState(props.initialScale || 1);
  const onImgLoad = useCallback((e: ImageLoadEventData) => {
    const { width, height } = e.source;
    const scale = width / height;
    scale !== imgScale && setImgScale(scale);
  }, [imgScale]);
  const imgStyle = useMemo(() => ({
    ...props.style as object,
    aspectRatio: imgScale
  }), [imgScale, props.style]);

  // eslint-disable-next-line react-compiler/react-compiler
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (props.canPreview && props.preview) {
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
  }, [opacity, props.canPreview, props.preview]);

  const renderImage = useMemo(
    () => <Image
      {...props}
      source={typeof props.source === "string" ? { uri: props.source } : props.source}
      style={imgStyle}
      onLoad={onImgLoad}
    />,
    [imgStyle, onImgLoad, props]
  );
  return (
    <>
      {renderImage}
      {
        props.canPreview &&
        <Modal visible={props.preview} transparent={true}>
          <Animated.View
            style={{
              ...MaskStyle,
              opacity: opacity
            }}
          >
            <Pressable style={PreviewPressableStyle} onPress={props.onCancelPreview}>
              {renderImage}
            </Pressable>
          </Animated.View>
        </Modal>
      }
    </>
  );
};
export default memo(ScaledImage);

const {
  MaskStyle,
  PreviewPressableStyle
} = StyleSheet.create({
  MaskStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  PreviewPressableStyle: {
    flex: 1, alignItems: "center",
    justifyContent: "center"
  }
} as const);


interface props extends ImageProps {
  initialScale?: number;
  source?: ImageSource | number | string;
  style?: StyleProp<ImageStyle>;
  canPreview?: boolean;
  preview?: boolean;
  onCancelPreview?: () => void;
}
