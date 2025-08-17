import { FC } from "react";
import MyModal from "@/components/MyModal.tsx";
import { Image } from "antd";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";
import { handleServerURL } from "@/utils/handleServerURL.ts";

type props = {
  title: string;
  url: string;
  count: number;
  open: boolean;
  close: () => void;
};

const TaskUploadImgChecker: FC<props> = ({ open, close, title, count, url }) => {
  const [isDark] = useDarkModeReact();
  return (
    <>
      <MyModal
        open={open}
        title={title}
        onOk={() => {
          close();
        }}
        onCancel={() => {
          close();
        }}
      >
        <div className="flex flex-col space-y-4 mt-4 mb-4">
          <Image
            src={handleServerURL(url,"CountUploadImg")}
            alt={title}
            width="100%"
            style={{borderRadius: "0.5rem"}}
          />
          <div className="text-lg font-bold text-center" style={{ color: isDark ? "#fff" : "#000" }}>
            数量：{count}
          </div>
        </div>
      </MyModal>
    </>
  );
};
export default TaskUploadImgChecker;
