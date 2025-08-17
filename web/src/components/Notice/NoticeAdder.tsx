import { FC } from "react";
import MyModal from "@/components/MyModal.tsx";
import { ConfigProvider, Input } from "antd";
import { useReactive } from "ahooks";
import { createAntdTheme } from "@/utils/createAntdTheme.ts";

type props = {
  open: boolean;
  close: () => void;
  refresh: () => void;
  companyId: number;
};

const NoticeAdder: FC<props> = ({ open, close, refresh, companyId }) => {
  const inputInfo = useReactive({
    companyId,
    content: ""
  });
  const submit = () => {
    close();
    refresh();
    inputInfo.content = "";
  };
  return (
    <>
      <MyModal
        open={open}
        title="增加通知"
        onCancel={close}
        onOk={submit}
      >
        <div className="mt-4 mb-4">
          <ConfigProvider theme={Theme.TextareaPlaceholder}>
            <Input.TextArea
              variant={"filled"}
              autoSize={{ minRows: 6, maxRows: 15 }}
              placeholder="请输入通知内容"
              value={inputInfo.content}
              onChange={(e) => {
                inputInfo.content = e.target.value;
              }}
            />
          </ConfigProvider>
        </div>
      </MyModal>
    </>
  );
};
export default NoticeAdder;
const Theme = createAntdTheme({
  TextareaPlaceholder: {
    Input: {
      colorTextPlaceholder: "#666",
    }
  }
});
