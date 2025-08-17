import { FC, ReactNode } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import { createAntdTheme } from "@/utils/createAntdTheme.ts";

type props = {
  open: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

const MyModal: FC<props> = ({ open, title, onCancel, onOk, children }) => {
  return (
    <>
      <ConfigProvider theme={themes.MyModal}>
        <Modal
          open={open}
          closable={false}
          title={title}
          onCancel={onCancel}
          footer={
            <>
              <ConfigProvider theme={themes.CancelBtn}>
                <Button type="text" color="default" onClick={onCancel}>取消</Button>
              </ConfigProvider>
              <ConfigProvider theme={themes.ConfirmBtn}>
                <Button color="default" type="default" onClick={onOk}>确认</Button>
              </ConfigProvider>
            </>
          }
          style={{ backdropFilter: "var(--antd-modal-content-backdrop-filter)" }}
        >
          {children}
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default MyModal;

const themes = createAntdTheme({
  MyModal: {
    Modal: {
      contentBg: "var(--antd-modal-content-bg)",
      headerBg: "var(--antd-modal-header-bg)",
      titleColor: "var(--antd-modal-title-color)",
      footerBg: "var(--antd-modal-footer-bg)"
    },
  },
  CancelBtn: {
    Button: {
      textTextColor: "var(--antd-modal-cancel-textColor)"
    }
  },
  ConfirmBtn: {
    Button: {
      defaultBg: "var(--antd-modal-Confirm-defaultBg)",
      defaultColor: "var(--antd-modal-Confirm-defaultColor)",
      defaultActiveBg: "var(--antd-modal-Confirm-defaultActiveBg)",
      defaultActiveColor: "var(--antd-modal-Confirm-defaultActiveColor)",
      defaultHoverBg: "var(--antd-modal-Confirm-defaultHoverBg)",
      defaultHoverColor: "var(--antd-modal-Confirm-defaultHoverColor)",
      defaultBorderColor: "var(--antd-modal-Confirm-defaultBorderColor)"
    }
  }
} as const);
