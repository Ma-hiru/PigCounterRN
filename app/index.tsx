import { useLogin } from "@/hooks/useLogin";
import localStore from "@/utils/localStore";
import { Redirect } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  const { safeLogout } = useLogin();
  useEffect(() => {
    localStore.getItem("remember").then(res => {
      try {
        const remember = Boolean(res);
        if (!remember) {
          safeLogout();
        }
      } catch {
        /*empty*/
      }
    });
  }, [safeLogout]);
  return <Redirect href="/(main)/Home" />;
};
// noinspection JSUnusedGlobalSymbols
export default Index;
