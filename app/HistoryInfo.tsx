import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { View, Text, StatusBar } from "react-native";

interface props {
  /* empty */
}

export const HistoryInfo: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="历史记录" info={
          <>
            <Text className="text-left text-[#999999]">查看</Text>
            <Text className="text-left color-[#c38b95]">猪只</Text>
            <Text className="text-left color-[#409eff]">计数</Text>
            <Text className="text-left text-[#999999]">系统</Text>
            <Text className="text-left text-[#999999]">历史记录信息</Text>
          </>
        } />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default HistoryInfo;
