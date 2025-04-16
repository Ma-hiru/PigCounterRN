import BigHeader from "@/components/BigHeader";
import Item from "@/components/userInfo/Item";
import { useLogin } from "@/hooks/useLogin";
import { FC, useCallback, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { APP_NAME, GlobalStyles } from "@/settings";
import BigHeaderInfoText from "@/components/BigHeaderInfoText";

type props = object

export const CompanyInfo: FC<props> = () => {
  const { hasToken } = useLogin();
  const NoDataRender = useMemo(() => <View
    className="flex-1 flex-row justify-center items-center">
    <Text style={{ textAlign: "center" }}>暂无数据</Text>
  </View>, []);
  const DataRender = useMemo(() => <View className="flex-1 justify-start items-center mt-16">
    <View className="flex justify-center items-center w-[80%]">
      <Item title="Logo">
        <Text>xxxxxx</Text>
      </Item>
      <Item title="组织名">
        <Text>xxxxxx</Text>
      </Item>
      <Item title="管理员">
        <Text>聂国梁</Text>
      </Item>
      <Item title="电话">
        <Text>135******06</Text>
      </Item>
      <Item title="地址">
        <Text>雨湖区 雨湖路 100 号</Text>
      </Item>
    </View>
  </View>, []);
  const Render = useCallback(() => {
    if (!hasToken) return DataRender;
    return NoDataRender;
  }, [DataRender, NoDataRender, hasToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="组织信息" info={
          <BigHeader.InfoText content={`查看登录在{${APP_NAME}}系统的组织信息`} />
        }>
        </BigHeader>
        {Render()}
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default CompanyInfo;
