import { Stack } from "expo-router";
import { memo, useEffect } from "react";
import { useFonts, getLoadedFonts } from "expo-font";
import FlyFlowerSongRegular from "@/assets/fonts/FlyFlowerSong-Regular.ttf";
import baigetianxingtiRegular from "@/assets/fonts/zihun50hao-baigetianxingti-Regular.ttf";
import { PersistedRootState, uploadActions, uploadSelector, useAppSelector } from "@/stores";
import { useDispatch } from "react-redux";
import logger from "@/utils/logger";

const App = () => {
  // useEffect(() => {
  //   PersistedRootState.purge().then(() => {
  //     console.log("初始清除持久化成功");
  //   });
  // });
  let {
    TasksList,
    OnceTask
  } = useAppSelector(uploadSelector);
  useEffect(() => {
    logger("console", "App.tsx", TasksList);
    logger("console", "App.tsx", OnceTask);
    PersistedRootState.flush().then(() => {
      logger("console", "持久化重置刷新");
    });
  });
  useFonts({ FlyFlowerSongRegular, baigetianxingtiRegular });
  console.log(getLoadedFonts());
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
