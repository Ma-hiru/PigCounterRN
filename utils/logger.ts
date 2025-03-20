import { Alert } from "react-native";
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

export default Logger;
