import BigHeader from "@/components/BigHeader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Item from "@/components/userInfo/Item";
import { useLogin } from "@/hooks/useLogin";
import { userSelector } from "@/stores";
import { FC, useCallback, useEffect, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { APP_NAME, NO_LOGIN_TIPS } from "@/settings";
import DefaultAvatar from "@/assets/images/logo_1.jpg";
import { handleAvatarURL } from "@/utils/handleServerURL";
import { useMyState } from "@/hooks/useMyState";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";
import Blank from "@/components/Blank";
import { LinearGradient } from "expo-linear-gradient";

type props = object

export const UserInfo: FC<props> = () => {
  const { profile } = useSelector(userSelector);
  const { hasToken } = useLogin();
  const detailProfile = useMyState<UserInfo>({
    admin: false,
    createTime: "",
    id: 0,
    name: "",
    organization: "",
    phone: "",
    profilePicture: "",
    sex: "",
    token: "",
    username: ""
  });
  const { fetchData, API } = useFetchData();
  useEffect(() => {
    if (detailProfile.get().id === 0 && hasToken) {
      fetchData(
        API.reqUserInfo,
        [profile.id],
        (res) => {
          Log.Console("detailProfile", res.data);
          detailProfile.set(res.data);
        },
        (res, createToast) => {
          createToast("请求出错！", res?.message);
        }
      ).then();
    }
  }, [fetchData, API.reqUserInfo, hasToken, profile.id, detailProfile]);


  const NoDataRender = useMemo(() => <Blank tips={NO_LOGIN_TIPS} style={{
    position: "absolute",
    top: "50%",
    left: "50%"
  }} className={"-translate-x-1/2 -translate-y-1/2"} />, []);
  const DataRender = useMemo(() => <View className="flex-1 justify-start items-center mt-16">
    <View className="flex justify-center items-center w-[80%]">
      <Item title="头像">
        <Avatar>
          {profile.profilePicture ?
            <AvatarImage source={{ uri: handleAvatarURL(profile.profilePicture) }} /> :
            <AvatarImage source={DefaultAvatar} />
          }
        </Avatar>
      </Item>
      <Item title="用户名">
        <Text>{profile.username}</Text>
      </Item>
      <Item title="姓名">
        <Text>{profile.name}</Text>
      </Item>
      <Item title="性别">
        <Text>{detailProfile.get().sex}</Text>
      </Item>
      <Item title="电话">
        <Text>{detailProfile.get().phone}</Text>
      </Item>
      <Item title="组织">
        <Text>{profile.organization}</Text>
      </Item>
      <Item title="加入时间">
        <Text>{detailProfile.get().createTime}</Text>
      </Item>
      <Item title="身份">
        <Text>{profile.admin ? "管理员" : "普通用户"}</Text>
      </Item>
    </View>
  </View>, [detailProfile, profile.admin, profile.name, profile.organization, profile.profilePicture, profile.username]);
  const Render = useCallback(() => {
    if (hasToken) return DataRender;
    return NoDataRender;
  }, [DataRender, NoDataRender, hasToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient colors={["transparent", "#30cfd0"]} style={{ flex: 1 }}>
        <BigHeader
          title="用户信息"
          info={
            <BigHeader.InfoText content={`查看登陆在{${APP_NAME}}系统的用户信息`} />
          }
          containerStyle={{
            backgroundColor: "transparent"
          }}
        >
        </BigHeader>
        {Render()}
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default UserInfo;
