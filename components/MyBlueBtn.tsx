import { FC, memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Button } from "@rneui/themed";
import { GlobalStyles } from "@/settings";

interface props {
  children?: string;
  onPress?: () => void;
  className?: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

const MyBlueBtn: FC<props> = (
  {
    children,
    onPress,
    className,
    color = GlobalStyles.ThemeColor,
    containerStyle,
    buttonStyle
  }) => {
  return (
    <View className={className}
          style={{ borderRadius: 5, overflow: "hidden", ...containerStyle as object }}>
      <Button color={color} onPress={onPress} style={buttonStyle}>
        {children}
      </Button>
    </View>
  );
};
export default memo(MyBlueBtn);
