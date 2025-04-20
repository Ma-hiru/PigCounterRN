import PlusIcon from "@/assets/images/plus.svg";
import DelIcon from "@/assets/images/delete.svg";
import { Card } from "@/components/ui/card";
import { pickImgFile } from "@/utils/pickImgFile";
import { setImageScale } from "@/utils/setImageScale";
import { Image, ImageSource } from "expo-image";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, View, Dimensions } from "react-native";
import { Updater } from "use-immer";

interface props {
  source?: ImageSource;
  setFeedbackInfo: Updater<FeedbackInfo>;
}

const ImgItem: FC<props> = ({ source, setFeedbackInfo }) => {
  const [scale, setScale] = useState(1);
  const addImg = useCallback(async () => {
    const res = await pickImgFile();
    if (!res) return;
    setFeedbackInfo(draft => {
      draft.feedbackImg.push(res);
    });
  }, [setFeedbackInfo]);
  const removeImg = useCallback(() => {
    setFeedbackInfo(draft => {
      const index = draft.feedbackImg.findIndex(item => item.uri === source?.uri);
      draft.feedbackImg.splice(index, 1);
    });
  }, [setFeedbackInfo, source?.uri]);
  const existRender = useMemo(() => <Pressable>
    <Image
      source={source}
      style={{ width: "100%", aspectRatio: scale }}
      contentFit="contain"
      onLoad={setImageScale(scale, setScale)}
    />
  </Pressable>, [scale, source]);
  const addRender = useMemo(() => <Pressable onPress={addImg}>
    <Image
      source={PlusIcon}
      style={{ width: 25, height: 25 }}
      contentFit="contain"
    />
  </Pressable>, [addImg]);
  const Render = useCallback(() => {
    if (source) return existRender;
    return addRender;
  }, [addRender, existRender, source]);
  return (
    <>
      <Card className="justify-center items-center relative" style={styles.ItemCard}>
        <View className="flex-1 justify-center items-center" style={{ overflow: "hidden" }}>
          {Render()}
        </View>
        {
          source &&
          <Pressable style={styles.DelIcon} onPress={removeImg}>
            <Image source={DelIcon} contentFit="cover" style={{ width: 20, height: 20 }} />
          </Pressable>
        }
      </Card>
    </>
  );
};
export default memo(ImgItem);
const screenWidth = Dimensions.get("window").width;
const gap = 10;
const num = 3;
const scale = 0.8;
const size = screenWidth * scale / num - gap;
const styles = StyleSheet.create({
  ItemCard: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#a39f9f",
    marginRight: gap,
    marginBottom: gap,
    padding: 5,
    width: size,
    height: size
  },
  DelIcon: {
    position: "absolute",
    right: -10,
    top: -10
  }
});
