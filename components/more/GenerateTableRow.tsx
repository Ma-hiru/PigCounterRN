import { TableRow } from "@/components/ui/table";
import Row from "@/components/more/Row";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { FC, memo, useEffect, useMemo } from "react";
import { useValidateTask } from "@/utils/validateTask";
import { MyState } from "@/hooks/useMyState";
import { DEFAULT_UPLOAD_RES } from "@/settings";

type props = {
  task: Task;
  isHistory?: boolean;
  taskIndex: number;
  restTotal?: { countNum: number, pensNum: number }[];
  total?: MyState<{ countNum: number; pensNum: number }>
}

const GenerateTableRow: FC<props> = ({ task, taskIndex, total, isHistory, restTotal }) => {
  const router = useRouter();
  const gotoEdit = (buildingIndex: number, penIndex: number, building: Building, pen: Pen) => {
    return () => {
      goToPages(router, {
          pathname: "/UploadFiles",
          params: {
            title: `${building.buildingName} · ${pen.penName}`,
            taskIndex: [taskIndex, buildingIndex, penIndex],
            penId: pen.penId
          }
        },
        "MOVE");
    };
  };
  const { validation } = useValidateTask(task);
  const [countNum, pensNum] = useMemo(() => {
    let countNum = 0;
    let pensNum = 0;
    if (!validation && !isHistory) return [countNum, pensNum];
    task.buildings.forEach((building) => {
      building.pens.forEach((pen) => {
        if (pen.count > DEFAULT_UPLOAD_RES) countNum += pen.manualCount || pen.count;
        pensNum++;
      });
    });
    return [countNum, pensNum];
  }, [isHistory, task.buildings, validation]);
  useEffect(() => {
    if (isHistory) {
      restTotal && (restTotal[taskIndex] = { pensNum, countNum });
    } else {
      total?.set((draft) => {
        draft.pensNum = pensNum;
        draft.countNum = countNum;
      });
    }
    // eslint-disable-next-line
  }, [countNum, isHistory, pensNum, restTotal, taskIndex]);
  return (
    <>
      {
        (validation || isHistory) &&
        task.buildings.map((building, buildingIndex) =>
          building.pens.map((pen, penIndex) => <TableRow
              key={`${taskIndex}-${buildingIndex}-${penIndex}`}>
              <Row buildingName={String(buildingIndex)}
                   penName={String(penIndex)}
                   res={pen.manualCount || pen.count}
                   isHistory={isHistory}
                   key={`${taskIndex}-${buildingIndex}-${penIndex}`}
                   gotoEdit={gotoEdit(buildingIndex, penIndex, building, pen)}
              />
            </TableRow>
          )
        )
      }
    </>
  );
};
export default memo(GenerateTableRow);
