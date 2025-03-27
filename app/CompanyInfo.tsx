import { FC } from "react";
import { View,Text } from "react-native";

interface props {
  /* empty */
}

export const CompanyInfo: FC<props> = () => {
  return (
    <>
      <View className="flex justify-center items-center flex-1 w-screen">
        <Text>This is CompanyInfo</Text>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default CompanyInfo;
