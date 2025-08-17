import { UnknownOutputParams, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect }                                                from "react";

type DynamicReturn<U, R> = R extends UnknownOutputParams ? U extends UnknownOutputParams ? Readonly<U> : Readonly<U> : Readonly<R>;

export const useGetRouteParam = <
  U extends UnknownOutputParams,
  R extends any = UnknownOutputParams
>(handleParams?: (params: U) => R): DynamicReturn<U, R> => {
  const params: U = useLocalSearchParams();
  const { setOptions } = useNavigation();
  useEffect(() => {
    if ("title" in params) {
      setOptions({ title: params.title });
    }
  }, [params, setOptions]);
  return (handleParams ? handleParams(params) : params) as DynamicReturn<U, R>;
};
