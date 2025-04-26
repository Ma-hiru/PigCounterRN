import { FC, useEffect, useMemo } from "react";
import { useAppSelector } from "@/stores";
import { newsSelector } from "@/stores/slice/newsSlice";
import { Log } from "@/utils/logger";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { StatusBar, Text, View, InteractionManager, ScrollView } from "react-native";
import BigHeader from "@/components/BigHeader";
import { Image } from "expo-image";
import { useMyState } from "@/hooks/useMyState";
import { News } from "@/types/news";
import { useImageLoadedScale } from "@/hooks/useImageScale";


type props = object;
type routeParam = {
  id: string;
}
const NewsDetail: FC<props> = () => {
  const { NewsList } = useAppSelector(newsSelector);
  const NewsId = useGetRouteParam<routeParam, number>((params) => {
    return Number(params.id);
  });
  const CurrentNews = useMyState<News>({
    content: "",
    cover: { uri: "" },
    id: NewsId,
    time: "",
    title: ""
  });
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      for (const news of NewsList.entries()) {
        if (news[1].id === NewsId) {
          CurrentNews.set(news[1]);
          Log.Console("CurrentNewsId", NewsId);
          return;
        }
      }
    });
    //eslint-disable-next-line
  }, [NewsId, NewsList]);
  const NewsTime = useMemo(() => {
    if (CurrentNews.get().time) {
      const num = Number(CurrentNews.get().time);
      if (Number.isNaN(num)) {
        return CurrentNews.get().time;
      } else {
        //TODO 优化时间格式
        return new Date(num).toLocaleString();
      }
    }
    return "";
  }, [CurrentNews]);
  const CoverProps = useImageLoadedScale(CurrentNews.get().cover);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1 bg-white">
        <BigHeader
          title={CurrentNews.get().title}
          info={
            <BigHeader.InfoText content={`{${NewsTime}}`} />
          }
          titleStyle={{
            fontSize: 25
          }}
          infoContainerStyle={{
            justifyContent: "flex-end",
            marginTop: 10
          }}
        >
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Image {...CoverProps} />
            <Text style={{ fontSize: 18, marginTop: 15 }} selectable={true}>
              {CurrentNews.get().content}
            </Text>
          </View>
        </BigHeader>
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default NewsDetail;
