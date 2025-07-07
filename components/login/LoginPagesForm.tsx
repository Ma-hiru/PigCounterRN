import { validate } from "@/components/login/validate";
import AppBtn from "@/components/AppBtn";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import localStore from "@/utils/localStore";
import React, { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import Feather from "@expo/vector-icons/Feather";
import { GlobalStyles } from "@/settings";
import { useMyState } from "@/hooks/useMyState";
import LoginPagesMoreBtn from "@/components/login/LoginPagesMoreBtn";

interface props {
  handleLogin: (loginInfo: loginInfo, remember: boolean) => Promise<void>;
  loading: boolean;
}

const LoginPagesForm: FC<props> = ({ handleLogin, loading }) => {
  const loginInfo = useMyState<loginInfo>({ username: "", password: "" });
  const hasChanged = useMyState(false);
  useEffect(() => {
    localStore.getItem("remember").then(async (data) => {
      if (data === "true") {
        remember.set(true);
        const username = await localStore.getItem("username");
        const password = await localStore.getItem("password");
        loginInfo.set(draft => {
          draft.username = username;
          draft.password = password;
        });
      }
    });
    //eslint-disable-next-line
  }, []);
  const isInvalid = useMyState({
    username: false,
    password: false
  });
  const focus = useMyState({
    usernameFocus: false,
    passwordFocus: false
  });
  const remember = useMyState(false);
  const handleSubmit = async () => {
    const res = validate(loginInfo.get(), isInvalid.set);
    if (!res) return;
    if (!hasChanged.get()) {
      //没有输入操作，但是通过验证，表明为Remember数据
      //TODO 指纹校验
    }
    await handleLogin(loginInfo.get(), remember.get());
  };
  return (
    <>
      <Text style={{ ...styles.Label }}>用户名</Text>
      <FormControl isInvalid={isInvalid.get().username} size="md" className="w-full mb-4">
        <Input size="xl" variant="underlined" className="border-solid"
               style={{ borderColor: focus.get().usernameFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}>
          <InputField
            placeholder="请输入用户名"
            returnKeyType="next"
            value={loginInfo.get().username}
            onChangeText={(text) => loginInfo.set(draft => {
              hasChanged.set(true);
              draft.username = text.trim();
            })}
            onFocus={() => {
              focus.set(draft => {
                draft.usernameFocus = true;
              });
            }}
            onBlur={() => {
              focus.set(draft => {
                draft.usernameFocus = false;
              });
            }}
          />
          <Feather name="user" style={{ marginRight: 5 }} size={16} />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Text style={{ ...styles.Label }}>密码</Text>
      <FormControl isInvalid={isInvalid.get().password} size="md" className="w-full mb-6">
        <Input size="xl" variant="underlined" className="border-solid"
               style={{ borderColor: focus.get().passwordFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}>
          <InputField
            type="password"
            placeholder="请输入密码"
            value={loginInfo.get().password}
            returnKeyType="done"
            onChangeText={(text) => loginInfo.set(draft => {
              hasChanged.set(true);
              draft.password = text.trim();
            })}
            onFocus={() => {
              focus.set(draft => {
                draft.passwordFocus = true;
              });
            }}
            onBlur={() => {
              focus.set(draft => {
                draft.passwordFocus = false;
              });
            }}
          />
          <Feather name="lock" style={{ marginRight: 5 }} size={16} />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>密码至少需要六位字符</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <View className={"flex flex-row justify-between items-center w-full mb-4"}>
        <Checkbox
          value={"true"}
          onChange={(key) => remember.set(key)}
          defaultIsChecked={remember.get()}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>记住我</CheckboxLabel>
        </Checkbox>
        <LoginPagesMoreBtn />
      </View>
      <AppBtn
        onPress={handleSubmit as any}
        className="mb-4 mt-2 m-auto"
        loading={loading}
      >
        登录
      </AppBtn>
    </>
  );
};
export default LoginPagesForm;
const styles = StyleSheet.create({
  Label: {
    textAlign: "left",
    width: "100%",
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  }
});
