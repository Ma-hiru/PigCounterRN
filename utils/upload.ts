import { baseUrl, RES_TIMEOUT, tokenPrefix } from "@/settings";
import RootState from "@/stores";

export const upload = <T>(url: string, formData: FormData): Promise<T> => {
  if (!url.startsWith("http")) url = baseUrl + url;
  const { token } = RootState.getState().userStore;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("请求超时！");
    }, RES_TIMEOUT);
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": tokenPrefix + token
      }
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      } else {
        reject(res.json());
      }
    }).catch((err) => {
      reject(err);
    }).finally(() => {
      clearTimeout(timer);
    });
  });
};
