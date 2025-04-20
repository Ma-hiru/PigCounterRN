import { validate } from "@/components/login/validate";
import MyBlueBtn from "@/components/MyBlueBtn";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import localStore from "@/utils/localStore";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { useImmer } from "use-immer";
import Feather from "@expo/vector-icons/Feather";
import { GlobalStyles } from "@/settings";

interface props {
  handleLogin: (loginInfo: loginInfo) => Promise<void>;
  loading: boolean;
}

const LoginPagesForm: FC<props> = ({ handleLogin, loading }) => {
  const [loginInfo, setLoginInfo] = useImmer<loginInfo>({ username: "", password: "" });
  const [isInvalid, setIsInvalid] = useImmer({
    username: false,
    password: false
  });
  const [focus, setFocus] = useImmer({
    usernameFocus: false,
    passwordFocus: false
  });
  const [remember, setRemember] = useState(false);
  const handleSubmit = async () => {
    const res = validate(loginInfo, setIsInvalid);
    if (!res) return;
    await handleLogin(loginInfo);
    await localStore.setItem("remember", String(remember));
  };
  return (
    <>
      <Text style={{ ...styles.Label }}>用户名</Text>
      <FormControl isInvalid={isInvalid.username} size="md" className="w-full mb-4">
        <Input size="xl" variant="underlined" className="border-solid"
               style={{ borderColor: focus.usernameFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}>
          <InputField
            placeholder="请输入用户名"
            returnKeyType="next"
            value={loginInfo.username}
            onChangeText={(text) => setLoginInfo(draft => {
              draft.username = text.trim();
            })}
            onFocus={() => {
              setFocus(draft => {
                draft.usernameFocus = true;
              });
            }}
            onBlur={() => {
              setFocus(draft => {
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
      <FormControl isInvalid={isInvalid.password} size="md" className="w-full mb-6">
        <Input size="xl" variant="underlined" className="border-solid"
               style={{ borderColor: focus.passwordFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}>
          <InputField
            type="password"
            placeholder="请输入密码"
            value={loginInfo.password}
            returnKeyType="done"
            onChangeText={(text) => setLoginInfo(draft => {
              draft.password = text.trim();
            })}
            onFocus={() => {
              setFocus(draft => {
                draft.passwordFocus = true;
              });
            }}
            onBlur={() => {
              setFocus(draft => {
                draft.passwordFocus = false;
              });
            }}
          />
          <Feather name="lock" style={{ marginRight: 5 }} size={16}/>
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>密码至少需要六位字符</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <View className={"flex flex-row justify-start items-center w-full mb-4"}>
        <Checkbox value={"true"} onChange={(key) => setRemember(key)}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>记住我</CheckboxLabel>
        </Checkbox>
      </View>
      <MyBlueBtn onPress={handleSubmit as any} className="w-full mb-4 mt-2">
        {loading ? "登录中..." : "登录"}
      </MyBlueBtn>
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
