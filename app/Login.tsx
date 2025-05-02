import BigHeader from "@/components/BigHeader";
import LoginPagesForm from "@/components/login/LoginPagesForm";
import LoginPagesMoreBtn from "@/components/login/LoginPagesMoreBtn";
import {
  StatusBar,
  StyleSheet,
  InteractionManager,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { useFetchData } from "@/utils/fetchData";
import { useRouter } from "expo-router";
import background from "@/assets/images/login/login_bg.png";
import { APP_NAME, APP_WELCOME, GlobalStyles } from "@/settings";
import { Log } from "@/utils/logger";
import { useMyState } from "@/hooks/useMyState";
import localStore from "@/utils/localStore";
const { setLogin } = userActions;
const setRemember = (loginInfo: loginInfo, remember: boolean) => {
  if (remember) {
    localStore.setItem("remember", String(remember)).then();
    localStore.setItem("username", loginInfo.username).then();
    localStore.setItem("password", loginInfo.password).then();
  } else {
    localStore.setItem("remember", String(remember)).then();
    localStore.setItem("username", "").then();
    localStore.setItem("password", "").then();
  }
};
const Login = () => {
  const router = useRouter();
  const { token } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { fetchData, API } = useFetchData();
  const loading = useMyState(false);
  const handleSubmit = useCallback(async (loginInfo: loginInfo, remember: boolean) => {
    loading.set(true);
    InteractionManager.runAfterInteractions(async () => {
      await fetchData(
        API.reqLogin,
        [loginInfo],
        (res, createToast) => {
          Log.Console("loginResponse=>", res.data);
          dispatch(setLogin(res.data));
          setRemember(loginInfo, remember);
          createToast("登录成功", "欢迎回来！" + res.data.username);
        },
        (res, createToast) => {
          createToast("请求出错！", res?.message);
        });
      loading.set(false);
    });
  }, [API.reqLogin, dispatch, fetchData, loading]);
  useEffect(() => {
    if (token !== "") {
      router.push("/Home");
    }
  }, [router, token]);
  Log.Console("LoginShow");
  return (
    <>
      <ImageBackground source={background} style={{ flex: 1 }}>
        <KeyboardAvoidingView className="flex-1 relative" style={{ zIndex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
          <BigHeader
            title={APP_NAME}
            info={
              <BigHeader.InfoText
                content={APP_WELCOME}
                textStyle={{ fontFamily: "FlyFlowerSongRegular" as Fonts }}
              />
            }
            font="baigetianxingtiRegular"
            containerStyle={styles.HeaderContainer}
            titleContainerStyle={styles.HeaderTitleContainer}
            infoContainerStyle={styles.HeaderInfoContainer}
            titleStyle={styles.HeaderTitle}
            backContainerStyle={styles.HeaderBackContainer}
            contentStyle={styles.HeaderContent}
            hasBackIcon={false}
          >
            <LoginPagesForm handleLogin={handleSubmit} loading={loading.get()} />
            <LoginPagesMoreBtn />
          </BigHeader>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Login;
const styles = StyleSheet.create({
  HeaderContainer: {
    backgroundColor: "none",
    height: "100%",
    justifyContent: "center"
  },
  HeaderTitleContainer: {
    justifyContent: "center",
    fontSize: 30,
    marginBottom: 5
  },
  HeaderTitle: {
    fontWeight: "normal",
    fontSize: 60,
    lineHeight: 75,
    color: GlobalStyles.ThemeColor
  },
  HeaderInfoContainer: {
    justifyContent: "center",
    marginBottom: 40,
    paddingBottom: 0

  },
  HeaderBackContainer: {},
  HeaderContent: {
    paddingTop: 0
  }
});
