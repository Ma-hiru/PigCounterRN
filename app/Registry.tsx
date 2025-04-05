import { reqRegistry } from "@/api";
import MyBlueBtn from "@/components/MyBlueBtn";
import defaultAvatar from "@/assets/images/my/defaultAvatar.png";
import { validate, validateType } from "@/components/registry/validate";
import RegistryPagesForm from "@/components/registry/RegistryPagesForm";
import { useToast } from "@/components/ui/toast";
import { registryInfo } from "@/types/api";
import { fetchData } from "@/utils/fetchData";
import { pickImgFile } from "@/utils/pickImgFile";
import { FC, memo, useState } from "react";
import { ImageURISource, Pressable, View, Text } from "react-native";
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";
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
  const [avatar, setAvatar] = useState<ImageURISource>(defaultAvatar);
  const toast = useToast();
  const handleSubmit = async () => {
    if (!validate(registryInfo, setInvalid)) return;
    await fetchData(reqRegistry,
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
    setRegistryInfo(draft => {
      draft.picture = res as Blob;
    });
    setAvatar({ uri: (res as any).uri });
  };
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <View className="flex justify-center items-center w-[80%]">
          <Pressable onPress={pickAvatar} className="mb-8 justify-center items-center">
            <Avatar size="xl">
              <AvatarImage source={avatar} />
            </Avatar>
            {
              avatar === defaultAvatar &&
              <Text className="text-sm mt-2">点击选择头像</Text>
            }
          </Pressable>
          <RegistryPagesForm
            setRegistryInfo={setRegistryInfo}
            invalid={invalid}
            registryInfo={registryInfo}
          />
          <MyBlueBtn
            onPress={handleSubmit as any}
            className="w-full mb-4"
          >
            {"注册"}
          </MyBlueBtn>
        </View>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Registry);
