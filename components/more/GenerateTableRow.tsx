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
  taskIndex: number;
  total: MyState<{ countNum: number; pensNum: number }>
}

const GenerateTableRow: FC<props> = ({ task, taskIndex, total }) => {
  const router = useRouter();
  const gotoEdit = (buildingIndex: number, penIndex: number, building: Building, pen: Pen) => {
    return () => {
      goToPages(router, {
          pathname: "/UploadFiles",
          params: {
            title: `楼栋${building.buildingId} · 栏舍${pen.penId}`,
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
    if (!validation) return [countNum, pensNum];
    task.buildings.forEach((building) => {
      building.pens.forEach((pen) => {
        if (pen.penNum > DEFAULT_UPLOAD_RES) countNum += pen.peopleNum || pen.penNum;
        pensNum++;
      });
    });
    return [countNum, pensNum];
  }, [task.buildings, validation]);
  useEffect(() => {
    total.set((draft) => {
      draft.pensNum = pensNum;
      draft.countNum = countNum;
    });
    // eslint-disable-next-line
  }, [countNum, pensNum]);
  return (
    <>
      {
        validation &&
        task.buildings.map((building, buildingIndex) =>
          building.pens.map((pen, penIndex) => <TableRow
              key={`${taskIndex}-${buildingIndex}-${penIndex}`}>
              <Row buildingName={String(buildingIndex)}
                   penName={String(penIndex)}
                   res={pen.peopleNum || pen.penNum}
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
