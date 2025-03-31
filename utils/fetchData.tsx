import { ResponseData } from "@/types/api";
import { useToast } from "@/components/ui/toast";
import { RemoveFirstArg } from "@/types/utils";
import { curryFirst } from "@/utils/curryFirst";
import Logger from "@/utils/logger";
import { showNewToast } from "@/utils/toast";


export const fetchData = async <T extends ResponseData<any>, P>(
  reqFn: (data: P) => Promise<T>,
  reqData: P,
  successFn: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
  failFn: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
  toast: ReturnType<typeof useToast>
): Promise<void> => {
  const newShowNewToast = curryFirst(showNewToast, toast);
  try {
    const res = await reqFn(reqData);
    if (res?.ok) {
      successFn(res, newShowNewToast);
    } else {
      failFn(res, newShowNewToast);
    }
  } catch (err) {
    Logger("console", err);
    newShowNewToast("请求失败", "请检查网络！");
  }
};
