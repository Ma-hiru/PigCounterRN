import BigHeader from "@/components/BigHeader";
import { FC, useMemo } from "react";
import { View, StatusBar } from "react-native";
import { APP_NAME, GlobalStyles, NO_LOGIN_TIPS } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import Task from "@/components/home/Task";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/useLogin";
import Blank from "@/components/Blank";
import PressFeedback from "@/components/animate/PressFeedback";
import { LinearGradient } from "expo-linear-gradient";
import { useTaskZustandStore } from "@/stores/zustand/task";
import { useShallow } from "zustand/react/shallow";


type props = object

export const HistoryInfo: FC<props> = () => {
  const { hasToken } = useLogin();
  const router = useRouter();
  const { TasksList, AllTaskList } = useTaskZustandStore(
    useShallow(
      state => (
        {
          TasksList: state.TasksList,
          AllTaskList: state.AllTaskList
        }
      )
    )
  );
  const TasksListIds = useMemo(() =>
      TasksList?.map(item => item.id)
    , [TasksList]);
  const AllTaskListIds = useMemo(() => AllTaskList?.map(item => item.id), [AllTaskList]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <View className="flex-1">
          <BigHeader title="历史记录"
                     info={<BigHeader.InfoText content={`查看{${APP_NAME}}系统历史记录信息`} />
                     }
                     containerStyle={{ backgroundColor: "transparent" }}
          >
            {(hasToken && AllTaskListIds.length !== 0) &&
              <>
                {
                  TasksListIds.length !== 0 && <MyPagesCard
                    cardStyle={{
                      marginBottom: 15,
                      paddingBottom: 15,
                      marginTop: 15,
                      backgroundColor: GlobalStyles.BlurBgCardColor
                    }}
                    title={"今日任务"}
                  >
                    <PressFeedback
                      onPress={goToPages(router, {
                        pathname: "/DetailHistory",
                        params: {
                          taskId: TasksListIds,
                          time: "今日"
                        } satisfies DetailHistoryRouteParams
                      }, "FN")}>
                      <Task TasksList={TasksList} HasBlur={true} />
                    </PressFeedback>
                  </MyPagesCard>
                }
                <MyPagesCard
                  cardStyle={{
                    marginBottom: 15,
                    paddingBottom: 15,
                    marginTop: 15,
                    backgroundColor: GlobalStyles.BlurBgCardColor
                  }}
                  title={"所有任务"}
                >
                  <PressFeedback
                    onPress={goToPages(router, {
                      pathname: "/DetailHistory",
                      params: {
                        taskId: AllTaskListIds,
                        time: "所有"
                      } satisfies DetailHistoryRouteParams
                    }, "FN")}>
                    <Task TasksList={AllTaskList} HasBlur={true} />
                  </PressFeedback>
                </MyPagesCard>
              </>
            }
          </BigHeader>
          {!hasToken
            && <Blank tips={NO_LOGIN_TIPS} style={{
              position: "absolute",
              top: "50%",
              left: "50%"
            }} className={"-translate-x-1/2 -translate-y-1/2"} />
          }
          {
            AllTaskListIds.length === 0 && <Blank tips={"暂无数据"} style={{
              position: "absolute",
              top: "50%",
              left: "50%"
            }} className={"-translate-x-1/2 -translate-y-1/2"} />
          }
        </View>
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default HistoryInfo;
