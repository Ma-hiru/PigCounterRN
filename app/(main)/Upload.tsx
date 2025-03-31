import { memo } from "react";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useRouter } from "expo-router";
import UploadPagesList from "@/components/upload/UploadPagesList";
import MyBlueBtn from "@/components/MyBlueBtn";
import { uploadSelector, useAppSelector } from "@/stores";

const Upload = () => {
  const { topInset } = useSafeArea();
  const router = useRouter();
  const { TasksList } = useAppSelector(uploadSelector);
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="w-full items-center" style={{ paddingTop: topInset, paddingBottom: 40 }}>
          {
            TasksList.map((task, index) =>
              <UploadPagesList
                task={task}
                key={index}
                router={router}
                taskIndex={index}
              />,
            )
          }
        </View>
      </ScrollView>
      <View className="bg-gray-50 "
            style={{ padding: 40, paddingBottom: 0, paddingTop: 20 }}
      >
        <MyBlueBtn>
          刷新
        </MyBlueBtn>
        <View style={{ height: 20 }} />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Upload);
