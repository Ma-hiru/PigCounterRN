import { View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { reqLogin } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useUserStore, RootStateType } from "@/stores";
import { fetchData } from "@/utils/fetchData";
import { useToast } from "@/components/ui/toast";
import { debounce } from "lodash";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useSelector((Root: RootStateType) => Root.userStore);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();
  const { setToken } = useUserStore.actions;
  const handleSubmit = debounce(async () => {
    if (password.length < 4) return setIsInvalidPassword(true);
    else setIsInvalidPassword(false);
    if (username.length < 4) return setIsInvalidUsername(true);
    else setIsInvalidUsername(false);
    await fetchData(reqLogin, { username, password }, (res) => {
      dispatch(setToken(res.data.token));
    }, (res, createToast) => {
      createToast(toast, "请求出错！", res?.message);
    }, toast);
  }, 1000);
  useEffect(() => {
    if (token !== "") {
      router.push("/home");
    }
  }, [router, token]);
  return (
    <View className="flex flex-1 justify-center items-center w-screen h-screen bg-white">
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex justify-center items-center w-[80%]">
        <View
          className="mb-16 w-full flex justify-center items-center flex-row select-none font-bold"
        >
          <Text className="color-[#c38b95] text-3xl">猪只</Text>
          <Text className="color-[#409eff] text-3xl">计数</Text>
        </View>
        <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
          <Input variant="outline" size="lg">
            <InputField
              placeholder="请输入用户名"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={isInvalidPassword} size="md" className="w-full mb-6">
          <Input size="lg">
            <InputField
              type="password"
              placeholder="请输入密码"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>密码至少需要六位字符</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button
          className="w-full bg-[#409eff]  mb-4"
          size="lg"
          variant="solid"
          action="positive"
          onPress={handleSubmit as any}
        >
          <ButtonText>登录</ButtonText>
        </Button>
        <View className="flex flex-row w-full justify-end">
          <Button variant="link" size="md" className="p-0">
            <ButtonText>忘记密码？</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};
