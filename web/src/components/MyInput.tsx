import { FC, useState } from "react";
import { Input, ConfigProvider } from "antd";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";
import { createAntdTheme } from "@/utils/createAntdTheme.ts";

type InputProps = typeof Input extends FC<infer P> ? P : never;
const TextColor = "#666";
const ActiveTextColor = "#000";
const MyInput: FC<InputProps> = (props) => {
  const [isDark] = useDarkModeReact();
  const [color, setTextColor] = useState(TextColor);
  const newProps: typeof props = { ...props };
  if (isDark) {
    newProps.onFocus = (e) => {
      props.onFocus && props.onFocus(e);
      setTextColor(ActiveTextColor);
    };
    newProps.onBlur = (e) => {
      props.onBlur && props.onBlur(e);
      setTextColor(TextColor);
    };
    newProps.style = { color, ...(props.style || {}) };
  }
  return <ConfigProvider theme={Theme.InputPlaceholder}>
    <Input{...newProps} variant="filled" />
  </ConfigProvider>;
};
export default MyInput;
const Theme = createAntdTheme({
  InputPlaceholder: {
    Input: {
      colorTextPlaceholder: "#666"
    }
  }
});
