import { FC, memo } from "react";
import MyPagesCard from "@/components/my/MyPagesCard";
import News from "@/components/home/News";
import { useNewsZustandStore } from "@/stores/zustand/news";
import { useShallow } from "zustand/react/shallow";

const OptionsNews: FC<object> = () => {
  const { NewsList } = useNewsZustandStore(
    useShallow(state => ({
      NewsList: state.NewsList
    }))
  );
  return (
    <>
      {/*新闻*/}
      <MyPagesCard cardStyle={{ marginBottom: 15 }} title={"每日一闻"}>
        {NewsList.map((news) => <News news={news} key={news.id} />)}
      </MyPagesCard>
    </>
  );
};

export default memo(OptionsNews);
