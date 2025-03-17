import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootStateType } from "@/stores";
import UploadPagesList from "@/components/UploadPagesList";
import { ButtonText, Button } from "@/components/ui/button";

export default function Upload() {
  const { topInset } = useSafeArea();
  const router = useRouter();
  const { TasksList } = useSelector((root: RootStateType) => root.uploadStore);
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1 w-screen h-screen bg-gray-50" style={{ paddingTop: topInset }}>
        {
          TasksList.map((task, index) =>
            <UploadPagesList task={task} key={index} router={router} />
          )
        }
      </ScrollView>
      <View className="fixed w-screen p-12 pb-0 bg-gray-50 "
            style={{ padding: 30, paddingBottom: 0 }}
      >
        <Button className="bg-[#409eff]"
                size="lg"
                variant="solid"
                action="positive"
        >
          <ButtonText>刷新</ButtonText>
        </Button>
        <View style={{ height: 20 }} />
      </View>
    </>
  );
};
