import { ReactNode, useRef, memo, useCallback, useMemo } from "react";
import { View, CustomAnimation } from "react-native-animatable";

import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp, StyleSheet, ViewStyle
} from "react-native";


const PressFeedback = <T, >(
  {
    onPress,
    children,
    containerStyle,
    minScale = 0.95,
    maxScale = 1,
    onLongPress,
    className,
    pressValue,
    onPressValue,
    pressShadow = false
  }: props<T>) => {
  const AniRef = useRef<View>(null);
  const CustomZoomAni = useMemo<CustomAnimation[]>(() => {
    return GetZoomAni(minScale, maxScale);
  }, [maxScale, minScale]);
  const handlePressIn = useCallback(() => {
    const Ani = AniRef.current;
    if (Ani) {
      Ani.animate(CustomZoomAni[0], 50).then();
    }
  }, [CustomZoomAni]);
  const handlePressOut = useCallback(() => {
    const Ani = AniRef.current;
    if (Ani) {
      Ani.animate(CustomZoomAni[1], 50).then();
    }
  }, [CustomZoomAni]);
  const handlePress = useCallback((e: GestureResponderEvent) => {
    onPress && onPress(e);
    if (pressValue !== undefined && onPressValue) {
      onPressValue(pressValue);
    }
  }, [onPress, onPressValue, pressValue]);
  const ContainerStyle = useMemo(() => {
    return [
      { backgroundColor: "transparent" },
      containerStyle,
      { transform: [{ scale: maxScale }] }
    ];
  }, [containerStyle, maxScale]);
  return (
    <>
      <View
        className={className}
        ref={AniRef}
        useNativeDriver={true}
        style={ContainerStyle}
      >
        <Pressable
          android_ripple={pressShadow ? {
            color: "rgba(0, 0, 0, 0.2)",
            borderless: false,
            radius: 300
          } : undefined}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={onLongPress}
          style={PressableStyle}
        >
          {
            e => (
              <>
                {children && (typeof children === "function" ? children(e, handlePressIn, handlePressOut) : children)}
              </>
            )
          }
        </Pressable>
      </View>
    </>
  );
};
export default memo(PressFeedback) as typeof PressFeedback;

const {
  PressableStyle
} = StyleSheet.create({
  PressableStyle: {
    backgroundColor: "transparent"
  }
} as const);

const GetZoomAni = (minScale: number, maxScale: number): CustomAnimation[] => {
  return [
    {
      easing: "ease-in-out",
      0: {
        transform: [{ scale: maxScale }]
      },
      1: {
        transform: [{ scale: minScale }]
      }
    },
    {
      easing: "ease-in-out",
      0: {
        transform: [{ scale: minScale }]
      },
      1: {
        transform: [{ scale: maxScale }]
      }
    }
  ];
};

interface props<T extends any> {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  children?: ((
    e: PressableStateCallbackType,
    handlePressIn: (e: GestureResponderEvent) => void,
    handlePressOut: (e: GestureResponderEvent) => void
  ) => ReactNode) | ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  minScale?: number;
  maxScale?: number;
  className?: string;
  pressValue?: T;
  onPressValue?: (value: T) => void;
  pressShadow?: boolean;
}
