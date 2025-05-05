import BigHeader from "@/components/BigHeader";
import Item from "@/components/userInfo/Item";
import { useLogin } from "@/hooks/useLogin";
import { FC, useCallback, useEffect, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { APP_NAME, NO_LOGIN_TIPS } from "@/settings";
import Blank from "@/components/Blank";
import { useReactive } from "ahooks";
import { handleServerURL } from "@/utils/handleServerURL";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LinearGradient } from "expo-linear-gradient";

type props = object

export const CompanyInfo: FC<props> = () => {
  const { hasToken } = useLogin();
  const companyInfo = useReactive<Company>({
    id: 1,
    name: "湘潭大学",
    adminName: "聂国梁",
    addr: "湘潭市雨湖区",
    tel: "0086-731-58293938",
    logo: "https://shiina-mahiru.cn/temp/xtu_logo.png"
  });
  useEffect(() => {
    //TODO getINFO
  }, []);
  const NoDataRender = useMemo(() => <Blank tips={NO_LOGIN_TIPS} style={{
    position: "absolute",
    top: "50%",
    left: "50%"
  }} className={"-translate-x-1/2 -translate-y-1/2"} />, []);
  const DataRender = useMemo(() => <View className="flex-1 justify-start items-center mt-16">
    <View className="flex justify-center items-center w-[80%]">
      <Item title="Logo">
        <View>
          <Avatar className="bg-white">
            <AvatarImage source={{ uri: companyInfo.logo }} />
          </Avatar>
        </View>
      </Item>
      <Item title="组织名">
        <Text>{companyInfo.name}</Text>
      </Item>
      <Item title="管理员">
        <Text>{companyInfo.adminName}</Text>
      </Item>
      <Item title="电话">
        <Text>{companyInfo.tel}</Text>
      </Item>
      <Item title="地址">
        <Text>{companyInfo.addr}</Text>
      </Item>
    </View>
  </View>, [companyInfo.addr, companyInfo.adminName, companyInfo.logo, companyInfo.name, companyInfo.tel]);
  const Render = useCallback(() => {
    if (hasToken) return DataRender;
    return NoDataRender;
  }, [DataRender, NoDataRender, hasToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <View className="flex-1 ">
          <BigHeader title="组织信息" containerStyle={{ backgroundColor: "transparent" }} info={
            <BigHeader.InfoText content={`查看登录在{${APP_NAME}}系统的组织信息`} />
          }>
          </BigHeader>
          {Render()}
        </View>
      </LinearGradient>

    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default CompanyInfo;
