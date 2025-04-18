import { FC, useState } from "react";
import { ImageURISource, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import BigHeader from "@/components/BigHeader";
import { APP_NAME } from "@/settings";
import CheckPermission from "@/components/CheckPermission";
import { useMyState } from "@/hooks/useMyState";
import defaultAvatar from "@/assets/images/logo_1.jpg";
import RegistryPagesForm from "@/components/registry/RegistryPagesForm";
import MyBlueBtn from "@/components/MyBlueBtn";
import { useToast } from "@/components/ui/toast";
import { useImmer } from "use-immer";
import { validate, validateType } from "@/components/registry/validate";
import { fetchData } from "@/utils/fetchData";
import { reqRegistry } from "@/api";
import { pickImgFile } from "@/utils/pickImgFile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector, userSelector } from "@/stores";

type props = object;

const ChangeProfile: FC<props> = () => {
  const success = useMyState(false);
  const code = useMyState("");
  const { profile } = useAppSelector(userSelector);
  //TODO 还需要查询用户信息
  const [registryInfo, setRegistryInfo] = useImmer<registryInfo>({
    username: profile.username,
    password: "",
    name: profile.name,
    sex: "",
    phone: "",
    organization: profile.organization,
    picture: new Blob(),
    admin: profile.admin
  });
  const [invalid, setInvalid] = useImmer<validateType>({
    username: false,
    password: false,
    name: false,
    sex: false,
    phone: false,
    organization: false,
    picture: false,
    admin: false
  });
  const toast = useToast();
  const [avatar, setAvatar] = useState<ImageURISource | number>(profile.profilePicture ? { uri: profile.profilePicture } : defaultAvatar);
  const handleSubmit = async () => {
    if (!validate(registryInfo, setInvalid)) return;
    await fetchData(
      reqRegistry,
      [registryInfo],
      (_, createToast) => {
        createToast("修改资料", "修改成功");
      },
      (res, createToast) => {
        createToast("请求出错！", res?.message);
      },
      toast
    );
  };
  const pickAvatar = async () => {
    const res = await pickImgFile();
    if (!res) return;
    setRegistryInfo((draft) => {
      draft.picture = res;
    });
    setAvatar(res);
  };
  return (
    <>
      <ScrollView className="flex-1 w-screen h-screen">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BigHeader title="修改资料"
                   info={<BigHeader.InfoText content={`修改登录在{${APP_NAME}}系统的个人信息`} />}
                   containerStyle={{ backgroundColor: "none" }}>
          <CheckPermission success={success} code={code} />
        </BigHeader>
        {
          success.get() &&
          <View className="flex-1 justify-start items-center" style={{ marginTop: 30 }}>
            <View className="flex justify-center items-center w-[80%]">
              <Pressable onPress={pickAvatar} className="mb-6 justify-center items-center">
                <Avatar size="xl">
                  <AvatarImage source={avatar} />
                </Avatar>
                {avatar === defaultAvatar && <Text className="text-sm mt-2">点击选择头像</Text>}
              </Pressable>
              <RegistryPagesForm
                setRegistryInfo={setRegistryInfo}
                invalid={invalid}
                registryInfo={registryInfo}
              />
              <MyBlueBtn onPress={handleSubmit as any} className="w-full mb-6">
                {"提交"}
              </MyBlueBtn>
            </View>
          </View>
        }
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default ChangeProfile;
