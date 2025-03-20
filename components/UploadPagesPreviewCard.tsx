import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";
import NoData from "@/assets/images/upload/logout.svg";
import { Text as TextInline } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { ImagePickerAsset } from "expo-image-picker";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { useEvent } from "expo";

interface props {
  previewImg?: ImagePickerAsset;
  previewVideo?: VideoSource;
  cachePath: { path: string; type: string };
  setPreviewVisible: (previewVisible: boolean) => any;
  scale: number;
  setScale: (scale: number) => any;
}

export const UploadPagesPreviewCard: FC<props> = (
  {
    previewImg,
    previewVideo,
    cachePath,
    setPreviewVisible,
    scale,
    setScale
  }) => {
  const videoSource = previewVideo || (cachePath.type === "video" ? { uri: cachePath.path } : null);
  const player = useVideoPlayer(videoSource as VideoSource, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  return (
    <>
      <Card className="mb-4">
        {
          (previewImg || cachePath.path)
            ?
            <Pressable onPress={() => setPreviewVisible(true)}>
              {
                cachePath.type === "image" ?
                  <Image source={previewImg || cachePath.path}
                         style={{ width: "100%", aspectRatio: scale }}
                         onLoad={setImageScale(scale, setScale)}
                  /> :
                  <View style={styles.contentContainer}>
                    <VideoView style={styles.video}
                               player={player}
                               allowsFullscreen
                               allowsPictureInPicture
                    />
                  </View>
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
export default UploadPagesPreviewCard;
const styles = StyleSheet.create({
  previewCard: {
    height: 180,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  contentContainer: {
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
