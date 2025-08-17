import { FC } from "react";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";

type props = {
  notice: Notice;
  click: (index: number) => void;
  index: number;
};
const getPrefixText = (notice: Notice | null) => {
  if (notice) {
    switch (notice.type) {
      case "系统":
        return [notice.type, "var(--notice-noticeList-title-prefix-bg-system)"];
      case "组织":
        return [notice.type, "var(--notice-noticeList-title-prefix-bg-company)"];
    }
  }
  return ["无效", "var(--notice-noticeList-title-prefix-bg-error)"];
};
const Prefix: FC<{ notice: Notice | null }> = ({ notice }) => {
  const [text, bgColor] = getPrefixText(notice);
  return (
    <span className="notice-title-prefix" style={{
      background: bgColor,
      color: "var(--notice-noticeList-title-prefix-color)"
    }}>
      {text}
    </span>
  );
};
const NoticeItem: FC<props> = ({ notice, click }) => {
  const [isDark] = useDarkModeReact();
  return (
    <>
      <div className={isDark ? "notice-card btn btn-outline" : "notice-card btn"} onClick={() => {
        click(notice.id);
      }}>
        <div className="notice-item">
          <div className="notice-title">
            <Prefix notice={notice} />
            <span className="notice-title-left" />
            <div className="notice-title-right">
              <span>{notice.time}</span>
            </div>
          </div>
          <div className="notice-content flex flex-row justify-between items-center mt-1">
            <span>{notice.content}</span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};
export default NoticeItem;
