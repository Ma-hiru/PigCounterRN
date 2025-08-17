import { getWeather } from "@/utils/getWeather";
import { Log } from "@/utils/logger";
import { useEffect } from "react";
import { useImmer, Updater } from "use-immer";
import localStore from "@/utils/localStore";
import dayjs from "dayjs";

interface WeatherStatus {
  weather: WeatherData | null;
  loading: boolean;
  err: any;
}

export const useWeather = () => {
  const [status, setStatus] = useImmer<WeatherStatus>({
    weather: null,
    loading: false,
    err: null
  });
  useEffect(() => {
    localStore.getItem("last_get_weather")
      .then(
        weather => {
          const lastData: WeatherData & { last_modified: number } = JSON.parse(weather);
          if (lastData && lastData.last_modified) {
            const old = dayjs(lastData.last_modified);
            const diff = dayjs().diff(old, "hours");
            if (Math.abs(diff) > 1) WeatherData(setStatus);
            else {
              console.log("使用缓存数据");
              setStatus((draft) => {
                draft.weather = lastData;
              });
            }
          }
        }
      )
      .catch(() => WeatherData(setStatus));
  }, [setStatus]);
  return status;
};

const WeatherData = (setStatus: Updater<WeatherStatus>) => {
  setStatus(draft => {
    draft.loading = true;
  });
  getWeather()
    .then((weather) => {
      setStatus(draft => {
        draft.weather = weather;
        weather && localStore.setItem("last_get_weather", JSON.stringify({
          ...weather,
          last_modified: new Date().getTime()
        })).then(() => {
          console.log("保存天气数据成功");
        }).catch((e) => {
          console.log("保存天气数据失败:", e);
        });
      });
    })
    .catch((error) => {
      setStatus(draft => {
        draft.err = error;
      });
      Log.Echo({ error });
      Log.Toast("获取天气失败，请检查网络或权限", "SHORT", "BOTTOM");
    })
    .finally(() => {
      setStatus(draft => {
        draft.loading = false;
      });
    });
};
