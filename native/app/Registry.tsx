import BigHeader from "@/components/BigHeader";
import AppBtn from "@/components/AppBtn";
import defaultAvatar from "@/assets/images/logo_1.jpg";
import { validate, validateType } from "@/components/registry/validate";
import RegistryPagesForm from "@/components/registry/RegistryPagesForm";
import { useFetchData } from "@/utils/fetchData";
import { FC, memo, useState } from "react";
import {
  ImageURISource,
  Pressable,
  View,
  Text,
  StatusBar,
  ScrollView,
  InteractionManager,
  ImageBackground
} from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useImmer } from "use-immer";
import { APP_NAME } from "@/settings";
import background from "@/assets/images/login/login_bg_1.jpg";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { Log } from "@/utils/logger";
import { useToast } from "@/components/ui/toast";
import { useMyState } from "@/hooks/useMyState";
import { fileSystem } from "@/utils/fileSystem";
import { LinearGradient } from "expo-linear-gradient";

type props = object

const Registry: FC<props> = () => {
  const [registryInfo, setRegistryInfo] = useImmer<registryInfo>({
    username: "",
    password: "",
    name: "",
    sex: "",
    phone: "",
    organization: "",
    picture: new fileSystem.RNFile(),
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
  const loading = useMyState(false);
  const router = useRouter();
  const { fetchData, API } = useFetchData();
  const toast = useToast();
  const handleSubmit = async () => {
    if (!validate(registryInfo, setInvalid)) return;
    if (avatar === defaultAvatar) return Log.Message(toast, "缺少信息", "请选择头像");
    loading.set(true);
    InteractionManager.runAfterInteractions(async () => {
      await fetchData(
        API.reqRegistry,
        [registryInfo],
        (_, createToast) => {
          createToast("注册成功", "注册成功，请登录");
          goToPages(router, "/Login", "MOVE");
        },
        (res, createToast) => {
          createToast("请求出错！", res?.message);
        }
      );
      loading.set(false);
    });
  };
  const pickAvatar = async () => {
    await fileSystem.PickAvatar((res) => {
      setRegistryInfo((draft) => {
        draft.picture = res;
      });
      setAvatar(res);
    }, toast);
  };
  return (
    <>
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa","#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <ImageBackground className="flex-1">
          <ScrollView className="flex-1 w-screen h-screen">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <BigHeader title="注册"
                       info={<BigHeader.InfoText content={`注册{${APP_NAME}}系统`} />}
                       containerStyle={{ backgroundColor: "none" }} />
            <View className="flex-1 justify-start items-center" style={{ marginTop: 30 }}>
              <View className="flex justify-center items-center w-[80%]">
                <Pressable onPress={pickAvatar} className="mb-6 justify-center items-center">
                  <Avatar size="xl">
                    <AvatarImage source={avatar} />
                  </Avatar>
                  {avatar === defaultAvatar && <Text className="text-sm mt-2" style={{color:"#666"}}>点击选择头像</Text>}
                </Pressable>
                <RegistryPagesForm
                  setRegistryInfo={setRegistryInfo}
                  invalid={invalid}
                  registryInfo={registryInfo}
                />
                <AppBtn onPress={handleSubmit as any} className="w-full mb-6"
                           loading={loading.get()}>
                  注册
                </AppBtn>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Registry);
