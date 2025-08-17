import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { InteractionManager, StyleProp, View, ViewStyle } from "react-native";
import { useMyState } from "@/hooks/useMyState";
import arrowDown from "@/assets/images/arrow_down.svg";
import { Image } from "expo-image";
import { View as AniView, CustomAnimation } from "react-native-animatable";

type props = {
  children: ReactNode;
  options?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  open?: boolean;
};
const customAniOut: CustomAnimation = {
  easing: "ease-in-out",
  0: {
    opacity: 1
  },
  1: {
    opacity: 0
  }
};
const customAniIn: CustomAnimation = {
  easing: "ease-in-out",
  0: {
    opacity: 0
  },
  1: {
    opacity: 1
  }
};
const MyPopover: FC<props> = ({ children, options, containerStyle, open = false }) => {
  const optionsHeight = useMyState(0);
  const lastState = useRef(false);
  const AniRef = useRef<AniView>(null);
  const [show, setShow] = useState(false);
  const doAnimate = useCallback((mode: "in" | "out" | "none") => {
    const Ani = AniRef.current;
    if (Ani) {
      switch (mode) {
        case "in":
          setShow(true);
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
              Ani.animate && Ani.animate(customAniIn, 50);
            }, 25);
          });
          return;
        case "out":
          Ani.animate && Ani.animate(customAniOut, 20).finally(() => {
            setShow(false);
          });
      }
    }
  }, []);
  useEffect(() => {
    if (lastState.current === open) doAnimate("none");
    else if (!lastState.current && open) {
      doAnimate("in");
    } else if (lastState.current && !open) {
      doAnimate("out");
    }
    lastState.current = open;
  }, [doAnimate, open]);
  return (
    <>
      <View style={{ position: "relative", ...containerStyle as object }}>
        {children}
        <AniView
          ref={AniRef}
          useNativeDriver
          className="-translate-x-1/2"
          style={{
            position: "absolute",
            left: "50%",
            top: -30 - (optionsHeight.get() / 2),
            display: show ? "flex" : "none",
            opacity: 0
          }}
        >
          <View className="-translate-x-1/2 -translate-y-1/2" style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            zIndex: 10
          }}>
            <Image source={arrowDown} style={{ width: 40, height: 40 }} />
          </View>
          <View onLayout={(e) => {
            optionsHeight.set(e.nativeEvent.layout.height);
          }} style={{ zIndex: 11 }}>
            {options}
          </View>
        </AniView>
      </View>
    </>
  );
};
export default MyPopover;
