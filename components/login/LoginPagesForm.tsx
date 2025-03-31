import MyBlueBtn from "@/components/MyBlueBtn";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { FC, useState } from "react";
import { flushSync } from "react-dom";

interface props {
  handleLogin: (username: string, password: string) => void;
  loading: boolean;
}

const LoginPagesForm: FC<props> = ({ handleLogin, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const handleSubmit = () => {
    if (password.length < 4) return setIsInvalidPassword(true);
    else flushSync(() => {
      setIsInvalidPassword(false);
    });
    if (username.length < 4) return setIsInvalidUsername(true);
    else flushSync(() => {
      setIsInvalidUsername(false);
    });
    handleLogin(username, password);
  };
  return (
    <>
      <FormControl isInvalid={isInvalidUsername} size="md" className="w-full mb-4">
        <Input variant="outline" size="lg">
          <InputField
            placeholder="请输入用户名"
            returnKeyType="next"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>用户名至少需要四位字符</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={isInvalidPassword} size="md" className="w-full mb-6">
        <Input size="lg">
          <InputField
            type="password"
            placeholder="请输入密码"
            value={password}
            returnKeyType="done"
            onChangeText={(text) => setPassword(text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>密码至少需要六位字符</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <MyBlueBtn onPress={handleSubmit as any} className="w-full mb-4">
        {loading ? "登录中..." : "登录"}
      </MyBlueBtn>
    </>
  );
};
export default LoginPagesForm;
