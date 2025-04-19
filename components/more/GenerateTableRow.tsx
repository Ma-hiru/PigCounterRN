import { TableRow } from "@/components/ui/table";
import Row from "@/components/more/Row";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { FC, memo } from "react";

type props = {
  task: Task;
  taskIndex: number;
}

const GenerateTableRow: FC<props> = ({ task, taskIndex }) => {
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
  return (
    <>
      {
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
