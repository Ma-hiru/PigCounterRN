import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { memo } from "react";
import App from "@/app/App";
import { useFonts } from "expo-font";
import FlyFlowerSongRegular from "@/assets/fonts/FlyFlowerSong-Regular.ttf";
import baigetianxingtiRegular from "@/assets/fonts/zihun50hao-baigetianxingti-Regular.ttf";

const RootLayout = () => {
  useFonts({ FlyFlowerSongRegular, baigetianxingtiRegular });
  return (
    <GluestackUIProvider mode="light">
      <App />
    </GluestackUIProvider>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(RootLayout);
