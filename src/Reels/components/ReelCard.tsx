// packages Imports
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, Dimensions, Pressable } from "react-native";
import { Video, VideoReadyForDisplayEvent } from "expo-av";
import { ReelCardProps } from "../types/ReelsTypes";


// Screen Dimensions
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

function ReelCard({
  uri,
  _id,
  ViewableItem,
  backgroundColor = "black",
}: ReelCardProps) {
  // ref for Video Player
  const VideoPlayer = useRef(null);

  // States
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  const [SetDuration] = useState(0);

  // Play/Pause video according to viisibility
  useEffect(() => {
    if (ViewableItem === _id) PlayVideo();
    else PauseVideo();
  }, [ViewableItem]);

  // function for playing video
  const PlayVideo = async () => {
    try {
      if (VideoPlayer.current !== null) {
        // @ts-ignore: Object is possibly 'null'.
        VideoPlayer?.current.playAsync();
      }
    } catch (error) {}
  };

  // function for pausing video
  const PauseVideo = async () => {
    try {
      if (VideoPlayer.current !== null) {
        // @ts-ignore: Object is possibly 'null'.
        VideoPlayer?.current.pauseAsync();
      }
    } catch (error) {}
  };

  // function for getting video dimensions on load complete
  const onLoadComplete = async (event: VideoReadyForDisplayEvent) => {
    let status: any = event.status;
    const { naturalSize } = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(status.durationMillis || 0);
    } catch (error) {}
  };


  return (
    <Pressable
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <Video
        ref={VideoPlayer}
        source={uri}
        resizeMode="contain"
        shouldPlay
        onReadyForDisplay={onLoadComplete}
        style={VideoDimensions}
        isMuted={false}
      />
    </Pressable>
  );
}

// Exports
export default ReelCard;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: "center",
  },
});
