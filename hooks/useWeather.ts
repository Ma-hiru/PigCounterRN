import { getWeather } from "@/utils/getWeather";
import logger from "@/utils/logger";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { useImmer } from "use-immer";

type ReturnType = {
  weather: WeatherData | null;
  loading: boolean;
  err: any;
};
export const useWeather = () => {
  const [status, setStatus] = useImmer<ReturnType>({
    weather: null,
    loading: false,
    err: null
  });
  useEffect(() => {
    setStatus(draft => {
      draft.loading = true;
    });
    getWeather()
      .then((weather) => {
        setStatus(draft => {
          draft.weather = weather;
        });
      })
      .catch((error) => {
        setStatus(draft => {
          draft.err = error;
        });
        logger("console", error);
        ToastAndroid?.showWithGravity("获取天气失败，请检查网络或权限", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      })
      .finally(() => {
        setStatus(draft => {
          draft.loading = false;
        });
      });
  }, [setStatus]);
  return status;
};
