import { useCallback, useMemo } from "react";
import { usePages } from "@/hooks/usePages";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";
import { useUserZustandStore } from "@/stores/zustand/user";
import { useShallow } from "zustand/react/shallow";


interface returnType {
  hasToken: boolean,
  handleLogout: () => void,
  handleLogin: () => void,
  safeLogout: () => void
}

export const useLogin = (): returnType => {
  const { token, setLogout: logout } = useUserZustandStore(
    useShallow(
      state => ({
        token: state.token,
        setLogout: state.setLogout
      })
    )
  );
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
  }, [logout, sendLogout]);

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
