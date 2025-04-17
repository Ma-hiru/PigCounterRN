import { FC } from "react";
import ImageCarousel from "@/components/Carousel";
import { Dimensions, View } from "react-native";
import AD1 from "@/assets/ad/ad1.jpg";
import { Shadow } from "react-native-shadow-2";
import logger from "@/utils/logger";

type props = object;

const Carousel: FC<props> = () => {
  logger("console","CarouselStart.")
  return (
    <>
      <View className=""
            style={{ position: "relative", top: -50, margin: "auto", marginBottom: 15 }}>
        <Shadow offset={[0, 0]} sides={{ bottom: true }} distance={20}
                corners={{ bottomEnd: true }} paintInside={false} stretch={false}
                safeRender={false}>
          <ImageCarousel
            data={[AD1, ...new Array(6).keys()]}
            width={Dimensions.get("window").width * 0.84}
            height={Dimensions.get("window").width / 2}
          />
        </Shadow>
      </View>
    </>
  );
};
export default Carousel;
