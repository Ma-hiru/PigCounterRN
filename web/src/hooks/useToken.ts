import { useAppSelector, userSelector } from "@/stores/redux";
import { useCallback, useMemo } from "react";
import { logout } from "@/utils/logout.ts";
import { useUserRedux } from "@/hooks/useRedux.ts";
import { computed } from "vue";
import { usePagesReact, usePagesVue } from "@/hooks/usePages.ts";

export const useTokenReact = () => {
  const { token } = useAppSelector(userSelector);
  const router = usePagesReact();
  const sendLogout = useCallback(() => {
    //TODO
  }, []);
  const Logout = useCallback(() => {
    sendLogout();
    logout();
    router.push({ name: "login" }).then();
  }, [router, sendLogout]);
  return useMemo(() => ({
    HasToken: !!token,
    Logout
  }), [Logout, token]);
};
export const useTokenVue = () => {
  const userStore = useUserRedux();
  const HasToken = computed(() => {
    return !!userStore.value.token;
  });
  const router = usePagesVue();
  const sendLogout = () => {
    //TODO
  };
  const Logout = () => {
    sendLogout();
    logout();
    router.push({ name: "login" }).then();
  };
  return {
    HasToken,
    Logout
  };
};
