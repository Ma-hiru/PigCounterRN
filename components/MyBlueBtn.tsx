import React, { FC, memo, ReactNode, useEffect, useRef } from "react";
import {
  StyleProp,
  View,
  ViewStyle,
  Animated,
  Easing,
  Text,
  InteractionManager
} from "react-native";
import { Button } from "@rneui/themed";
import { GlobalStyles } from "@/settings";
import { useMyState } from "@/hooks/useMyState";
import { useSafeArea } from "@/hooks/useSafeArea";
import colors from "tailwindcss/colors";
import { Spinner } from "@/components/ui/spinner";
import PressFeedback from "@/components/animate/PressFeedback";

interface props {
  children?: ReactNode;
  onPress?: () => void;
  className?: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  fullWidth?: number;
  duration?: number;
  minScale?: number;
}

const MyBlueBtn: FC<props> = (
  {
    children,
    onPress,
    className,
    color = GlobalStyles.ThemeColor,
    containerStyle,
    buttonStyle,
    loading,
    duration = 200,
    minScale = 0.95
  }) => {
  const { screenWidth } = useSafeArea();
  const FullWidth = useMyState(screenWidth);
  // eslint-disable-next-line react-compiler/react-compiler
  const borderRadius = useRef(new Animated.Value(5)).current;
  // eslint-disable-next-line react-compiler/react-compiler
  const width = useRef(new Animated.Value(screenWidth)).current;
  useEffect(() => {
    if (loading) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(borderRadius, {
          toValue: 999,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false
        }).start();
      });
    } else {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(borderRadius, {
          toValue: 5,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false
        }).start();
      });
    }
  }, [borderRadius, duration, loading]);
  useEffect(() => {
    if (loading) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(width, {
          toValue: 40,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false
        }).start();
      });
    } else {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(width, {
          toValue: FullWidth.get(),
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false
        }).start();
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
  }, [FullWidth, duration, loading, width]);
  return (
    <>
      <View style={{ width: "100%" }} onLayout={(e) => {
        FullWidth.set(e.nativeEvent.layout.width);
      }} />
      <Animated.View
        className={className}
        onLayout={() => {
        }}
        style={
          /*eslint-disable-next-line*/
          {
            borderRadius,
            width,
            overflow: "hidden",
            ...containerStyle as object
          }
        }>
        <PressFeedback minScale={minScale}>
          {
            (
              _, handlePressIn, handlePressOut
            ) => <Button
              color={color}
              style={buttonStyle}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={onPress}
            >
              {
                loading
                  ? <Spinner size="small" color={colors.white} />
                  : typeof children === "string"
                    ? <Text style={{ color: colors.white }}>{children}</Text>
                    : children
              }
            </Button>
          }
        </PressFeedback>
      </Animated.View>
    </>
  );
};
export default memo(MyBlueBtn);
