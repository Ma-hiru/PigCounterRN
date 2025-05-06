import { FC, ReactNode, useRef } from "react";
import { View, CustomAnimation } from "react-native-animatable";

import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp, ViewStyle
} from "react-native";


type props = {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  children?: ((
    e: PressableStateCallbackType,
    handlePressIn: (e: GestureResponderEvent) => void,
    handlePressOut: (e: GestureResponderEvent) => void
  ) => ReactNode) | ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  minScale?: number;
  className?: string;
};

const PressFeedback: FC<props> = (
  {
    onPress,
    children,
    containerStyle,
    minScale = 0.95,
    onLongPress,
    className
  }) => {
  const AniRef = useRef<View>(null);
  const customZoomOut: CustomAnimation = {
    easing: "ease-in-out",
    0: {
      transform: [{ scale: 1 }]
    },
    1: {
      transform: [{ scale: minScale }]
    }
  };
  const customZoomIn: CustomAnimation = {
    easing: "ease-in-out",
    0: {
      transform: [{ scale: minScale }]
    },
    1: {
      transform: [{ scale: 1 }]
    }
  };
  const handlePressIn = () => {
    const Ani = AniRef.current;
    if (Ani) {
      console.log("in");
      Ani.animate && Ani.animate(customZoomOut, 50);
    }
  };
  const handlePressOut = () => {
    const Ani = AniRef.current;
    if (Ani) {
      console.log("out");
      Ani.animate && Ani.animate(customZoomIn, 50);
    }
  };
  return (
    <>
      <View
        className={className}
        ref={AniRef}
        useNativeDriver={true}
        style={containerStyle}
      >
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={onLongPress}
        >
          {e => <>{
            children && (typeof children === "function" ? children(e, handlePressIn, handlePressOut) : children)
          }</>
          }
        </Pressable>
      </View>
    </>
  );
};
export default PressFeedback;
