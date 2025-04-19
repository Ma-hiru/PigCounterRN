import { baseUrl, tokenPrefix } from "@/settings";
import RootState from "@/stores";

export const upload = <T>(url: string, formData: FormData):Promise<T> => {
  if (!url.startsWith("http")) url = baseUrl + url;
  const { token } = RootState.getState().userStore;
  return new Promise((resolve, reject) => {
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
    });
  });
};
