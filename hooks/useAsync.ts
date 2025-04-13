import { useCallback, useEffect, useState } from "react";

type ReturnType<R, P extends any[]> = [data: R | undefined, loading: boolean, err: any, exec: (...args: P) => Promise<R | undefined>]
export const useAsync = <P extends any[], R>(
  AsyncFunction: (...args: P) => Promise<R>,
  immediate: boolean,
  ...args: P
): ReturnType<R, P> => {
  const [data, setData] = useState<R>();
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<any>(null);
  const exec = useCallback(async (...args: P) => {
    try {
      setLoading(true);
      const res = await AsyncFunction(...args);
      setData(res);
      return res;
    } catch (err: any) {
      setErr(err);
    } finally {
      setLoading(false);
    }
  }, [AsyncFunction]);
  useEffect(() => {
    if (immediate) exec(...args);
  }, [args, exec, immediate]);
  return [data, loading, err, exec];
};
