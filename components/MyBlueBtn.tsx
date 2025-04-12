import { FC, memo } from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";

interface props {
  children?: string;
  onPress?: () => void;
  className?: string;
}

const MyBlueBtn: FC<props> = ({ children, onPress, className }) => {
  return (
    <View className={className} style={{ borderRadius: 5, overflow: "hidden" }}>
      <Button title={children ?? ""} color="#409eff" onPress={onPress} />
    </View>
  );
};
export default memo(MyBlueBtn);
