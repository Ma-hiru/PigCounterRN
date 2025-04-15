import { getLocation } from "@/utils/getLocation";
import logger from "@/utils/logger";
import { LocationObject } from "expo-location";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { useImmer } from "use-immer";

type ReturnType = {
  location: LocationObject | null;
  loading: boolean;
  err: any;
};
export const useLocation = () => {
  const [status, setStatus] = useImmer<ReturnType>({
    location: null,
    loading: false,
    err: null
  });
  useEffect(() => {
    setStatus(draft => {
      draft.loading = true;
    });
    getLocation()
      .then((location) => {
        setStatus(draft => {
          draft.location = location;
        });
      })
      .catch((error) => {
        setStatus(draft => {
          draft.err = error;
        });
        logger("console", error);
        ToastAndroid?.showWithGravity("获取位置失败，请检查网络或权限", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      })
      .finally(() => {
        setStatus(draft => {
          draft.loading = false;
        });
      });
  }, [setStatus]);
  return status;
};
