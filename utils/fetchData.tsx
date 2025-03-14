import { ResponseData } from "@/types/api";
import { useToast } from "@/components/ui/toast";
import { showNewToast } from "@/utils/toast";


export const fetchData =
  async <T extends ResponseData<any>, P>(reqFn: (data: P) => Promise<T>, reqData: P, successFn: (res: T) => void, failFn: (res: T, createToast: typeof showNewToast) => void, toast: ReturnType<typeof useToast>) => {
    try {
      const res = await reqFn(reqData);
      if (res?.ok) {
        successFn(res);
      } else {
        failFn(res, showNewToast);
      }
    } catch (err) {
      console.log(err);
      showNewToast(toast, "请求失败", "请检查网络！");
    }
  };
