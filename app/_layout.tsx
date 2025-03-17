import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import RootState from "@/stores";
import { StrictMode } from "react";
import App from "@/app/App";

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
