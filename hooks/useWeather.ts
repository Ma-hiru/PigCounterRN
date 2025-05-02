import { getWeather } from "@/utils/getWeather";
import { Log } from "@/utils/logger";
import { useEffect } from "react";
import { useMyState } from "@/hooks/useMyState";

type ReturnType = {
  weather: WeatherData | null;
  loading: boolean;
  err: any;
};
export const useWeather = () => {
  const status = useMyState<ReturnType>({
    weather: null,
    loading: false,
    err: null
  });
  useEffect(() => {
    status.set(draft => {
      draft.loading = true;
    });
    getWeather()
      .then((weather) => {
        status.set(draft => {
          draft.weather = weather;
        });
      })
      .catch((error) => {
        status.set(draft => {
          draft.err = error;
        });
        Log.Echo({ error });
        Log.Toast("获取天气失败，请检查网络或权限", "SHORT", "BOTTOM");
      })
      .finally(() => {
        status.set(draft => {
          draft.loading = false;
        });
      });
    //eslint-disable-next-line
  }, []);
  return status;
};
