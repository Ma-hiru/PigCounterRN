import { View, Text } from "react-native";
import { showNewToast } from "@/utils/toast";
import { Button, ButtonText } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { StatusBar } from "expo-status-bar";
import { useSafeArea } from "@/hooks/useSafeArea";


export default function Report() {
  const toast = useToast();
  const { topInset } = useSafeArea();
  const showToast = () => {
    showNewToast(toast, "测试", "测试Toast。", "top");
    alert(1)
  };
  return (
    <>
      <StatusBar style="auto" translucent={true} backgroundColor="transparent" />
      <View className="flex-1 w-screen h-screen justify-center items-center bg-gray-50" style={{paddingTop:topInset}}>
        <Text>this is report.</Text>
        <Button onPress={showToast}>
          <ButtonText>Show Toast.</ButtonText>
        </Button>
      </View>
    </>
  );
};
