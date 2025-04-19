import React, { FC, useEffect, useRef } from "react";
import { Portal } from "@/components/ui/portal";
import { StyleSheet, Animated, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

type props = {
  visible: boolean;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}
const MyPortal: FC<props> = ({ visible, text, containerStyle, textStyle }) => {
  // eslint-disable-next-line react-compiler/react-compiler
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
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
  }, [visible, opacity]);
  return (
    <>
      <Portal isOpen={visible}>
        <Animated.View className="w-screen h-screen justify-center items-center"
                       style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)", opacity }}>
          <Card style={{ ...styles.container, ...containerStyle as object }}>
            <Spinner size="large" />
            <Text className="mt-4" style={textStyle}>{text}</Text>
          </Card>
        </Animated.View>
      </Portal>
    </>
  );
};
export default MyPortal;
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});
