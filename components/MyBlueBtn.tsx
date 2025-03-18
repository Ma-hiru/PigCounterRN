import { FC, memo } from "react";
import { Button, View } from "react-native";


interface props {
  children?: string;
  onPress?: () => void;
  className?: string;
}

const MyBlueBtn: FC<props> = ({ children, onPress, className }) => {
  return (
    <View className={className}>
      <Button title={children ?? ""} color="#409eff" onPress={onPress} />
    </View>
  );
};
export default memo(MyBlueBtn);
