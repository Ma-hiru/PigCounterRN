export const curryFirst = <T extends (...args: any[]) => any>(
  fn: T,
  firstArg: FirstParams<T>
) => {
  return (...restArgs: RestParams<T>) => fn(firstArg, ...restArgs);
};
