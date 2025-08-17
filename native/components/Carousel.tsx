import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle, useMemo,
  useRef
} from "react";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { CarouselData } from "@/types/ad";
import { Log } from "@/utils/logger";


type props = {
  data: CarouselData[];
  width: number;
  height: number;
  containerStyle?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
}

const ImageCarousel: ForwardRefRenderFunction<object, props> = (
  {
    data,
    width,
    height,
    containerStyle,
    autoPlay = true,
    loop = true
  },
  ref
) => {
  useNavigation();
  const Instance = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const scrollTo = useCallback(
    (index: number) => {
      Instance.current?.scrollTo({
        count: index - progress.value,
        animated: true
      });
    },
    [progress]
  );
  const finalContainerStyle = useMemo(
    () => ({
      ...ContainerStyle,
      ...containerStyle as object
    } as const),
    [containerStyle]
  );
  const renderItem = useCallback(
    ({ item }: { item: CarouselData }) => (
      <Pressable style={finalContainerStyle} onPress={item.handler}>
        <Image source={item.cover} style={CoverStyle} contentFit="cover" />
      </Pressable>
    ),
    [finalContainerStyle]
  );
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay) {
      timer = (setInterval(() => {
        scrollTo((progress.get() + 1) % data.length);
      }, 18000));
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, [autoPlay, data.length, scrollTo, progress]);

  useImperativeHandle(ref, () => ({
    scrollTo
  }));
  Log.Console("ImageCarouselShow.");
  return (
    <>
      <Carousel
        ref={Instance}
        style={CarouselStyle}
        loop={loop}
        width={width}
        height={height}
        data={data}
        onProgressChange={progress}
        renderItem={renderItem}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        activeDotStyle={PaginationActiveDotStyle}
        dotStyle={PaginationDotStyle}
        containerStyle={PaginationContainerStyle}
        onPress={scrollTo}
      />
    </>
  );
};

export default forwardRef(ImageCarousel);


const {
  PaginationActiveDotStyle,
  PaginationDotStyle,
  PaginationContainerStyle,
  ContainerStyle,
  CarouselStyle,
  CoverStyle
} = StyleSheet.create({
  CarouselStyle: { backgroundColor: "transparent" },
  PaginationActiveDotStyle: { backgroundColor: "#999" },
  PaginationDotStyle: { backgroundColor: "#fff", borderRadius: 50 },
  PaginationContainerStyle: { gap: 5, marginTop: -20 },
  ContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    width: "95%",
    height: "95%",
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  CoverStyle: {
    width: "95%",
    height: "95%",
    borderRadius: 10
  }
} as const);
