import { FC } from "react";
import { WebView } from "react-native-webview";
import { WebViewSource } from "react-native-webview/lib/WebViewTypes";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";

type props = {
  source: WebViewSource;
};
type routeParam = {
  url: string;
  title: string;
}
const Banner: FC<props> = ({ source }) => {
  const { url } = useGetRouteParam<routeParam>();
  return (
    <>
      <WebView source={source || { uri: url }} style={{ flex: 1 }} />
    </>
  );
};
export default Banner;
