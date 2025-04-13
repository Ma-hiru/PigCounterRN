import BigHeader from "@/components/BigHeader";
import Item from "@/components/userInfo/Item";
import { useLogin } from "@/hooks/useLogin";
import { FC, useCallback, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";

interface props {
  /* empty */
}

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
          <>
            <Text className="text-left text-[#999999]">查看</Text>
            <Text className="text-left text-[#999999]">登录在</Text>
            <Text className="text-left color-[#c38b95]">猪只</Text>
            <Text className="text-left color-[#409eff]">计数</Text>
            <Text className="text-left text-[#999999]">系统</Text>
            <Text className="text-left text-[#999999]">的组织信息</Text>
          </>
        }>
        </BigHeader>
        {Render()}
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default CompanyInfo;
