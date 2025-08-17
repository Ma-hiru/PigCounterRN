import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Log } from "@/utils/logger";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { StatusBar, Text, View, InteractionManager, ScrollView, Pressable } from "react-native";
import BigHeader from "@/components/BigHeader";
import { News } from "@/types/news";
import { useNewsZustandStore } from "@/stores/zustand/news";
import { useShallow } from "zustand/react/shallow";
import { useImmer } from "use-immer";
import ScaledImage from "@/components/ScaledImage";


type props = object;
type routeParam = {
  id: string;
}
const NewsDetail: FC<props> = () => {
  const { NewsList } = useNewsZustandStore(
    useShallow(state => ({
      NewsList: state.NewsList
    }))
  );
  const NewsId = useGetRouteParam<routeParam, number>((params) => {
    return Number(params.id);
  });
  const [currentNews, setCurrentNews] = useImmer<News>({
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
          setCurrentNews(news[1]);
          Log.Console("CurrentNewsId", NewsId);
          return;
        }
      }
    });
  }, [NewsId, NewsList, setCurrentNews]);
  const NewsTime = useMemo(() => {
    if (currentNews.time) {
      const num = Number(currentNews.time);
      if (Number.isNaN(num)) {
        return currentNews.time;
      } else {
        //TODO 优化时间格式
        return new Date(num).toLocaleString();
      }
    }
    return "";
  }, [currentNews.time]);

  const [previewCover, setPreviewCover] = useState(false);
  const preview = useCallback(() => {
    setPreviewCover(!previewCover);
  }, [previewCover]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1 bg-white">
        <BigHeader
          title={currentNews.title}
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
            <Pressable onPress={preview}>
              <ScaledImage
                source={currentNews.cover}
                style={{ width: "100%" }}
                contentFit="contain"
                canPreview={true}
                onCancelPreview={preview}
                preview={previewCover}
              />
            </Pressable>
            <Text style={{ fontSize: 18, marginTop: 15 }} selectable={true}>
              {currentNews.content}
            </Text>
          </View>
        </BigHeader>
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default NewsDetail;
