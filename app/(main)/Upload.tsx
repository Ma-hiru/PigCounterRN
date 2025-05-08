import Header from "@/components/Header";
import { GlobalStyles, NO_LOGIN_TIPS } from "@/settings";
import { memo } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import UploadPagesList from "@/components/upload/UploadPagesList";
import { uploadSelector, useAppSelector } from "@/stores";
import { useMyState } from "@/hooks/useMyState";
import { useLogin } from "@/hooks/useLogin";
import Blank from "@/components/Blank";
import { useGetTaskListAsync } from "@/utils/getTaskListAsync";

const Upload = () => {
  const router = useRouter();
  const { TasksList } = useAppSelector(uploadSelector);
  const refreshing = useMyState(false);
  const getTaskList = useGetTaskListAsync();
  const onRefresh = async () => {
    refreshing.set(true);
    getTaskList();
    refreshing.set(false);
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
                refreshing={refreshing.get()}
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
