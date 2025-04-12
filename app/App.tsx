import { Stack } from "expo-router";
import { memo } from "react";

const App = () => {
  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="CompanyInfo" options={{ headerShown: false }} />
      <Stack.Screen name="HistoryInfo" options={{ headerShown: false }} />
      <Stack.Screen name="UserInfo" options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" options={{ headerShown: false }} />
      <Stack.Screen name="UploadFiles" options={{ headerShown: false }} />
      <Stack.Screen name="Registry" options={{ headerShown: false, title: "注册" }} />
      <Stack.Screen name="ForgetPassword" options={{ headerShown: false, title: "找回密码" }} />
    </Stack>
  );
};
export default memo(App);
