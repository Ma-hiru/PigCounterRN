import { FC, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NewsList } from "@/types/news";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import PressFeedback from "@/components/animate/PressFeedback";
import ScaledImage from "@/components/ScaledImage";

type props = {
  news: NewsList[number];
}

const News: FC<props> = ({ news }) => {
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
              <ScaledImage source={news.cover} />
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
