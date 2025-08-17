import { FC } from "react";
import NoticeItem from "@/components/Notice/NoticeItem.tsx";
import "./NoticeList.scss";

type props = {
  list: Notice[],
  change: (index: number) => void
};

const NoticeList: FC<props> = ({ list, change }) => {
  return (
    <>
      <div id="NoticeList">
        {
          list.map(
            (notice, index) => <NoticeItem notice={notice} click={change} index={index} key={index}/>
          )
        }
        {
          list.map(
            (notice, index) => <NoticeItem notice={notice} click={change} index={index} key={index}/>
          )
        }
        {
          list.map(
            (notice, index) => <NoticeItem notice={notice} click={change} index={index} key={index}/>
          )
        }
        {
          list.map(
            (notice, index) => <NoticeItem notice={notice} click={change} index={index} key={index} />
          )
        }
      </div>
    </>
  );
};
export default NoticeList;
