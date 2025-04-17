import { FC } from "react";
import ImageCarousel from "@/components/Carousel";
import { Dimensions, View } from "react-native";

type props = object;

const Carousel: FC<props> = () => {
  return (
    <>
      <View style={{
        width: "85%",
        overflow: "hidden",
        margin: "auto",
        position: "relative",
        top: -50
      }}>
        <ImageCarousel
          data={[...new Array(6).keys()]}
          width={Dimensions.get("window").width * 0.85}
          height={Dimensions.get("window").width / 2}
        />
      </View>
    </>
  );
};
export default Carousel;
