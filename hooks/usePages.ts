import { useRouter } from "expo-router";
import { goToPages } from "@/utils/goToPages";
import { curryFirst } from "@/utils/curryFirst";
import { useMemo } from "react";

type router = ReturnType<typeof useRouter> & { set: RemoveFirstArg<typeof goToPages> }
export const usePages = (): router => {
  const router = useRouter();
  return useMemo(() => ({
    set: curryFirst(goToPages, router),
    ...router
  }), [router]);
};
