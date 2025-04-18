import BigHeader from "@/components/BigHeader";
import LoginPagesForm from "@/components/login/LoginPagesForm";
import LoginPagesMoreBtn from "@/components/login/LoginPagesMoreBtn";
import { StatusBar, StyleSheet, InteractionManager, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { reqLogin } from "@/api";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { fetchData } from "@/utils/fetchData";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import background from "@/assets/images/login/login_bg.png";
import { APP_NAME, GlobalStyles } from "@/settings";
import logger from "@/utils/logger";

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
        [loginInfo],
        (res) => {
          logger("console", "loginResponse=>", res.data);
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
  logger("console", "loginstart");
  return (
    <>
      <View className="flex-1 relative">
        <Image
          source={background}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0
          }}
          contentFit={"cover"}
        />
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BigHeader
          title={APP_NAME}
          info={
            <BigHeader.InfoText content={`一拍即“数”，“牧”养无忧`} />
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
          <LoginPagesForm handleLogin={handleSubmit} loading={loading} />
          <LoginPagesMoreBtn />
        </BigHeader>
      </View>
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
