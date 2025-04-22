import { Alert, ToastAndroid } from "react-native";
import dayjs from "dayjs";
import { showNewToast } from "@/utils/toast";

let IsPause = false;

const Console = (...data: any[]) => {
  if (IsPause) return;
  return console.log(`\x1B[31m${dayjs(new Date()).format("YY-MM-DD hh:mm:ss").toString()}\x1B[0m`, ...data);
};
const Echo = (data: object) => {
  if (IsPause) return;
  for (const key in data) {
    Console(key, data[key as keyof typeof data]);
  }
};
const AlertMessage = (title: string = "TS-Log", ...data: any[]) => {
  if (IsPause) return;
  return Alert.alert(title, data.toString());
};
const Toast = (msg: string, duration: "SHORT" | "LONG", gravity: "BOTTOM" | "CENTER" | "TOP") => {
  if (IsPause) return;
  if (!ToastAndroid) Echo({ Tips: "ToastAndroid不支持" });
  return ToastAndroid.showWithGravity(msg
    , ToastAndroid[duration], ToastAndroid[gravity]);
};

export const OnPauseLog = <T extends keyof typeof Log>(log: T, params: Parameters<(typeof Log)[T]>) => {
  IsPause = false;
  const fn = Log[log];
  // @ts-ignore
  fn(...params);
  IsPause = true;
};
export const LoggerPause = () => {
  IsPause = true;
};
export const Log = {
  Console,
  Echo,
  Message: showNewToast,
  AlertMessage,
  Toast
};
