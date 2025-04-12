import ImgItem from "@/components/feedback/ImgItem";
import { FeedbackInfo } from "@/types/feedback";
import { FC } from "react";
import { View } from "react-native";
import { Updater } from "use-immer";

interface props {
  feedbackInfo: FeedbackInfo,
  setFeedbackInfo: Updater<FeedbackInfo>;
}

const ImgUploader: FC<props> = ({ feedbackInfo, setFeedbackInfo }) => {
  const RenderExistImg = () => {
    return feedbackInfo.feedbackImg.map((item, index) =>
      <ImgItem key={index} source={item} setFeedbackInfo={setFeedbackInfo} />
    );
  };
  return (
    <>
      <View className="w-full flex-row justify-start items-center" style={{ flexWrap: "wrap" }}>
        {RenderExistImg()}
        <ImgItem setFeedbackInfo={setFeedbackInfo} />
      </View>
    </>
  );
};
export default ImgUploader;

