import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { APP_NAME, baseUrl, ChangeAppBaseUrl, DEFAULT_BASE_URL } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import ModalWindow from "@/components/ModalWindow";
import { useMyState } from "@/hooks/useMyState";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { Input, InputField } from "@/components/ui/input";

type props = object

export const Settings: FC<props> = () => {
  const showBaseUrlModal = useMyState(false);
  const configBaseUrl = useMyState(baseUrl);
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
              onPress={goToPages(router, {
                pathname: "/ForgetPassword",
                params: {
                  HasBg: "false"
                }
              }, "FN")}
            >
              <Text>找回密码</Text>
            </MyPagesCard.CanPress>
          </MyPagesCard>
          <MyPagesCard cardStyle={styles.Card}>
            <MyPagesCard.CanPress containerStyle={styles.Press}
                                  onPress={goToPages(router, "/ChangeProfile", "FN")}>
              <Text>修改资料</Text>
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
