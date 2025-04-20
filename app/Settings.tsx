import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { StatusBar, StyleSheet, Text, ToastAndroid, View } from "react-native";
import {
  APP_NAME,
  baseUrl,
  ChangeAppBaseUrl, ChangeAppUploadQuality,
  DEFAULT_BASE_URL,
  DEFAULT_UPLOAD_QUALITY,
  UPLOAD_QUALITY
} from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import ModalWindow from "@/components/ModalWindow";
import { useMyState } from "@/hooks/useMyState";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { Input, InputField } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";

type props = object

export const Settings: FC<props> = () => {
  const showBaseUrlModal = useMyState(false);
  const configBaseUrl = useMyState(baseUrl);
  const showQualityModal = useMyState(false);
  const configQuality = useMyState(UPLOAD_QUALITY);
  const { hasToken } = useLogin();
  const router = useRouter();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="设置" info={
          <BigHeader.InfoText content={`配置{${APP_NAME}}系统`} />
        }>
          <MyPagesCard cardStyle={[{ marginTop: 30 }, styles.Card]}>
            <MyPagesCard.CanPress
              containerStyle={styles.Press}
              onPress={() => {
                if (hasToken)
                  goToPages(router, {
                    pathname: "/ForgetPassword",
                    params: {
                      HasBg: "false"
                    }
                  }, "MOVE");
                else ToastAndroid.showWithGravity("请先登录", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
              }}
            >
              <Text>找回密码</Text>
            </MyPagesCard.CanPress>
          </MyPagesCard>
          <MyPagesCard cardStyle={styles.Card}>
            <MyPagesCard.CanPress containerStyle={styles.Press}
                                  onPress={() => {
                                    if (hasToken)
                                      goToPages(router, "/ChangeProfile", "MOVE");
                                    else ToastAndroid.showWithGravity("请先登录", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                                  }}>
              <Text>修改资料</Text>
            </MyPagesCard.CanPress>
          </MyPagesCard>
          <MyPagesCard cardStyle={styles.Card}>
            <MyPagesCard.CanPress
              containerStyle={styles.Press}
              onPress={() => showQualityModal.set(true)}
            >
              <Text>上传质量</Text>
              <Text>{UPLOAD_QUALITY}</Text>
            </MyPagesCard.CanPress>
          </MyPagesCard>
          <MyPagesCard cardStyle={styles.Card}>
            <MyPagesCard.CanPress
              containerStyle={styles.Press}
              onPress={() => showBaseUrlModal.set(true)}
            >
              <Text>代理地址</Text>
              <Text>{baseUrl}</Text>
            </MyPagesCard.CanPress>
          </MyPagesCard>
        </BigHeader>
      </View>
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
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Settings;
const styles = StyleSheet.create({
  Card: { marginBottom: 15, paddingBottom: 15 },
  Press: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5
  }
} as const);
