import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector, userActions, userSelector } from "@/stores";
import { memo, useEffect } from "react";
import localStore from "@/utils/localStore";

const App = ()=> {
  const { token } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { setToken } = userActions;
  useEffect(() => {
    let isMounted = true;
    if (token === "") {
      localStore.getItem("token").then((token) => {
        isMounted && dispatch(setToken(token));
      });
    }
    return () => {
      isMounted = false;
    };
  }, [token, dispatch, setToken]);
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
export default memo(App)
