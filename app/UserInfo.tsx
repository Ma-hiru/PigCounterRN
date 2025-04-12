import BigHeader from "@/components/BigHeader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Item from "@/components/userInfo/Item";
import { useLogin } from "@/hooks/useLogin";
import { userSelector } from "@/stores";
import { FC, useCallback, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { useSelector } from "react-redux";

interface props {
  /* empty */
}

export const UserInfo: FC<props> = () => {
  const { profile } = useSelector(userSelector);
  const { hasToken } = useLogin();
  const NoDataRender = useMemo(() => <View
    className="flex-1 flex-row justify-center items-center">
    <Text style={{ textAlign: "center" }}>暂无数据</Text>
  </View>, []);
  const DataRender = useMemo(() => <View className="flex-1 justify-start items-center mt-16">
    <View className="flex justify-center items-center w-[80%]">
      <Item title="头像">
        <Avatar>
          <AvatarImage source={{ uri: profile.profilePicture }} />
        </Avatar>
      </Item>
      <Item title="用户名">
        <Text>八奈见杏菜</Text>
      </Item>
      <Item title="姓名">
        <Text>聂国梁</Text>
      </Item>
      <Item title="电话">
        <Text>135******06</Text>
      </Item>
      <Item title="组织">
        <Text>湘潭大学</Text>
      </Item>
      <Item title="身份">
        <Text>管理员</Text>
      </Item>
    </View>
  </View>, [profile.profilePicture]);
  const Render = useCallback(() => {
    if (!hasToken) return DataRender;
    return NoDataRender;
  }, [DataRender, NoDataRender, hasToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="用户信息" info={
          <>
            <Text className="text-left text-[#999999]">查看登陆在</Text>
            <Text className="text-left color-[#c38b95]">猪只</Text>
            <Text className="text-left color-[#409eff]">计数</Text>
            <Text className="text-left text-[#999999]">系统的</Text>
            <Text className="text-left text-[#999999]">用户信息</Text>
          </>
        }>
        </BigHeader>
        {Render()}
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default UserInfo;
