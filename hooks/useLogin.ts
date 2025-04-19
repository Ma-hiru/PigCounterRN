import RootState, { userActions, userSelector } from "@/stores";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { reqLogout } from "@/api";

const { setLogout } = userActions;
const { dispatch } = RootState;

interface returnType {
  hasToken: boolean,
  handleLogout: () => void,
  handleLogin: () => void,
  safeLogout: () => void
}

export const useLogin = (): returnType => {
  const { token } = useSelector(userSelector);
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    dispatch(setLogout());
    goToPages(router, "/Login", "MOVE");
    await reqLogout();
  }, [router]);
  const safeLogout = useCallback(async () => {
    dispatch(setLogout());
    await reqLogout();
  }, []);
  const handleLogin = useCallback(() => {
    goToPages(router, "/Login", "MOVE");
  }, [router]);
  return { hasToken: !!token, handleLogout, handleLogin, safeLogout };
};
