import { FC, memo } from "react";
import ImageCarousel from "@/components/Carousel";
import { Dimensions, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AD } from "@/types/ad";
import wait from "@/assets/ad/wait.jpg";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { Log } from "@/utils/logger";


const Carousel: FC<object> = () => {
  Log.Console("HomeCarouselStart.");
  const router = useRouter();
  const handler = goToPages(router, {
    pathname: "/Banner",
    params: {
      url: "https://shiina-mahiru.cn/waitAD",
      title: "网页-广告示范"
    }
  }, "FN");
  const ADList: AD[] = [
    {
      cover: wait,
      url: "https://shiina-mahiru.cn/waitAD",
      title: "网页-广告示范",
      handler
    }, {
      cover: wait,
      url: "https://shiina-mahiru.cn/waitAD",
      title: "网页-广告示范",
      handler
    }, {
      cover: wait,
      url: "https://shiina-mahiru.cn/waitAD",
      title: "网页-广告示范",
      handler
    }, {
      cover: wait,
      url: "https://shiina-mahiru.cn/waitAD",
      title: "网页-广告示范",
      handler
    }];
  return (
    <>
      <View className=""
            style={{ position: "relative", top: -40, margin: "auto", marginBottom: 15 }}>
        <ImageCarousel
          data={ADList}
          width={Dimensions.get("window").width * 0.84}
          height={Dimensions.get("window").width * 0.84 / 16 * 9}
        />
      </View>
    </>
  );
};
export default memo(Carousel);
