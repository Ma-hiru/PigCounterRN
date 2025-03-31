import { Stack } from "expo-router";
import { memo } from "react";


const App = () => {
  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="CompanyInfo" options={{ headerShown: true }} />
      <Stack.Screen name="HistoryInfo" options={{ headerShown: true }} />
      <Stack.Screen name="UserInfo" options={{ headerShown: true }} />
      <Stack.Screen name="Feedback" options={{ headerShown: true }} />
      <Stack.Screen name="UploadFiles" options={{ headerShown: true }} />
      <Stack.Screen name="Registry" options={{ headerShown: true,title:"注册" }} />
      <Stack.Screen name="ForgetPassword" options={{ headerShown: true,title:"找回密码" }} />
    </Stack>
  );
};
export default memo(App);
