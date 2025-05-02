import BigHeader from "@/components/BigHeader";
import { FC, useMemo } from "react";
import { View, StatusBar } from "react-native";
import { APP_NAME, NO_LOGIN_TIPS } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import Task from "@/components/home/Task";
import { uploadSelector, useAppSelector } from "@/stores";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/useLogin";
import Blank from "@/components/Blank";


type props = object

export const HistoryInfo: FC<props> = () => {
  const { hasToken } = useLogin();
  const router = useRouter();
  //今日列表
  const { TasksList } = useAppSelector(uploadSelector);
  const TasksListIds = useMemo(() =>
      TasksList.map(item => item.id)
    , [TasksList]);
  //TODO 获取历史列表

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="历史记录"
                   info={<BigHeader.InfoText content={`查看{${APP_NAME}}系统历史记录信息`} />
                   }
        >
          {hasToken &&
            <MyPagesCard
              cardStyle={{ marginBottom: 15, paddingBottom: 15, marginTop: 15 }}
              title={"今日任务"}
            >
              <MyPagesCard.CanPress onPress={goToPages(router, {
                pathname: "/DetailHistory",
                params: {
                  taskId: TasksListIds,
                  time: "今日"
                } satisfies DetailHistoryRouteParams
              }, "FN")}>
                <Task TasksList={TasksList} />
              </MyPagesCard.CanPress>
            </MyPagesCard>
          }
        </BigHeader>
        {!hasToken
          && <Blank tips={NO_LOGIN_TIPS} style={{
            position: "absolute",
            top: "50%",
            left: "50%"
          }} className={"-translate-x-1/2 -translate-y-1/2"} />
        }
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default HistoryInfo;
