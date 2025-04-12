import { reqRegistry } from "@/api";
import BigHeader from "@/components/BigHeader";
import MyBlueBtn from "@/components/MyBlueBtn";
import defaultAvatar from "@/assets/images/my/defaultAvatar.png";
import { validate, validateType } from "@/components/registry/validate";
import RegistryPagesForm from "@/components/registry/RegistryPagesForm";
import { useToast } from "@/components/ui/toast";
import { registryInfo } from "@/types/api";
import { fetchData } from "@/utils/fetchData";
import { pickImgFile } from "@/utils/pickImgFile";
import { FC, memo, useState } from "react";
import { ImageURISource, Pressable, View, Text, StatusBar,ScrollView } from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useImmer } from "use-immer";

interface props {
  /* empty */
}

const Registry: FC<props> = () => {
  const [registryInfo, setRegistryInfo] = useImmer<registryInfo>({
    username: "",
    password: "",
    name: "",
    sex: "",
    phone: "",
    organization: "",
    picture: new Blob(),
    admin: false
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
  const [avatar, setAvatar] = useState<ImageURISource | number>(defaultAvatar);
  const toast = useToast();
  const handleSubmit = async () => {
    if (!validate(registryInfo, setInvalid)) return;
    await fetchData(
      reqRegistry,
      registryInfo,
      (_, createToast) => {
        createToast("注册成功", "注册成功，请登录");
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
      <ScrollView className="flex-1 w-screen h-screen bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BigHeader title="注册" info={
          <>
            <Text className="text-left text-[#999999]">注册</Text>
            <Text className="text-left color-[#c38b95]">猪只</Text>
            <Text className="text-left color-[#409eff]">计数</Text>
            <Text className="text-left text-[#999999]">系统</Text>
          </>
        } />
        <View className="flex-1 justify-start items-center mt-16">
          <View className="flex justify-center items-center w-[80%]">
            <Pressable onPress={pickAvatar} className="mb-8 justify-center items-center">
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
            <MyBlueBtn onPress={handleSubmit as any} className="w-full mb-4">
              {"注册"}
            </MyBlueBtn>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Registry);
