import { FC, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useMyState } from "@/hooks/useMyState";

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
              style={{ position: "absolute", left: "50%", top: -30 - (optionsHeight.get() / 2) }}
        >
          <View onLayout={(e) => {
            optionsHeight.set(e.nativeEvent.layout.height);
          }} style={{ opacity: open ? 1 : 0 }}>
            {options}
          </View>
        </View>
      </View>
    </>
  );
};
export default MyPopover;
