import Header from "@/components/Header";
import { GlobalStyles, NO_LOGIN_TIPS } from "@/settings";
import { memo, useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import UploadPagesList from "@/components/upload/UploadPagesList";
import { useLogin } from "@/hooks/useLogin";
import Blank from "@/components/Blank";
import { useGetTaskListAsync } from "@/utils/getTaskListAsync";
import { useTaskZustandStore } from "@/stores/zustand/task";
import { useShallow } from "zustand/react/shallow";

const Upload = () => {
  const router = useRouter();
  const { TasksList } = useTaskZustandStore(
    useShallow(
      state => ({
        TasksList: state.TasksList
      })
    )
  );
  const [refreshing, setRefreshing] = useState(false);
  const getTaskList = useGetTaskListAsync();
  const onRefresh = async () => {
    setRefreshing(true);
    getTaskList().finally(() => {
      setRefreshing(false);
    });
  };
  const { hasToken } = useLogin();
  return (
    <>
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Header title="计数" />
        {
          <ScrollView
            className="flex-1 bg-gray-50"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={GlobalStyles.ThemeColor}
                colors={[GlobalStyles.ThemeColor1]}
              />
            }
          >
            {
              hasToken &&
              <View className="w-full items-center mt-[30]">
                {
                  TasksList.map((task: Task, index: number) =>
                    <UploadPagesList
                      task={task}
                      key={index}
                      router={router}
                      taskIndex={index}
                    />
                  )
                }
              </View>
            }
            {!hasToken && <Blank tips={NO_LOGIN_TIPS} />}
            {
              TasksList.length === 0 && hasToken &&
              <View className="flex-1 justify-center items-center w-full h-full">
                <Blank tips={"暂无任务，休息一下吧！"} />
              </View>
            }
          </ScrollView>
        }
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Upload);
