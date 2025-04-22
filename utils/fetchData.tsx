import { useToast } from "@/components/ui/toast";
import { curryFirst } from "@/utils/curryFirst";
import { Log } from "@/utils/logger";
import { showNewToast } from "@/utils/toast";
import { API } from "@/api";
import { useCallback, useMemo } from "react";


const _fetchData = async <T extends ResponseData<any>, P extends any[]>(
  toast: ReturnType<typeof useToast>,
  reqFn: (...args: P) => Promise<T>,
  reqData: P,
  successFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
  failFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void
) => {
  const ShowMessage = curryFirst(Log.Message, toast);
  try {
    const res = await reqFn(...reqData);
    if (res?.ok) {
      successFn && successFn(res, ShowMessage);
    } else {
      failFn && failFn(res, ShowMessage);
    }
  } catch (err) {
    Log.Echo({ err });
    Log.Message(toast, "请求失败", "请检查网络！");
  }
};

export const useFetchData = () => {
  const toast = useToast();
  const fetchData = useCallback(async <T extends ResponseData<any>, P extends any[]>(
    reqFn: (...args: P) => Promise<T>,
    reqData: P,
    successFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
    failFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void
  ) => {
    const curry = curryFirst(_fetchData, toast);
    await curry(reqFn, reqData, successFn as any, failFn as any);
  }, [toast]);
  return useMemo(() => ({ fetchData, API }), [fetchData]);
};
