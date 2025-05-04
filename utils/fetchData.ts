import { useToast } from "@/components/ui/toast";
import { curryFirst } from "@/utils/curryFirst";
import { Log } from "@/utils/logger";
import { showNewToast } from "@/utils/toast";
import { API } from "@/api";
import { useCallback, useMemo } from "react";
import { logout } from "@/utils/user";
import { usePages } from "@/hooks/usePages";


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
    if (res?.code === 401) {
      Log.Message(toast, "登录过期", "请重新登录！");
      return res.code;
    }
    if (res?.ok) {
      successFn && successFn(res, ShowMessage);
      return res.code;
    } else {
      failFn && failFn(res, ShowMessage);
      return res?.code || 201;
    }
  } catch (err) {
    Log.Echo({ err });
    Log.Message(toast, "请求失败", "请检查网络！");
  }
};

export const useFetchData = () => {
  //  toast 并不是不变的！！！
  const toast = useToast();
  const Pages = usePages();
  const Logout = useCallback(() => {
    logout();
    Pages.set("/Login", "MOVE");
  }, [Pages]);
  Log.Console("useFetchData");
  const fetchData = useCallback(async <T extends ResponseData<any>, P extends any[]>(
    reqFn: (...args: P) => Promise<T>,
    reqData: P,
    successFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
    failFn?: (res: T, createToast: RemoveFirstArg<typeof showNewToast>) => void,
    unauthorized?: (handleLogout: () => void) => void
  ) => {

    const curry = curryFirst(_fetchData, toast);
    const status = await curry(reqFn, reqData, successFn as any, failFn as any);
    if (status === 401) {
      if (unauthorized) {
        unauthorized(Logout);
      } else {
        Logout();
      }
    }
    return status;
    // eslint-disable-next-line
  }, [Logout]);

  return useMemo(() => ({ fetchData, API }), [fetchData]);
};
