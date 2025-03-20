import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import RootState, { PersistedRootState } from "@/stores";
import { StrictMode } from "react";
import App from "@/app/App";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <StrictMode>
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
    </StrictMode>
  );
}
