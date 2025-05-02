import { useEffect } from "react";
import { PersistedRootState } from "@/stores";
import { Log } from "@/utils/logger";

export const useRefreshPersisted = (once: boolean = true) => {
  // eslint-disable-next-line
  if (once) useEffect(() => {
    PersistedRootState.flush().then(() => {
      Log.Console("持久化刷新");
    });
    // eslint-disable-next-line
  }); else useEffect(() => {
    PersistedRootState.flush().then(() => {
      Log.Console("持久化刷新");
    });
  }, []);
};
export const useDeletePersisted = (once: boolean = true) => {
  // eslint-disable-next-line
  if (once) useEffect(() => {
    PersistedRootState.purge().then(() => {
      Log.Console("持久化清除");
    });
    // eslint-disable-next-line
  }); else useEffect(() => {
    PersistedRootState.purge().then(() => {
      Log.Console("持久化清除");
    });
  }, []);
};
