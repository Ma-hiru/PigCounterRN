import { FC, memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { NewsList } from "@/types/news";
import { useImageLoadedScale } from "@/hooks/useImageScale";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import PressFeedback from "@/components/animate/PressFeedback";


type props = {
  news: NewsList[number];
}

const News: FC<props> = ({ news }) => {
  const CoverProps = useImageLoadedScale(news.cover);
  const router = useRouter();
  return (
    <>
      <PressFeedback className="w-full" onPress={goToPages(router, {
        pathname: "/NewsDetail",
        params: {
          id: news.id
        }
      }, "FN")}>
        {
          ({ pressed }) =>
            <View style={[pressed && styles.Shadow, { padding: 5 }]}>
              <Image {...CoverProps} />
              <Text style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 16
              }}>
                {news.title}
              </Text>
            </View>
        }
      </PressFeedback>
    </>
  );
};
export default memo(News);
const styles = StyleSheet.create({
  Shadow: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  }
});
