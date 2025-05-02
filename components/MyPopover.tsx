import { FC, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useMyState } from "@/hooks/useMyState";
import arrowDown from "@/assets/images/arrow_down.svg";
import { Image } from "expo-image";

type props = {
  children: ReactNode;
  options?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  open?: boolean;
};

const MyPopover: FC<props> = ({ children, options, containerStyle, open = false }) => {
  const optionsHeight = useMyState(0);
  return (
    <>
      <View style={{ position: "relative", ...containerStyle as object }}>
        {children}
        <View className="-translate-x-1/2"
              style={{
                position: "absolute",
                left: "50%",
                top: -30 - (optionsHeight.get() / 2)
              }}>
          <View className="-translate-x-1/2 -translate-y-1/2" style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            opacity: open ? 1 : 0,
            zIndex: 10
          }}>
            <Image source={arrowDown} style={{ width: 40, height: 40 }} />
          </View>
          <View onLayout={(e) => {
            optionsHeight.set(e.nativeEvent.layout.height);
          }} style={{ opacity: open ? 1 : 0, zIndex: 11 }}>
            {options}
          </View>
        </View>
      </View>
    </>
  );
};
export default MyPopover;
