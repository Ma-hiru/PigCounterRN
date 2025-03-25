import { FC } from "react";
import { VideoPlayer, VideoView } from "expo-video";
import { StyleProp, View, ViewStyle } from "react-native";

interface props {
  ContainerStyle: StyleProp<ViewStyle>;
  videoStyle: StyleProp<ViewStyle>;
  player: VideoPlayer;
}

const PreviewVideo: FC<props> = (
  {
    ContainerStyle,
    videoStyle,
    player
  }) => {
  // const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
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
export default PreviewVideo;
