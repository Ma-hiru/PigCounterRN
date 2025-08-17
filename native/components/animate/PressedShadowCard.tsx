import { FC, memo, ReactNode, useCallback, useMemo } from "react";
import {
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import PressFeedback from "@/components/animate/PressFeedback";


const PressedShadowCard: FC<props> = ({ onPress, onLongPress, children, containerStyle }) => {
  const renderChildren = useCallback(
    ({ pressed }: PressableStateCallbackType) =>
      <PressedViewMemo
        pressed={pressed}
        containerStyle={containerStyle}
        children={children}
      />,
    [children, containerStyle]
  );

  return (
    <PressFeedback
      onPress={onPress}
      onLongPress={onLongPress}
      children={renderChildren}
    />
  );
};
export default memo(PressedShadowCard);

const PressedView: FC<PressedViewProps> = ({ pressed, containerStyle, children }) => {
  const memoizedStyle = useMemo(() => [pressed && Shadow, containerStyle], [containerStyle, pressed]);
  return <View style={memoizedStyle}>{children}</View>;
};
const PressedViewMemo = memo(PressedView);

const {
  Shadow
} = StyleSheet.create({
  Shadow: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  }
} as const);

interface props {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

interface PressedViewProps {
  pressed?: boolean;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}
