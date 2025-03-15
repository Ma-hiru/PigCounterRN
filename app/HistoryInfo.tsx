import { FC } from "react";
import { View,Text } from "react-native";

interface props {
  /* empty */
}

export const HistoryInfo: FC<props> = () => {
  return (
    <>
      <View className="flex justify-center items-center flex-1">
        <Text>This is HistoryInfo</Text>
      </View>
    </>
  );
};
export default HistoryInfo;
