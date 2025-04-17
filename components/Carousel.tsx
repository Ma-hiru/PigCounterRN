import { StyleProp, Text, View, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { ImageSource } from "expo-image";
import { FC, useCallback, useEffect, useRef } from "react";


type props = {
  data: (ImageSource | number)[];
  width: number;
  height: number;
  containerStyle?: StyleProp<ViewStyle>
}
const ImageCarousel: FC<props> = ({ data, width, height, containerStyle }) => {
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
    }, 2000);
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
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center"
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </>
  );
};

export default ImageCarousel;
