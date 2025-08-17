import { getLocation } from "@/utils/getLocation";
import { Log } from "@/utils/logger";
import { LocationObject } from "expo-location";
import { useEffect } from "react";
import { useMyState } from "@/hooks/useMyState";

type ReturnType = {
  location: LocationObject | null;
  loading: boolean;
  err: any;
};
export const useLocation = () => {
  const status = useMyState<ReturnType>({
    location: null,
    loading: false,
    err: null
  });
  useEffect(() => {
    status.set(draft => {
      draft.loading = true;
    });
    getLocation()
      .then((location) => {
        status.set(draft => {
          draft.location = location;
        });
      })
      .catch((error) => {
        status.set(draft => {
          draft.err = error;
        });
        Log.Echo({ error });
        Log.Toast("获取位置失败，请检查网络或权限", "SHORT", "BOTTOM");
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
