import { FC, memo, useState } from "react";
import Header from "@/components/Header";
import { APP_NAME, GetWeatherIconUrl, GlobalStyles } from "@/settings";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import WeatherBg from "@/assets/images/bg_2(1).jpg";
import { setImageScale } from "@/utils/setImageScale";
import { useWeather } from "@/hooks/useWeather";
import { Log } from "@/utils/logger";


type props = object;

const Head: FC<props> = () => {
  const weatherData = useWeather();
  const [bgScale, setBgScale] = useState(1);
  Log.Console("HomeHeadShow.");
  return (
    <>
      <Header
        shadowDisabled={true}
        title={APP_NAME}
        containerStyle={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0)",
          paddingTop: 10
        }}
        contentStyle={{
          width: "100%"
        }}
        titleStyle={{
          textAlign: "left",
          color: "#fff",
          fontSize: 30,
          fontFamily: "baigetianxingtiRegular" as Fonts
        }}
      >
        <View className="w-auto items-center flex-row "
              style={{
                backgroundColor: GlobalStyles.SecondColor,
                marginTop: 3,
                borderRadius: 20,
                padding: 2,
                paddingLeft: 5,
                paddingRight: 5
              }}
        >
          <Image
            source={GetWeatherIconUrl(weatherData.get().weather?.icon, GlobalStyles.WeatherIcon.style, GlobalStyles.WeatherIcon.color, GlobalStyles.WeatherIcon.defaultIcon)}
            style={{
              height: 18,
              width: 18,
              marginTop: 0,
              marginBottom: 0,
              tintColor: GlobalStyles.ThemeColor1
            }}
          />
          <Text className="font-bold"
                style={{
                  color: GlobalStyles.ThemeColor1,
                  fontSize: 14
                }}>
            {
              `${weatherData.get().weather?.cityName ?? "雨湖区"} ${weatherData.get().weather?.temp ?? "19"}℃`
            }
          </Text>
        </View>
      </Header>
      <Image
        source={WeatherBg}
        style={{ width: "100%", aspectRatio: bgScale }}
        contentFit="cover"
        onLoad={setImageScale(bgScale, setBgScale)}
      />
    </>
  );
};
export default memo(Head);
