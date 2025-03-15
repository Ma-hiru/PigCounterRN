import { FC } from "react";
import { View,Text } from "react-native";

interface props {
  /* empty */
}

export const Feedback: FC<props> = () => {
  return (
    <>
      <View className="flex justify-center items-center flex-1">
        <Text>This is Feedback</Text>
      </View>
    </>
  );
};
export default Feedback;
