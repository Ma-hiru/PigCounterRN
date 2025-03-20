import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useRouter } from "expo-router";
import UploadPagesList from "@/components/UploadPagesList";
import MyBlueBtn from "@/components/MyBlueBtn";
import { uploadSelector, useAppSelector } from "@/stores";

export default function Upload() {
  const { topInset } = useSafeArea();
  const router = useRouter();
  const { TasksList } = useAppSelector(uploadSelector);
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1 bg-gray-50" style={{ paddingTop: topInset }}>
        {
          TasksList.map((task, index) =>
            <UploadPagesList task={task} key={index} router={router} taskIndex={index} />
          )
        }
      </ScrollView>
      <View className="bg-gray-50 "
            style={{ padding: 30, paddingBottom: 0 }}
      >
        <MyBlueBtn>
          刷新
        </MyBlueBtn>
        <View style={{ height: 20 }} />
      </View>
    </>
  );
};
