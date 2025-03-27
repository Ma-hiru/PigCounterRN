import { memo } from "react";
import { View, Text } from "react-native";
import { showNewToast } from "@/utils/toast";
import { Button, ButtonText } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { StatusBar } from "expo-status-bar";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";


const Report= ()=> {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(userSelector);
  const { setToken } = userActions;
  const goToLogin = () => {
    router.push("/Login");
  };
  const clearToken = () => {
    dispatch(setToken(""));
  };
  const toast = useToast();
  const { topInset } = useSafeArea();
  const showToast = () => {
    showNewToast(toast, "测试", "测试Toast。", "top");
  };
  return (
    <>
      <StatusBar style="auto" translucent={true} backgroundColor="transparent" />
      <View className="flex-1 w-screen h-screen justify-center items-center bg-gray-50"
            style={{ paddingTop: topInset }}>
        <Button onPress={showToast}>
          <ButtonText>Show Toast.</ButtonText>
        </Button>
        <Button onPress={goToLogin} className="mt-2">
          <ButtonText>go to login</ButtonText>
        </Button>
        <Button onPress={clearToken} className="mt-2">
          <ButtonText>clear token</ButtonText>
        </Button>
        <Text className="mt-2">Token:{token}</Text>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Report);
