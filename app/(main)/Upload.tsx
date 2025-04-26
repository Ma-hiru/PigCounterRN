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

const Upload = () => {
  const router = useRouter();
  const { TasksList } = useAppSelector(uploadSelector);
  const refreshing = useMyState(false);
  const onRefresh = async () => {
    refreshing.set(true);
    // TODO: 刷新数据
    refreshing.set(false);
  };
  const { hasToken } = useLogin();
  return (
    <>
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Header title="计数" />
        {!hasToken && <Blank tips={NO_LOGIN_TIPS} />}
        {
          hasToken && <ScrollView
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
          </ScrollView>
        }
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Upload);
