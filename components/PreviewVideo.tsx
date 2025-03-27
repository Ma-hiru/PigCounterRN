import Logger from "@/utils/logger";
import { FC, memo, useMemo } from "react";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { StyleProp, View, ViewStyle } from "react-native";

interface props {
  ContainerStyle: StyleProp<ViewStyle>;
  videoStyle: StyleProp<ViewStyle>;
  cachePath: {
    path: string;
    type: "images" | "videos" | "";
  };
  previewVideo: VideoSource | undefined;
}

const PreviewVideo: FC<props> = (
  {
    ContainerStyle,
    videoStyle,
    cachePath,
    previewVideo,
  }) => {
  // const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  console.log("------------------------");
  Logger("console", "cachePath--Video", cachePath);
  Logger("console", "previewVideo--Video", previewVideo);
  const videoSource = useMemo(() => {
    return previewVideo || (cachePath.type === "videos" ? { uri: cachePath.path } : null);
  }, [cachePath, previewVideo]);
  Logger("console", "videoSource--Video", videoSource);
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.play();
    console.log("player.status", player.status);
  });
  Logger("console", "player--Video", player);
  console.log("------------------------");
  return (
    <>
      <View style={ContainerStyle}>
        <VideoView style={videoStyle}
                   player={player}
                   allowsFullscreen
                   contentFit="contain"
                   allowsPictureInPicture
        />
      </View>
    </>
  );
};
export default memo(PreviewVideo);
