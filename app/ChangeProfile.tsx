import { FC } from "react";
import { ImageURISource, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import BigHeader from "@/components/BigHeader";
import { APP_NAME } from "@/settings";
import CheckPermission from "@/components/CheckPermission";
import { useMyState } from "@/hooks/useMyState";
import defaultAvatar from "@/assets/images/logo_1.jpg";
import RegistryPagesForm from "@/components/registry/RegistryPagesForm";
import AppBtn from "@/components/AppBtn";
import { validate, validateType } from "@/components/registry/validate";
import { useFetchData } from "@/utils/fetchData";
import { useToast } from "@/components/ui/toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { fileSystem } from "@/utils/fileSystem";
import { LinearGradient } from "expo-linear-gradient";
import { useUserZustandStore } from "@/stores/zustand/user";
import { useShallow } from "zustand/react/shallow";

type props = object;

const ChangeProfile: FC<props> = () => {
  const success = useMyState(false);
  const code = useMyState("");
  const { fetchData, API } = useFetchData();
  const { profile } = useUserZustandStore(
    useShallow(state => ({
      profile: state.profile
    }))
  );
  //TODO 还需要查询用户信息
  const registryInfo = useMyState<registryInfo>({
    username: profile.username,
    password: "",
    name: profile.name,
    sex: "",
    phone: "",
    organization: profile.organization,
    picture: new Blob(),
    admin: profile.admin
  });
  const invalid = useMyState<validateType>({
    username: false,
    password: false,
    name: false,
    sex: false,
    phone: false,
    organization: false,
    picture: false,
    admin: false
  });
  const avatar = useMyState<ImageURISource | number>(profile.profilePicture ? { uri: profile.profilePicture } : defaultAvatar);
  const handleSubmit = async () => {
    if (!validate(registryInfo.get(), invalid.set)) return;
    await fetchData(
      API.reqRegistry,
      [registryInfo.get()],
      (_, createToast) => {
        createToast("修改资料", "修改成功");
      },
      (res, createToast) => {
        createToast("请求出错！", res?.message);
      }
    );
  };
  const toast = useToast();
  const pickAvatar = async () => {
    await fileSystem.PickAvatar((res) => {
      registryInfo.set((draft) => {
        draft.picture = res;
      });
      avatar.set(res);
    }, toast);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <ScrollView className="flex-1 w-screen h-screen">
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
                    <AvatarImage source={avatar.get()} />
                  </Avatar>
                  {avatar.get() === defaultAvatar &&
                    <Text className="text-sm mt-2">点击选择头像</Text>}
                </Pressable>
                <RegistryPagesForm
                  setRegistryInfo={registryInfo.set}
                  invalid={invalid.get()}
                  registryInfo={registryInfo.get()}
                />
                <AppBtn onPress={handleSubmit as any} className="w-full mb-6">
                  {"提交"}
                </AppBtn>
              </View>
            </View>
          }
        </ScrollView>
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default ChangeProfile;
