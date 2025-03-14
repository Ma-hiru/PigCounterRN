import "@/utils/polyfills";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import RootState from "@/stores";
import { StrictMode } from "react";
import App from "@/app/App";
import TopSafeArea from "@/components/TopSafeArea";


if (typeof global.FinalizationRegistry === "undefined") {
  (global.FinalizationRegistry as any) = class FinalizationRegistry {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
    }

    register() {
    }

    unregister() {
    }
  };
}
export default function RootLayout() {
  return (
    <StrictMode>
      <GluestackUIProvider mode="light">
        <Provider store={RootState}>
          <App />
        </Provider>
      </GluestackUIProvider>
    </StrictMode>
  );
}
