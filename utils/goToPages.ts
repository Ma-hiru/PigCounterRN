import { useRouter } from "expo-router";

type Mode = "FN" | "MOVE";
type IfReturnFn<T, U extends Mode> = T extends U ? () => void : void;
export const goToPages =
  <T extends Mode>(
    router: ReturnType<typeof useRouter>,
    path: Parameters<ReturnType<typeof useRouter>["push"]>[0],
    mode: T
  ): IfReturnFn<T, "FN"> => {
    switch (mode) {
      case "FN":
        return (() => router.push(path)) as IfReturnFn<T, "FN">;
      case "MOVE":
        return router.push(path) as IfReturnFn<T, "FN">;
    }
  };
