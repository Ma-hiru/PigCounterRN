import { useAsync } from "@/hooks/useAsync";
import { getLocation } from "@/hooks/useLocation";
import { CityType, WeatherData, WeatherType } from "@/types/api";
import logger from "@/utils/logger";
import axios from "axios";
import { ToastAndroid } from "react-native";

const enum API {
  LOCAL_WEATHER = "https://1devapi.qweather.com/v7/weather/now",
  LOCAL_CITY = "https://1geoapi.qweather.com/v2/city/lookup",
  KEY = "5e185d3411dc4d5bb0e0a276a704ea63"
}

export const getLocalWeatherData = (city: string): Promise<WeatherType> =>
  axios.get(`${API.LOCAL_WEATHER}?location=${city}&lang=zh&unit=m`, {
    headers: {
      "X-QW-Api-Key": API.KEY
    }
  });
export const getCityLocation = (city: string = "北京"): Promise<CityType> =>
  axios.get(`${API.LOCAL_CITY}?location=${city}`, {
    headers: {
      "X-QW-Api-Key": API.KEY
    }
  });

const getWeather = async (): Promise<WeatherData | null> => {
  const location = await getLocation();
  if (!location) return null;
  const { longitude, latitude } = location.coords;
  const city: CityType = await getCityLocation(`${longitude.toFixed(2)},${latitude.toFixed(2)}`);
  const weather: WeatherType = await getLocalWeatherData(
    city.location[0].id
  );
  const cityName = city.location[0].name;
  const temp = weather.now.temp;
  const icon = weather.now.icon;
  const weatherData = weather.now.text;
  return {
    city,
    weather,
    cityName,
    weatherData,
    temp,
    icon
  } satisfies WeatherData;
};

export const useWeather = () => {
  console.log(1);
  const [data, loading, err] = useAsync(getWeather, true);
  if (err) {
    logger("console", err);
    if (ToastAndroid?.showWithGravity)
      ToastAndroid.showWithGravity("定位失败，请检查网络或权限", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    return null;
  }
  if (loading || !data) return null;
  return data;
};
