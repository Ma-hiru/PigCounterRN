import WeatherBg from "@/assets/images/weather_bg4.png";
import { useSafeArea } from "@/hooks/useSafeArea";
import { useWeather } from "@/hooks/useWeather";
import { APP_NAME, GetWeatherIconUrl, GlobalStyles } from "@/settings";
import logger from "@/utils/logger";
import { setImageScale } from "@/utils/setImageScale";
import { FC, useState } from "react";
import { Image, ImageLoadEventData } from "expo-image";
import { View, Text } from "react-native";


type props = object

const Weather: FC<props> = () => {
  const weatherData = useWeather();
  logger("console", weatherData);
  const [bgScale, setBgScale] = useState(1);
  const [boxHeight, setBoxHeight] = useState(300);
  const { topInset, screenWidth } = useSafeArea();
  const onImgLoad = (e: ImageLoadEventData) => {
    setBoxHeight(screenWidth * e.source.height / e.source.width - topInset);
    const size = setImageScale(bgScale, setBgScale);
    size(e);
  };
  return (
    <>
      <Image source={WeatherBg} style={{ width: "100%", aspectRatio: bgScale }}
             contentFit="cover" onLoad={onImgLoad} />
      <View className="absolute left-0 flex-row justify-between w-full"
            style={{ top: topInset, height: boxHeight }}>
        <View className="w-auto justify-end pl-8" style={{ height: boxHeight }}>
          <Text className="text-4xl font-bold mb-4"
                style={{ color: GlobalStyles.ThemeColor }}>{APP_NAME}</Text>
        </View>
        <View className="w-auto items-center" style={{ height: boxHeight, marginRight: 20 }}>
          <Image
            source={GetWeatherIconUrl(weatherData?.weather?.icon, GlobalStyles.WeatherIcon.style, GlobalStyles.WeatherIcon.color, GlobalStyles.WeatherIcon.defaultIcon)}
            style={{ height: 50, width: 50, marginTop: 10, marginBottom: 10 }} />
          <Text className="text-xl font-bold"
                style={{ color: "rgba(248,248,0,0.98)" }}>
            {`${weatherData?.weather?.cityName ?? "雨湖区"} ${weatherData?.weather?.temp ?? "19"}℃`}
          </Text>
        </View>
      </View>
    </>
  );
};
export default Weather;
