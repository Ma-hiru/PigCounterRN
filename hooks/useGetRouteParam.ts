import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";


export const useGetRouteParam = <U extends Record<string, any>, T = Omit<U, keyof U>>(handleParams?: (params: U) => T): Readonly<T> => {
  /** 更新标题 */
  const params: U = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    if ("title" in params) {
      navigation.setOptions({ title: params.title });
    }
  }, [navigation, params]);
  return (handleParams ? handleParams(params) : params) as Readonly<T>;
};
