import BigHeader from "@/components/BigHeader";
import ImgUploader from "@/components/feedback/ImgUploader";
import MyBlueBtn from "@/components/MyBlueBtn";
import { useLogin } from "@/hooks/useLogin";
import { FC, useCallback, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { APP_NAME, NO_LOGIN_TIPS } from "@/settings";
import { useMyState } from "@/hooks/useMyState";
import Blank from "@/components/Blank";
import { LinearGradient } from "expo-linear-gradient";
import { info } from "expo/build/devtools/logger";

type props = object

export const Feedback: FC<props> = () => {
  const { hasToken } = useLogin();
  const loading = useMyState(false);
  const feedbackInfo = useMyState<FeedbackInfo>({
    taskId: 0,
    feedback: "",
    feedbackImg: []
  });
  const submit = useCallback(() => {
    loading.set(true);
    setTimeout(() => {
      loading.set(false);
    }, 2000);
  }, [loading]);
  const NoDataRender = useMemo(() => <Blank tips={NO_LOGIN_TIPS} style={{
    position: "absolute",
    top: "50%",
    left: "50%"
  }} className={"-translate-x-1/2 -translate-y-1/2"} />, []);
  const DataRender = useMemo(() => <View className="flex-1 justify-between items-center mt-16">
    <View className="w-[80%]">
      <Text className="mb-4">文字信息（必须）</Text>
      <Textarea
        size="md"
        isReadOnly={false}
        isInvalid={false}
        isDisabled={false}
      >
        <TextareaInput
          placeholder="描述你的问题"
          value={feedbackInfo.get().feedback}
          onChangeText={text => feedbackInfo.set(draft => {
            draft.feedback = text;
          })}
        />
      </Textarea>
      <Text className="mb-4 mt-4">上传图片（选填）</Text>
      <ImgUploader feedbackInfo={feedbackInfo.get()} setFeedbackInfo={feedbackInfo.set}
                   key={feedbackInfo.get().feedbackImg.length} />
    </View>
    <View className="w-[80%] justify-center items-center">
      <MyBlueBtn className="mb-8" loading={loading.get()} onPress={submit}>提交</MyBlueBtn>
    </View>
  </View>, [feedbackInfo, loading, submit]);

  const Render = useCallback(() => {
    if (hasToken) return DataRender;
    return NoDataRender;
  }, [DataRender, NoDataRender, hasToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <View className="flex-1" style={{ paddingBottom: 25 }}>
          <BigHeader title="问题反馈" containerStyle={{ backgroundColor: "transparent" }} info={
            <BigHeader.InfoText content={`反馈使用{${APP_NAME}}系统的问题信息`} />
          }>
          </BigHeader>
          {Render()}
        </View>
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Feedback;
