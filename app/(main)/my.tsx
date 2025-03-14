import { View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { AppDispatch, RootStateType, useUserStore } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

export default function My() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((Root: RootStateType) => Root.userStore);
  const { setToken } = useUserStore.actions;
  const goToLogin = () => {
    router.push("/login");
  };
  const clearToken = () => {
    dispatch(setToken(""));
  };
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 flex justify-center items-center w-screen h-screen bg-gray-50">
        <Button onPress={goToLogin}>
          <ButtonText>go to login</ButtonText>
        </Button>
        <Button onPress={clearToken} className="mt-4">
          <ButtonText>clear token</ButtonText>
        </Button>
        <Text>Token:{token}</Text>
      </View>
    </>
  );
};
