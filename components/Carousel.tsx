import { StyleProp, Text, View, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { ImageSource } from "expo-image";
import { FC, useCallback, useEffect, useRef } from "react";
import { Image } from "expo-image";
import wait from "@/assets/ad/wait.jpg";
import { GlobalStyles } from "@/settings";
import { useNavigation } from "expo-router";

type props = {
  data: (ImageSource | number)[];
  width: number;
  height: number;
  containerStyle?: StyleProp<ViewStyle>
}
const ImageCarousel: FC<props> = ({ data, width, height, containerStyle }) => {
  const navigation = useNavigation();
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPressPagination = useCallback((index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true
    });
  }, [progress]);
  useEffect(() => {
    const timer = setInterval(() => {
      onPressPagination((progress.get() + 1) % data.length);
    }, 18000);
    return () => {
      clearInterval(timer);
    };
  }, [progress, data.length, onPressPagination]);
  return (
    <>
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={height}
        data={data}
        onProgressChange={progress}
        renderItem={({ index, item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: GlobalStyles.ThemeColor2,
              borderRadius: 10,
              overflow: "hidden"
            }}
          >
            <Image source={wait}
                   style={{ width: "100%", height: "100%" }}
                   contentFit={"cover"}
            />
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: -15 }}
        onPress={onPressPagination}
      />
    </>
  );
};

export default ImageCarousel;
