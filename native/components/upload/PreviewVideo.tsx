import { Log } from "@/utils/logger";
import React, { FC, memo, useMemo } from "react";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { StyleProp, View, ViewStyle } from "react-native";
import { MyState } from "@/hooks/useMyState";
import colors from "tailwindcss/colors";
import { Text as TextInline } from "@/components/ui/text";
import { Spinner } from "@/components/ui/spinner";

interface props {
  ContainerStyle: StyleProp<ViewStyle>;
  videoStyle: StyleProp<ViewStyle>;
  cachePath: {
    path: string;
    type: "images" | "videos" | "";
  };
  previewVideo: VideoSource | undefined;
  loading: MyState<boolean>;
}

const PreviewVideo: FC<props> = (
  {
    ContainerStyle,
    videoStyle,
    cachePath,
    previewVideo,
    loading
  }) => {
  // const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  console.log("------------------------");
  Log.Console("cachePath--Video", cachePath);
  Log.Console("previewVideo--Video", previewVideo);
  const videoSource = useMemo(() => {
    return previewVideo || (cachePath.type === "videos" ? { uri: cachePath.path } : null);
  }, [cachePath, previewVideo]);
  Log.Console("videoSource--Video", videoSource);
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.play();
    console.log("player.status", player.status);
  });
  Log.Console("player--Video", player);
  console.log("------------------------");
  return (
    <>
      <View style={ContainerStyle}>
        {loading.get()
          ? <View className="flex flex-row justify-center items-center"
                  style={{ height: 200 }}>
            <Spinner size="small" color={colors.blue[100]} />
            <TextInline>加载中</TextInline>
          </View>
          : <VideoView style={videoStyle}
                       player={player}
                       allowsFullscreen
                       contentFit="contain"
                       allowsPictureInPicture

          />
        }
      </View>
    </>
  );
};
export default memo(PreviewVideo);
