import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import RootState, { PersistedRootState } from "@/stores";
import { memo } from "react";
import App from "@/app/App";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import FlyFlowerSongRegular from "@/assets/fonts/FlyFlowerSong-Regular.ttf";
import baigetianxingtiRegular from "@/assets/fonts/zihun50hao-baigetianxingti-Regular.ttf";

const RootLayout = () => {
  useFonts({ FlyFlowerSongRegular, baigetianxingtiRegular });
  return (
    <GluestackUIProvider mode="light">
      <Provider store={RootState}>
        <PersistGate
          persistor={PersistedRootState}
          onBeforeLift={() => console.log("状态恢复中...")}
        >
          <App />
        </PersistGate>
      </Provider>
    </GluestackUIProvider>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(RootLayout);
