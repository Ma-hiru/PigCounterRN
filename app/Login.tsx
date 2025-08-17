import BigHeader from "@/components/BigHeader";
import LoginPagesForm from "@/components/login/LoginPagesForm";
import {
  StatusBar,
  StyleSheet,
  InteractionManager,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text
} from "react-native";
import { useCallback, useEffect } from "react";
import { useFetchData } from "@/utils/fetchData";
import { useRouter } from "expo-router";
import background from "@/assets/images/login/login_bg_1.jpg";
import { APP_NAME, APP_WELCOME, GlobalStyles } from "@/settings";
import { Log } from "@/utils/logger";
import { useMyState } from "@/hooks/useMyState";
import localStore from "@/utils/localStore";
import { useUserZustandStore } from "@/stores/zustand/user";
import { useShallow } from "zustand/react/shallow";


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
  const { token, setLogin } = useUserZustandStore(
    useShallow(
      (state) => {
        return {
          token: state.token,
          setLogin: state.setLogin
        };
      }
    )
  );

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
          setLogin(res.data);
          setRemember(loginInfo, remember);
          createToast("登录成功", "欢迎回来！" + res.data.username);
        },
        (res, createToast) => {
          createToast("请求出错！", res?.message);
        });
      InteractionManager.runAfterInteractions(() => {
        loading.set(false);
      });
    });
  }, [API.reqLogin, fetchData, loading, setLogin]);
  useEffect(() => {
    if (token !== "") {
      router.push("/Home");
    }
  }, [router, token]);
  Log.Console("LoginShow");
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ImageBackground source={background} style={{ flex: 1 }}>
        <KeyboardAvoidingView className="flex-1 relative justify-between items-center"
                              style={{ zIndex: 1 }}>
          <BigHeader
            title={(defaultStyle) => {
              return (
                <Text style={defaultStyle}>{APP_NAME}</Text>
              );
            }}
            info={
              <BigHeader.InfoText
                content={APP_WELCOME}
                textStyle={{ fontFamily: "FlyFlowerSongRegular" as Fonts }}
                normalColor={GlobalStyles.ThemeColor}
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
          />
          <View className="w-screen flex flex-row justify-center items-center"
                style={styles.FormContainer}>
            <View className="w-[85%] relative flex justify-center items-center">
              <LoginPagesForm handleLogin={handleSubmit} loading={loading.get()} />
            </View>
          </View>
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
    marginTop: (StatusBar.currentHeight || 0) + 100
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
    color: "#2b5876"
  },
  HeaderInfoContainer: {
    justifyContent: "center"

  },
  HeaderBackContainer: {},
  HeaderContent: {
    paddingTop: 0
  },
  FormContainer: {
    marginBottom: 250
  }
});
