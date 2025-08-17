import { FC } from "react";
import { WebView } from "react-native-webview";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";

type props = object;
const Banner: FC<props> = () => {
  const { url } = useGetRouteParam<BannerRouteParams>();
  return (
    <>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </>
  );
};
export default Banner;
