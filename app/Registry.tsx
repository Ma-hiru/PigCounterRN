import { reqRegistry } from "@/api";
import MyBlueBtn from "@/components/MyBlueBtn";
import defaultAvatar from "@/assets/images/my/defaultAvatar.png";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { registryInfo } from "@/types/api";
import { fetchData } from "@/utils/fetchData";
import { pickImgFile } from "@/utils/pickImgFile";
import { FC, useState } from "react";
import { flushSync } from "react-dom";
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
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [avatar, setAvatar] = useState<ImageURISource>(defaultAvatar);
  const toast = useToast();
  const handleSubmit = async () => {
    if (registryInfo.password.length < 4) return setIsInvalidPassword(true);
    else flushSync(() => {
      setIsInvalidPassword(false);
    });
    if (registryInfo.username.length < 4) return setIsInvalidUsername(true);
    else flushSync(() => {
      setIsInvalidUsername(false);
    });
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
    setAvatar({ uri: (res as any).uri });
  };
  console.log("defaultAvatar", defaultAvatar);
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <View className="flex justify-center items-center w-[80%]">
          <Pressable onPress={pickAvatar} className="mb-8 justify-center items-center">
            <Avatar size="xl">
              <AvatarImage
                source={avatar}
              />
            </Avatar>
            {
              avatar === defaultAvatar &&
              <Text className="text-sm mt-2">点击选择头像</Text>
            }
          </Pressable>
          <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="请输入用户名"
                returnKeyType="next"
                value={registryInfo.username}
                onChangeText={(text) => setRegistryInfo((draft) => {
                  draft.username = text;
                })}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={isInvalidPassword} size="md" className="w-full mb-6">
            <Input size="lg">
              <InputField
                type="password"
                placeholder="请输入密码"
                value={registryInfo.password}
                returnKeyType="done"
                onChangeText={(text) => setRegistryInfo(draft => draft.password = text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>密码至少需要六位字符</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="请输入姓名"
                returnKeyType="next"
                value={registryInfo.name}
                onChangeText={(text) => setRegistryInfo(draft => draft.name = text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="请输入电话"
                returnKeyType="next"
                value={registryInfo.phone}
                onChangeText={(text) => setRegistryInfo(draft => draft.phone = text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="请输入性别"
                returnKeyType="next"
                value={registryInfo.sex}
                onChangeText={(text) => setRegistryInfo(draft => draft.sex = text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
            <Input variant="outline" size="lg">
              <InputField
                placeholder="请输入选择组织"
                returnKeyType="next"
                value={registryInfo.organization}
                onChangeText={(text) => setRegistryInfo(draft => draft.organization = text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <MyBlueBtn onPress={handleSubmit as any} className="w-full mb-4">
            {"注册"}
          </MyBlueBtn>
        </View>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Registry;
