import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import CryptoJS from "crypto-js";

const SECRET_KEY = "Mahiru";
const localStore = {
  async setItem(key: string, value: string): Promise<boolean> {
    try {
      if (Platform.OS === "web") {
        if (typeof window === "undefined") return false;
        console.log("test");
        window.localStorage.setItem(key, CryptoJS.AES.encrypt(value, SECRET_KEY).toString());
        return true;
      } else
        await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      console.error(`"${key}"存储失败:`, error);
      return false;
    }
  },
  async getItem(key: string): Promise<string> {
    try {
      if (Platform.OS === "web") {
        if (typeof window === "undefined") return "";
        const encrypted = window.localStorage.getItem(key) || "";
        return CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      } else
        return await SecureStore.getItemAsync(key) || "";
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        console.error("存储空间不足");
      }
      console.error(`"${key}"读取失败:`, error);
      return "";
    }
  }
};
export default localStore;

