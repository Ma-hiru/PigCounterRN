import LoginPagesForm from "@/components/login/LoginPagesForm";
import LoginPagesMoreBtn from "@/components/LoginPagesMoreBtn";
import { View, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { reqLogin } from "@/api";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { fetchData } from "@/utils/fetchData";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "expo-router";
import { flushSync } from "react-dom";

const { setLogin } = userActions;
const Login = () => {
  const router = useRouter();
  const { token } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async (username: string, password: string) => {
    if (loading) return;
    flushSync(() => {
      setLoading(true);
    });
    await fetchData(
      reqLogin,
      { username, password },
      (res) => {
        dispatch(setLogin(res.data));
      },
      (res, createToast) => {
        createToast("请求出错！", res?.message);
      }, toast);
    flushSync(() => {
      setLoading(false);
    });
  }, [loading, dispatch, toast]);
  useEffect(() => {
    if (token !== "") {
      router.push("/Home");
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
        <LoginPagesForm handleLogin={handleSubmit} loading={loading} />
        <LoginPagesMoreBtn />
      </View>
    </View>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Login;
