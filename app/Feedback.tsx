import BigHeader from "@/components/BigHeader";
import ImgUploader from "@/components/feedback/ImgUploader";
import MyBlueBtn from "@/components/MyBlueBtn";
import { useLogin } from "@/hooks/useLogin";
import { FeedbackInfo } from "@/types/feedback";
import { FC, useCallback, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useImmer } from "use-immer";

interface props {
  /* empty */
}

export const Feedback: FC<props> = () => {
  const { hasToken } = useLogin();
  const NoDataRender = useMemo(() => <View
    className="flex-1 flex-row justify-center items-center">
    <Text style={{ textAlign: "center" }}>请登录</Text>
  </View>, []);
  const [feedbackInfo, setFeedbackInfo] = useImmer<FeedbackInfo>({
    taskId: 0,
    feedback: "",
    feedbackImg: []
  });
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
          value={feedbackInfo.feedback}
          onChangeText={text => setFeedbackInfo(draft => {
            draft.feedback = text;
          })}
        />
      </Textarea>
      <Text className="mb-4 mt-4">上传图片（选填）</Text>
      <ImgUploader feedbackInfo={feedbackInfo} setFeedbackInfo={setFeedbackInfo} key={feedbackInfo.feedbackImg.length}/>
    </View>
    <MyBlueBtn className="w-[80%] mb-4">提交</MyBlueBtn>
  </View>, [feedbackInfo, setFeedbackInfo]);
  const Render = useCallback(() => {
    if (!hasToken) return DataRender;
    return NoDataRender;
  }, [DataRender, NoDataRender, hasToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="问题反馈" info={
          <>
            <Text className="text-left text-[#999999]">反馈</Text>
            <Text className="text-left text-[#999999]">使用</Text>
            <Text className="text-left color-[#c38b95]">猪只</Text>
            <Text className="text-left color-[#409eff]">计数</Text>
            <Text className="text-left text-[#999999]">系统</Text>
            <Text className="text-left text-[#999999]">的问题信息</Text>
          </>
        }>
        </BigHeader>
        {Render()}
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Feedback;
