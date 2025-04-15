import Logger from "@/utils/logger";
import { FC, memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";
import NoData from "@/assets/images/upload/logout.svg";
import { Text as TextInline } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import PreviewVideo from "@/components/upload/PreviewVideo";

interface props {
  previewImg: RNFile | undefined;
  previewVideo: RNFile | undefined;
  cachePath: { path: string; type: "images" | "videos" | "" };
  setPreviewVisible: (previewVisible: boolean) => any;
  scale: number;
  setScale: (scale: number) => any;
}

const UploadPagesPreviewCard: FC<props> = (
  {
    previewImg,
    previewVideo,
    cachePath,
    setPreviewVisible,
    scale,
    setScale
  }) => {
  console.log("------------------------");
  Logger("console", "cachePath--PreviewCard", cachePath);
  Logger("console", "previewImg--PreviewCard", previewImg);
  Logger("console", "previewVideo--PreviewCard", previewVideo);
  console.log("------------------------");
  return (
    <>
      <Card className="mb-4" style={{ backgroundColor: "rgba(255,255,255,0.6)",backdropFilter:"blur(10)"  }}>
        {
          (previewImg || cachePath.path)
            ?
            <Pressable onPress={() => setPreviewVisible(true)}>
              {
                cachePath.type === "images" ?
                  <Image source={previewImg || { uri: cachePath.path }}
                         style={{ width: "100%", aspectRatio: scale }}
                         onLoad={setImageScale(scale, setScale)}
                  /> :
                  <PreviewVideo
                    ContainerStyle={styles.videoContainer}
                    videoStyle={styles.video}
                    cachePath={cachePath}
                    previewVideo={previewVideo}
                  />
              }
            </Pressable>
            :
            <View className="flex flex-row justify-center items-center"
                  style={styles.previewCard}>
              <Image source={NoData} style={styles.icon} />
              <TextInline>暂无预览</TextInline>
            </View>
        }
      </Card>
    </>
  );
};
export default memo(UploadPagesPreviewCard);
const styles = StyleSheet.create({
  previewCard: {
    height: 200,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  videoContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50
  },
  video: {
    width: 350,
    height: 275
  },
  controlsContainer: {
    padding: 10
  }
});
