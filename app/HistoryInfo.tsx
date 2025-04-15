import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { View, Text, StatusBar } from "react-native";
import { APP_NAME, GlobalStyles } from "@/settings";

type props = object

export const HistoryInfo: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="历史记录" info={
          <>
            <Text className="text-left text-[#999999]">查看</Text>
            <Text className="text-left"
                  style={{ color: GlobalStyles.ThemeColor1 }}>
              {APP_NAME}
            </Text>
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
