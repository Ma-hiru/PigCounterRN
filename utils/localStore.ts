import { setItemAsync, getItemAsync } from "expo-secure-store";
import { Platform } from "react-native";
import CryptoJS from "crypto-js";
import { LOCAL_SECRET_KEY } from "@/settings";


class localStore {
  static async setItem(key: string, value: string): Promise<boolean> {
    try {
      if (Platform.OS === "web") {
        if (typeof window === "undefined") return false;
        window.localStorage.setItem(key, CryptoJS.AES.encrypt(value, LOCAL_SECRET_KEY).toString());
        return true;
      } else
        await setItemAsync(key, value);
      return true;
    } catch (error) {
      console.error(`"${key}"存储失败:`, error);
      return false;
    }
  }

  static async getItem(key: string): Promise<string> {
    try {
      if (Platform.OS === "web") {
        if (typeof window === "undefined") return "";
        const encrypted = window.localStorage.getItem(key) || "";
        return CryptoJS.AES.decrypt(encrypted, LOCAL_SECRET_KEY).toString(CryptoJS.enc.Utf8);
      } else
        return await getItemAsync(key) || "";
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        console.error("存储空间不足");
      }
      console.error(`"${key}"读取失败:`, error);
      return "";
    }
  }
}
export default localStore;

