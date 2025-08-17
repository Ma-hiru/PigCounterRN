import BigHeader from "@/components/BigHeader";
import { FC, useMemo } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import {
  APP_NAME,
  baseUrl,
  ChangeAppBaseUrl, ChangeAppUploadQuality,
  DEFAULT_BASE_URL,
  DEFAULT_UPLOAD_QUALITY, GlobalStyles,
  UPLOAD_QUALITY
} from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import ModalWindow from "@/components/ModalWindow";
import { useMyState } from "@/hooks/useMyState";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { Input, InputField } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { Log } from "@/utils/logger";
import { useTemp } from "@/hooks/useTemp";
import MyPortal from "@/components/MyPortal";
import { LinearGradient } from "expo-linear-gradient";
import PressFeedback from "@/components/animate/PressFeedback";

type props = object

export const Settings: FC<props> = () => {
  const showBaseUrlModal = useMyState(false);
  const configBaseUrl = useMyState(baseUrl);
  const showQualityModal = useMyState(false);
  const configQuality = useMyState(UPLOAD_QUALITY);
  const { hasToken } = useLogin();
  const router = useRouter();
  const removeLoading = useMyState(false);
  const { TempSize, ClearTemp } = useTemp();
  const TempSizeFormat = useMemo(() => {
    const MB = TempSize / 1024 / 1024;
    if (MB <= 0) return 0;
    else return MB.toFixed(2);
  }, [TempSize]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <View className="flex-1">
          <BigHeader containerStyle={{ backgroundColor: "transparent" }} title="设置" info={
            <BigHeader.InfoText content={`配置{${APP_NAME}}系统`} />
          }>
            {/*找回密码*/}
            <PressFeedback onPress={() => {
              if (hasToken)
                goToPages(router, {
                  pathname: "/ForgetPassword",
                  params: {
                    HasBg: "false"
                  }
                }, "MOVE");
              else Log.Toast("请先登录", "SHORT", "BOTTOM");
            }} containerStyle={{ width: "100%", marginTop: 30 }}>
              <MyPagesCard cardStyle={[styles.Card]} className="shadow-2xl">
                <View style={styles.Press}>
                  <Text style={{ color: "#333333" }}>找回密码</Text>
                </View>
              </MyPagesCard>
            </PressFeedback>
            {/*修改资料*/}
            <PressFeedback
              containerStyle={{ width: "100%" }}
              onPress={() => {
                if (hasToken)
                  goToPages(router, "/ChangeProfile", "MOVE");
                else Log.Toast("请先登录", "SHORT", "BOTTOM");
              }}
            >
              <MyPagesCard cardStyle={styles.Card} className="shadow-2xl">
                <View style={styles.Press}>
                  <Text>修改资料</Text>
                </View>
              </MyPagesCard>
            </PressFeedback>
            {/*清除缓存*/}
            <PressFeedback containerStyle={{ width: "100%" }} onPress={() => {
              removeLoading.set(true);
              ClearTemp().finally(() => {
                setTimeout(() => {
                  removeLoading.set(false);
                }, 1000);
              });
            }}>
              <MyPagesCard cardStyle={styles.Card} className="shadow-2xl">
                <View style={styles.Press}>
                  <Text>清除缓存</Text>
                  <Text>{TempSizeFormat}M</Text>
                </View>
              </MyPagesCard>
            </PressFeedback>
            {/*上传质量*/}
            <PressFeedback
              containerStyle={{ width: "100%" }}
              onPress={() => showQualityModal.set(true)}
            >
              <MyPagesCard cardStyle={styles.Card} className="shadow-2xl">
                <View style={styles.Press}>
                  <Text>上传质量</Text>
                  <Text>{UPLOAD_QUALITY}</Text>
                </View>
              </MyPagesCard>
            </PressFeedback>
            {/*代理地址*/}
            <PressFeedback
              containerStyle={{ width: "100%" }}
              onPress={() => showBaseUrlModal.set(true)}
            >
              <MyPagesCard cardStyle={styles.Card} className="shadow-2xl">
                <View style={styles.Press}>
                  <Text>代理地址</Text>
                  <Text>{baseUrl}</Text>
                </View>
              </MyPagesCard>
            </PressFeedback>
          </BigHeader>
        </View>
      </LinearGradient>
      <ModalWindow show={showBaseUrlModal} title="代理地址" confirm={async () => {
        await ChangeAppBaseUrl(configBaseUrl.get());
      }}>
        <Input>
          <InputField
            placeholder={DEFAULT_BASE_URL}
            onChangeText={(text) =>
              configBaseUrl.set(text)
            }
          />
        </Input>
      </ModalWindow>
      <ModalWindow show={showQualityModal} title="上传质量" confirm={async () => {
        await ChangeAppUploadQuality(configQuality.get());
      }}>
        <Input>
          <InputField
            placeholder={String(DEFAULT_UPLOAD_QUALITY)}
            onChangeText={(text) => {
              const num = Number(text);
              if (Number.isNaN(num) || num > 1 || num < 0) {
                configQuality.set(DEFAULT_UPLOAD_QUALITY);
              } else {
                configQuality.set(num);
              }
            }}
          />
        </Input>
      </ModalWindow>
      <MyPortal visible={removeLoading.get()} text="删除中..." />
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Settings;
const styles = StyleSheet.create({
  Card: { marginBottom: 15, paddingBottom: 15, backgroundColor: GlobalStyles.BlurBgCardColor },
  Press: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5
  }
} as const);
