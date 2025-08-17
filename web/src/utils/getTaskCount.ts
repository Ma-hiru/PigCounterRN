export const getTaskCount = (task: Task | null | undefined): {
  count: number,
  manualCount: number
} => {
  const pre = { count: 0, manualCount: 0 };

  if (task) return task.buildings.reduce((pre, cur) =>
      cur.pens.reduce((pre, pen) => {
        pre.count += (pen?.count <= 0 ? 0 : pen?.count) || 0;
        pre.manualCount += (pen?.manualCount <= 0 ? 0 : pen?.manualCount) || 0;
        return pre;
      }, pre)
    , pre);
  else return pre;
};
