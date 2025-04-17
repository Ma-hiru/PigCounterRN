import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { StatusBar, Text, View } from "react-native";
import { APP_NAME, baseUrl, GlobalStyles } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";


type props = object

export const Settings: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="设置" info={
          <>
            <Text className="text-left text-[#999999]">配置</Text>
            <Text className="text-left"
                  style={{ color: GlobalStyles.ThemeColor1 }}>
              {APP_NAME}
            </Text>
            <Text className="text-left text-[#999999]">系统</Text>
          </>
        }>
          <MyPagesCard
            cardStyle={{ marginBottom: 15, paddingBottom: 15 }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>修改密码</Text>
            </View>
          </MyPagesCard>
          <MyPagesCard
            cardStyle={{ marginBottom: 15, paddingBottom: 15 }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>修改资料</Text>
            </View>
          </MyPagesCard>
          <MyPagesCard
            cardStyle={{ marginBottom: 15, paddingBottom: 15, marginTop: 15 }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>代理地址</Text>
              <Text>{baseUrl}</Text>
            </View>
          </MyPagesCard>
          <MyPagesCard
            cardStyle={{ marginBottom: 15, paddingBottom: 15 }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>可信度</Text>
              <Text>高</Text>
            </View>
          </MyPagesCard>
        </BigHeader>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Settings;
