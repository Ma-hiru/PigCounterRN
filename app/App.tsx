import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector, useUserStore } from "@/stores";
import { useEffect } from "react";
import localStore from "@/utils/localStore";

export default function App() {
  const { token } = useAppSelector((Root) => Root.userStore);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (token === "") {
      localStore.getItem("token").then((token) => {
        isMounted && dispatch(useUserStore.actions.setToken(token));
      });
    }
    return () => {
      isMounted = false;
    };
  }, [token, dispatch]);
  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="CompanyInfo" options={{ headerShown: false }} />
      <Stack.Screen name="HistoryInfo" options={{ headerShown: false }} />
      <Stack.Screen name="UserInfo" options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" options={{ headerShown: false }} />
      <Stack.Screen name="UploadFiles" options={{ headerShown: true }} />
    </Stack>
  );
}
