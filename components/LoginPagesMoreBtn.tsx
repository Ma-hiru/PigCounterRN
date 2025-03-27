import { AddIcon, Icon, LockIcon } from "@/components/ui/icon";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "./ui/menu";
import { ButtonText, Button } from "./ui/button";

interface props {
  /* empty */
}

const LoginPagesMoreBtn: FC<props> = () => {
  const router = useRouter();
  return (
    <>
      <Menu
        placement="left top"
        offset={20}
        crossOffset={10}
        trigger={({ ...triggerProps }) => {
          return <View className="flex flex-row w-full justify-end">
            <Button {...triggerProps} variant="link" size="md" className="p-0">
              <ButtonText>更多选项</ButtonText>
            </Button>
          </View>;
        }}
      >
        <MenuItem
          key="Add account"
          textValue="Add account"
          onPress={
            goToPages(router, "/Registry", "FN")
          }
        >
          <Icon as={AddIcon} size="sm" className="mr-2" />
          <MenuItemLabel size="sm">注册用户</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          key="Forget password"
          textValue="Forget password"
          onPress={
            goToPages(router, "/ForgetPassword", "FN")
          }
        >
          <Icon as={LockIcon} size="sm" className="mr-2" />
          <MenuItemLabel size="sm">忘记密码</MenuItemLabel>
        </MenuItem>
      </Menu>
    </>
  );
};
export default LoginPagesMoreBtn;
