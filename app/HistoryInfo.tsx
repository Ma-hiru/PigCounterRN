import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { View, StatusBar } from "react-native";
import { APP_NAME } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import Task from "@/components/home/Task";


type props = object

export const HistoryInfo: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="历史记录"
                   info={<BigHeader.InfoText content={`查看{${APP_NAME}}系统历史记录信息`} />
                   }
        >
          <MyPagesCard
            cardStyle={{ marginBottom: 15, paddingBottom: 15, marginTop: 15 }}
            title={"今日任务"}
          >
            <Task />
          </MyPagesCard>
          <MyPagesCard
            cardStyle={{ marginBottom: 15, paddingBottom: 15 }}
            title={"2025-04-16"}
          >
            <Task />
          </MyPagesCard>
        </BigHeader>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default HistoryInfo;
