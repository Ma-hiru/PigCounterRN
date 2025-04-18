import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import RootState, { PersistedRootState } from "@/stores";
import { memo, useEffect } from "react";
import App from "@/app/App";
import { PersistGate } from "redux-persist/integration/react";
import logger from "@/utils/logger";

const RootLayout = () => {
  // useEffect(() => {
  //   PersistedRootState.purge().then(() => {
  //     console.log("初始清除持久化成功");
  //   });
  // });
  logger("console","App Start.")
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
