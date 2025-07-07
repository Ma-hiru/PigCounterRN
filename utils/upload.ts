import { baseUrl, RES_TIMEOUT, tokenPrefix } from "@/settings";
import { useUserZustandStore } from "@/stores/zustand/user";

export const upload = <T>(url: string, formData: FormData): Promise<T> => {
  if (!url.startsWith("http")) url = baseUrl + url;
  const { token } = useUserZustandStore.getState();
  const controller = new AbortController();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      controller.abort();
      reject("请求超时！");
    }, RES_TIMEOUT);
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": tokenPrefix + token
      },
      signal: controller.signal
    }).then(async (res) => {
      clearTimeout(timer);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }
      return res.json();
    }).then(resolve)
      .catch(reject);
  });
};
