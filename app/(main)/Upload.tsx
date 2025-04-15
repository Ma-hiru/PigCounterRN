import Header from "@/components/Header";
import { GlobalStyles } from "@/settings";
import { memo, useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import UploadPagesList from "@/components/upload/UploadPagesList";
import { uploadSelector, useAppSelector } from "@/stores";

const Upload = () => {
  const router = useRouter();
  const { TasksList } = useAppSelector(uploadSelector);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  return (
    <>
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Header title="计数" />
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
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Upload);
