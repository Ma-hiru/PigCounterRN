import { FC, memo, ReactNode, useEffect, useRef } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import { Button } from "@rneui/themed";
import colors from "tailwindcss/colors";
import { Spinner } from "@/components/ui/spinner";
import PressFeedback from "@/components/animate/PressFeedback";
import { CustomAnimation, View } from "react-native-animatable";
import { GlobalStyles } from "@/settings";

type props = {
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

const loadInAni: CustomAnimation = {
  easing: "ease-in-out",
  0: {
    width: "100%",
    borderRadius: 0
  },
  1: {
    width: "15%",
    borderRadius: 999
  }
};
const loadOutAni: CustomAnimation = {
  easing: "ease-in-out",
  0: {
    width: "15%",
    borderRadius: 999
  },
  1: {
    width: "100%",
    borderRadius: 0
  }
};
const AppBtn: FC<props> = (
  {
    children,
    onPress,
    className,
    containerStyle,
    buttonStyle,
    color = GlobalStyles.ThemeColor,
    loading = false,
    duration = 200,
    minScale = 0.95
  }) => {
  const AniRef = useRef<View>(null);

  useEffect(() => {
    const Ani = AniRef.current;
    if (Ani) {
      loading && Ani.animate(loadInAni, duration);
      !loading && Ani.animate(loadOutAni, duration);
    }
  }, [duration, loading]);
  return (
    <>
      <View
        ref={AniRef}
        className={className}
        onLayout={() => {
        }}
        style={{
          overflow: "hidden",
          margin: "auto",
          backgroundColor: "transparent",
          ...containerStyle as object
        }}>
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
      </View>
    </>
  );
};
export default memo(AppBtn);
