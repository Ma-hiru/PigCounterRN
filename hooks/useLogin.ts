import { useAppSelector, userSelector } from "@/stores";
import { useCallback, useMemo } from "react";
import { usePages } from "@/hooks/usePages";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";
import { logout } from "@/utils/user";


interface returnType {
  hasToken: boolean,
  handleLogout: () => void,
  handleLogin: () => void,
  safeLogout: () => void
}

export const useLogin = (): returnType => {
  Log.Console("useLogin");
  const { token } = useAppSelector(userSelector);
  const { fetchData, API } = useFetchData();
  const Pages = usePages();
  const sendLogout = useCallback(() => {
    fetchData(API.reqLogout, []).catch((err) => {
      Log.Toast(err.Message || err.toString() || "请求失败", "SHORT", "BOTTOM");
    });
  }, [API.reqLogout, fetchData]);

  const safeLogout = useCallback(() => {
    logout();
    sendLogout();
  }, [sendLogout]);

  const handleLogout = useCallback(() => {
    safeLogout();
    Pages.set("/Login", "MOVE");
  }, [Pages, safeLogout]);


  const handleLogin = useCallback(() => {
    Pages.set("/Login", "MOVE");
  }, [Pages]);

  return useMemo(() => ({
    hasToken: !!token,
    handleLogout,
    handleLogin,
    safeLogout
  }), [handleLogin, handleLogout, safeLogout, token]);
};
