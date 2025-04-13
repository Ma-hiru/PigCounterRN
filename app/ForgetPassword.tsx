import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";

interface props {
  /* empty */
}

const ForgetPassword: FC<props> = () => {
  return (
    <>
      <ScrollView className="flex-1 w-screen h-screen bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BigHeader title="找回密码" info={
          <>
            <Text className="text-left text-[#999999]">找回</Text>
            <Text className="text-left color-[#c38b95]">猪只</Text>
            <Text className="text-left color-[#409eff]">计数</Text>
            <Text className="text-left text-[#999999]">系统</Text>
            <Text className="text-left text-[#999999]">密码</Text>
          </>
        }>
          <View></View>
        </BigHeader>
      </ScrollView>
    </>
  );
};
export default ForgetPassword;
