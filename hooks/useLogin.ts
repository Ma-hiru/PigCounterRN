import RootState, { userActions, userSelector } from "@/stores";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const { setLogout } = userActions;
const { dispatch } = RootState;
export const useLogin = (): {
  hasToken: boolean,
  handleLogout: () => void,
  handleLogin: () => void
} => {
  const { token } = useSelector(userSelector);
  const router = useRouter();
  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    goToPages(router, "/Login", "MOVE");
  }, [router]);
  const handleLogin = useCallback(() => {
    goToPages(router, "/Login", "MOVE");
  }, [router]);
  return { hasToken: !!token, handleLogout: handleLogout, handleLogin: handleLogin };
};
