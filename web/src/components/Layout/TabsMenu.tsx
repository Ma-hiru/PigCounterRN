import { FC, memo, useEffect } from "react";
import {
  AlertOutlined,
  HomeOutlined,
  NotificationOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Menu, ConfigProvider, type MenuProps } from "antd";
import { createAntdTheme } from "@/utils/createAntdTheme.ts";
import { useMyState } from "@/hooks/useMyState.ts";


interface props {
  currentRoute: string;
  setRoute: (path: string) => void;
}


type MenuItem = Required<MenuProps>["items"][number];
const items = [
  {
    label: "任务",
    key: "/task",
    icon: <AlertOutlined />
  },
  {
    label: "员工",
    key: "/company/employee",
    icon: <TeamOutlined />
  },
  {
    label: "组织",
    key: "/company/info",
    icon: <HomeOutlined />
  },
  {
    label: "公告",
    key: "/notice",
    icon: <NotificationOutlined />
  }
]satisfies MenuItem[];

export const TabsMenu: FC<props> = ({ currentRoute, setRoute }) => {
  const current = useMyState(currentRoute);
  useEffect(() => {
    setRoute(current.get());
  }, [current, setRoute]);

  return (
    <>
      <ConfigProvider theme={styles.TabsMenu}>
        <Menu
          onClick={({ key }) => current.set(key)}
          selectedKeys={[current.get()]}
          mode="horizontal"
          items={items}
          className="select-none"
        />
      </ConfigProvider>
    </>
  );
};
export default memo(TabsMenu);
const styles = createAntdTheme({
  TabsMenu: {
    Menu: {
      colorBgContainer: "transparent",
      colorText: "var(--layout-bar-color)",
      horizontalLineHeight: "var(--layout-bar-height)",
      horizontalItemSelectedColor: "var(--layout-bar-menu-active-color)"
    }
  }
});
