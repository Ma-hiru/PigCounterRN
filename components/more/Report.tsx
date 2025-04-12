import { Button, ButtonText } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { showNewToast } from "@/utils/toast";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";

interface props {
  /* empty */
}

const Report: FC<props> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(userSelector);
  const { setLogout } = userActions;
  const goToLogin = () => {
    router.push("/Login");
  };
  const clearToken = () => {
    dispatch(setLogout());
  };
  const toast = useToast();
  const { topInset } = useSafeArea();
  const showToast = () => {
    showNewToast(toast, "测试", "测试Toast。", "top");
  };
  return (
    <>
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
export default Report;
