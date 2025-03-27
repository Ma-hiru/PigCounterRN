import { FC } from "react";
import { View,Text } from "react-native";

interface props {
  /* empty */
}

export const UserInfo: FC<props> = () => {
  return (
    <>
      <View className="flex justify-center items-center flex-1">
        <Text>This is UserInfo</Text>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default UserInfo;
