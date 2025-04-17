import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { APP_NAME } from "@/settings";
import background from "@/assets/images/login/login_bg.png";
import { Image } from "expo-image";

type props = object

const ForgetPassword: FC<props> = () => {
  return (
    <>
      <View className="flex-1 relative">
        <Image
          source={background}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0
          }}
          contentFit={"cover"}
        />
        <ScrollView className="flex-1 w-screen h-screen">
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
          <BigHeader title="找回密码"
                     info={<BigHeader.InfoText content={`找回{${APP_NAME}}系统密码`} />}
                     containerStyle={{ backgroundColor: "none" }}>
            <View></View>
          </BigHeader>
        </ScrollView>
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default ForgetPassword;
