import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { GlobalStyles } from "@/settings";
import { useNavigation } from "expo-router";
import logger from "@/utils/logger";
import { AD } from "@/types/ad";

type props = {
  data: AD[];
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
    logger("console", "carousel timer");
    const timer = setInterval(() => {
      onPressPagination((progress.get() + 1) % data.length);
    }, 18000);
    return () => {
      clearInterval(timer);
    };
  }, [progress, data.length, onPressPagination]);
  logger("console", "ImageCarouselShow.");
  return (
    <>
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={height}
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: GlobalStyles.ThemeColor2,
              borderRadius: 10,
              overflow: "hidden"
            }}
            onPress={() => {
              item?.handler && item.handler(item);
            }}
          >
            <Image source={item.cover}
                   style={{ width: "100%", height: "100%" }}
                   contentFit={"cover"}
            />
          </Pressable>
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

export default memo(ImageCarousel);
