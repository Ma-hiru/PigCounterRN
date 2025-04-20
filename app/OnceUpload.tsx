import { FC } from "react";
import { StatusBar, View } from "react-native";
import BigHeader from "@/components/BigHeader";
import { APP_NAME } from "@/settings";

type props = object;

const OnceUpload: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="单次计数"
                   info={<BigHeader.InfoText content={`测试{${APP_NAME}}系统`} />
                   }
        >
        </BigHeader>
      </View>
    </>
  );
};
export default OnceUpload;
