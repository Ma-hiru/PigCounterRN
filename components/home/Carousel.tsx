import { FC, memo } from "react";
import ImageCarousel from "@/components/Carousel";
import { Dimensions, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AD } from "@/types/ad";
import wait from "@/assets/ad/wait.jpg";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { Log } from "@/utils/logger";


type props = object;


const Carousel: FC<props> = () => {
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
        <Shadow offset={[0, 0]} sides={{ bottom: true }} distance={20}
                corners={{ bottomEnd: true }} paintInside={false} stretch={false}
                safeRender={false}>
          <ImageCarousel
            data={ADList}
            width={Dimensions.get("window").width * 0.84}
            height={Dimensions.get("window").width * 0.84 / 16 * 9}
          />
        </Shadow>
      </View>
    </>
  );
};
export default memo(Carousel);
