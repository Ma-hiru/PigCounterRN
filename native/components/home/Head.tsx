import { FC, memo, useMemo } from "react";
import Header from "@/components/Header";
import { APP_NAME, GetWeatherIconUrl, GlobalStyles } from "@/settings";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import WeatherBg from "@/assets/images/login/login_bg_1(1).jpg";
import { useWeather } from "@/hooks/useWeather";
import { Log } from "@/utils/logger";
import ScaledImage from "@/components/ScaledImage";


type props = object;

const Head: FC<props> = () => {
  const weatherData = useWeather();
  const weatherIcon = useMemo(
    () => weather_icon(weatherData.weather?.icon),
    [weatherData]
  );
  const weatherText = useMemo(
    () =>
      `${weatherData.weather?.cityName ?? " -- "} ${weatherData.weather?.temp ?? "--"}℃`
    , [weatherData]
  );
  Log.Console("HomeHeadShow.");
  return (
    <>
      <Header shadowDisabled={true} title={APP_NAME} containerStyle={HeadContainerStyle}
              titleStyle={HeadTextStyle}>
        <View className="w-auto items-center flex-row " style={HeadCapsuleStyle}>
          <Image source={weatherIcon} style={WeatherIconStyle} />
          <Text className="font-bold" style={WeatherTextStyle}>
            {weatherText}
          </Text>
        </View>
      </Header>
      <ScaledImage source={WeatherBg} style={BgStyle} contentFit="cover" />
    </>
  );
};
export default memo(Head);

const {
  HeadContainerStyle,
  HeadTextStyle,
  HeadCapsuleStyle,
  WeatherIconStyle,
  WeatherTextStyle,
  BgStyle
} = StyleSheet.create({
  HeadContainerStyle: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0)",
    paddingTop: 10
  },
  HeadTextStyle: {
    textAlign: "left",
    color: "#fff",
    fontSize: 30,
    fontFamily: "baigetianxingtiRegular" as Fonts
  },
  HeadCapsuleStyle: {
    backgroundColor: "rgba(255,255,255,0.85)",
    marginTop: 3,
    borderRadius: 20,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  WeatherIconStyle: {
    height: 17,
    width: 17,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 2,
    tintColor: GlobalStyles.ThemeColor1
  },
  WeatherTextStyle: {
    color: GlobalStyles.ThemeColor1,
    fontSize: 14
  },
  BgStyle: { width: "100%" }
} as const);

const weather_icon = (icon_index: string | null | undefined) => GetWeatherIconUrl(
  icon_index,
  GlobalStyles.WeatherIcon.style,
  GlobalStyles.WeatherIcon.color,
  GlobalStyles.WeatherIcon.defaultIcon
);
