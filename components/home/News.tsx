import { FC, memo } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { NewsList } from "@/types/news";
import { useImageLoadedScale } from "@/hooks/useImageScale";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";


type props = {
  news: NewsList[number];
}

const News: FC<props> = ({ news }) => {
  const CoverProps = useImageLoadedScale(news.cover);
  const router = useRouter();
  return (
    <>
      <Pressable className="w-full" onPress={goToPages(router, {
        pathname: "/NewsDetail",
        params: {
          id: news.id
        }
      }, "FN")}>
        <Image {...CoverProps} />
        <Text style={{
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 16
        }}>
          {news.title}
        </Text>
      </Pressable>
    </>
  );
};
export default memo(News);
