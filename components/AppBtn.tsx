import { FC, memo, ReactNode, useEffect, useMemo, useRef } from "react";
import { DimensionValue, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { Button } from "@rneui/themed";
import colors from "tailwindcss/colors";
import { Spinner } from "@/components/ui/spinner";
import PressFeedback from "@/components/animate/PressFeedback";
import { CustomAnimation, View } from "react-native-animatable";
import {GlobalStyles} from "@/settings";


const AppBtn: FC<props> = (
  {
    onPress,
    children,
    className,
    loadingText,
    buttonStyle,
    containerStyle,
    maxScale = 1,
    duration = 200,
    loading = false,
    minScale = 0.95,
    minLoadingWidth = "15%",
    maxLoadingWidth = "100%",
    color = GlobalStyles.ThemeColor
  }) => {
  const AniRef = useRef<View>(null);
  const LoadAni = useMemo<CustomAnimation[]>(() => {
    return GetLoadAni(maxLoadingWidth, minLoadingWidth);
  }, [maxLoadingWidth, minLoadingWidth]);
  useEffect(() => {
    const Ani = AniRef.current;
    if (Ani) {
      loading && Ani.animate(LoadAni[0], duration);
      !loading && Ani.animate(LoadAni[1], duration);
    }
  }, [LoadAni, duration, loading]);
  const content = useMemo(() => {
    if (loading) {
      switch (typeof loadingText) {
        case "string":
          return (
            <>
              <Spinner size="small" color={colors.white} />
              <Text>{loadingText}</Text>
            </>
          );
        case "object":
          return (
            <>
              <Spinner size="small" color={colors.white} />
              {loadingText}
            </>
          );
        default:
          return <Spinner size="small" color={colors.white} />;
      }
    } else {
      switch (typeof children) {
        case "string":
          return <Text style={{ color: colors.white }}>{children}</Text>;
        default:
          return children;
      }
    }
  }, [children, loading, loadingText]);
  return (
    <View ref={AniRef} className={className} style={[ContainerStyle, containerStyle]}>
      <PressFeedback
        minScale={minScale}
        maxScale={maxScale}
        children={(_, handlePressIn, handlePressOut) => (
          <Button
            color={color}
            style={buttonStyle}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            children={content}
          />
        )}
      />
    </View>
  );
};
export default memo(AppBtn);
const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    overflow: "hidden",
    margin: "auto",
    backgroundColor: "transparent"
  }
} as const);

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
  maxScale?: number;
  minLoadingWidth?: DimensionValue;
  maxLoadingWidth?: DimensionValue;
  loadingText?: ReactNode;
}

const GetLoadAni = (
  maxLoadingWidth: DimensionValue,
  minLoadingWidth: DimensionValue
): CustomAnimation[] => {
  return [
    {
      easing: "ease-in-out",
      0: {
        width: maxLoadingWidth,
        borderRadius: 0
      },
      1: {
        width: minLoadingWidth,
        borderRadius: 999
      }
    },
    {
      easing: "ease-in-out",
      0: {
        width: minLoadingWidth,
        borderRadius: 999
      },
      1: {
        width: maxLoadingWidth,
        borderRadius: 0
      }
    }
  ];
};
