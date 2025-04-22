import RootState, { useAppSelector, userActions, userSelector } from "@/stores";
import { useCallback, useMemo } from "react";
import { usePages } from "@/hooks/usePages";
import { useFetchData } from "@/utils/fetchData";
import { Log } from "@/utils/logger";

const { setLogout } = userActions;
const { dispatch } = RootState;

interface returnType {
  hasToken: boolean,
  handleLogout: () => void,
  handleLogin: () => void,
  safeLogout: () => void
}

export const useLogin = (): returnType => {
  const { token } = useAppSelector(userSelector);
  const { fetchData, API } = useFetchData();
  const Pages = usePages();
  const logout = useCallback(() => {
    fetchData(API.reqLogout, []).catch((err) => {
      Log.Toast(err.Message || err.toString() || "请求失败", "SHORT", "BOTTOM");
    });
  }, [API.reqLogout, fetchData]);

  const safeLogout = useCallback(() => {
    dispatch(setLogout());
    logout();
  }, [logout]);

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
