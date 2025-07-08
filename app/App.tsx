import { Stack } from "expo-router";
import { memo } from "react";
import { getLoadedFonts } from "expo-font";
import { Log } from "@/utils/logger";
import { useRefreshPersisted } from "@/hooks/useChangePersisted";

const App = () => {
  useRefreshPersisted(false);
  Log.Console("App");
  Log.Console("LoadedFonts", getLoadedFonts());
  return (
    <Stack screenOptions={{
      animation: "fade",
      animationDuration: 350,
      gestureEnabled: true,
      animationTypeForReplace: "pop",
      fullScreenGestureEnabled: true
    }}>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="CompanyInfo" options={{ headerShown: false }} />
      <Stack.Screen name="HistoryInfo" options={{ headerShown: false }} />
      <Stack.Screen name="UserInfo" options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" options={{ headerShown: false }} />
      <Stack.Screen name="UploadFiles" options={{ headerShown: false }} />
      <Stack.Screen name="Registry" options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="Settings" options={{ headerShown: false }} />
      <Stack.Screen name="Notice" options={{ headerShown: false }} />
      <Stack.Screen name="NewsDetail" options={{ headerShown: false }} />
      <Stack.Screen name="Banner" options={{ headerShown: false }} />
      <Stack.Screen name="ChangeProfile" options={{ headerShown: false }} />
      <Stack.Screen name="OnceUpload" options={{ headerShown: false }} />
      <Stack.Screen name="DetailHistory" options={{ headerShown: false }} />
    </Stack>
  );
};
export default memo(App);
