export const log = <T>(
  config: ZustandConfig<T>,
  options: {
    before?: boolean;
    after?: boolean;
  } = {
    before: true,
    after: true
  }
): ZustandConfig<T> => {
  return (set, get, api) => {
    const newSet: ZustandSet<T> = (updater) => {
      if (options?.before) {
        console.log("Old state:", get(), api);
      }
      const res = set(updater);
      if (options?.after) {
        console.log("New state:", get(), api);
      }
      return res;
    };
    return config(newSet, get, api);
  };
};
