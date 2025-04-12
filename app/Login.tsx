import BigHeader from "@/components/BigHeader";
import LoginPagesForm from "@/components/login/LoginPagesForm";
import LoginPagesMoreBtn from "@/components/login/LoginPagesMoreBtn";
import { loginInfo } from "@/types/api";
import { Text, StatusBar, InteractionManager } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { reqLogin } from "@/api";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { fetchData } from "@/utils/fetchData";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "expo-router";

const { setLogin } = userActions;
const Login = () => {
  const router = useRouter();
  const { token } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(async (loginInfo: loginInfo) => {
    setLoading(true);
    InteractionManager.runAfterInteractions(async () => {
      await fetchData(
        reqLogin,
        loginInfo,
        (res) => {
          dispatch(setLogin(res.data));
        },
        (res, createToast) => {
          createToast("请求出错！", res?.message);
        }, toast);
      setLoading(false);
    });
  }, [dispatch, toast]);
  useEffect(() => {
    if (token !== "") {
      router.push("/Home");
    }
  }, [router, token]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <BigHeader title="登录" info={
        <>
          <Text className="text-left text-[#999999]">登陆到</Text>
          <Text className="text-left color-[#c38b95]">猪只</Text>
          <Text className="text-left color-[#409eff]">计数</Text>
          <Text className="text-left text-[#999999]">系统</Text>
        </>
      } containerStyle={{ height: "100%" }}>
        <LoginPagesForm handleLogin={handleSubmit} loading={loading} />
        <LoginPagesMoreBtn />
      </BigHeader>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Login;
