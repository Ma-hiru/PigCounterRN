import { Alert, ToastAndroid } from "react-native";
import * as dayjs from "dayjs";

const Logger = (Mode: "console" | "alert", ...data: any[]) => {
  switch (Mode) {
    case "console":
      console.log(`\x1B[31m${dayjs.default(new Date()).format("YY-MM-DD hh:mm:ss").toString()}\x1B[0m`);
      return console.log(...data);
    case "alert":
      return Alert.alert("TS-Log", data.toString());
  }
};
const Console = (...data: any[]) => {
  return console.log(`\x1B[31m${dayjs.default(new Date()).format("YY-MM-DD hh:mm:ss").toString()}\x1B[0m`, ...data);
};
const Echo = (data: object) => {
  for (const key in data) {
    Console(key, data[key as keyof typeof data]);
  }
};
const Message = () => {
};
const AlertMessage = (title: string = "TS-Log", ...data: any[]) => {
  return Alert.alert(title, data.toString());
};
const Toast = (msg: string, duration: string, gravity: string, x: number, y: number) => {
  ToastAndroid.showWithGravityAndOffset(msg
    , ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100);
};
export default Logger;
