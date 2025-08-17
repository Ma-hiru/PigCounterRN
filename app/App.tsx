import { Stack } from "expo-router";
import { memo } from "react";
import { getLoadedFonts } from "expo-font";
import { Log } from "@/utils/logger";


const App = () => {
  Log.Console("App Show");
  Log.Console("LoadedFonts", getLoadedFonts());
  return (
    <Stack screenOptions={screen_options}>
      {
        pages.map(
          page =>
            <Stack.Screen name={page} options={stack_options} key={page} />
        )
      }
    </Stack>
  );
};
export default memo(App);

const pages = [
  "(main)",
  "index",
  "Login",
  "CompanyInfo",
  "HistoryInfo",
  "UserInfo",
  "Feedback",
  "UploadFiles",
  "Registry",
  "ForgetPassword",
  "Settings",
  "Notice",
  "NewsDetail",
  "Banner",
  "ChangeProfile",
  "OnceUpload",
  "DetailHistory"
];

const screen_options: Parameters<typeof Stack>[0]["screenOptions"] = {
  animation: "simple_push",
  animationDuration: 350,
  gestureEnabled: true,
  animationTypeForReplace: "pop",
  fullScreenGestureEnabled: true
};
const stack_options: Parameters<typeof Stack.Screen>[0]["options"] = {
  headerShown: false
};
