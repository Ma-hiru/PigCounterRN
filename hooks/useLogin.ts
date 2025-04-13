import RootState, { userActions, userSelector } from "@/stores";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useSelector } from "react-redux";

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
  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    goToPages(router, "/Login", "MOVE");
  }, [router]);
  const safeLogout = useCallback(() => {
    dispatch(setLogout());
  }, []);
  const handleLogin = useCallback(() => {
    goToPages(router, "/Login", "MOVE");
  }, [router]);
  return { hasToken: !!token, handleLogout, handleLogin, safeLogout };
};
