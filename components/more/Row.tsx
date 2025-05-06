import { TableData } from "@/components/ui/table";
import { DEFAULT_UPLOAD_RES, GlobalStyles } from "@/settings";
import { FC, memo, useMemo } from "react";
import { Text } from "react-native";

type props = {
  buildingName: string;
  penName: string;
  res: number;
  gotoEdit?: () => void;
  isHistory?: boolean;
}

const Row: FC<props> = ({ buildingName, penName, res, gotoEdit, isHistory }) => {
  buildingName = useMemo(() => {
    const num = Number(buildingName);
    if (!Number.isNaN(num)) {
      return "楼栋" + buildingName;
    } else {
      return buildingName;
    }
  }, [buildingName]);
  penName = useMemo(() => {
    const num = Number(penName);
    if (!Number.isNaN(num)) {
      return "栏舍" + penName;
    } else {
      return penName;
    }
  }, [penName]);
  const count = useMemo(() => {
    switch (res) {
      case DEFAULT_UPLOAD_RES:
        return <Text className="font-bold" style={{ color: GlobalStyles.ErrorColor }}
                     onPress={() => {
                       if (!isHistory) gotoEdit && gotoEdit();
                     }}>
          暂未清点
        </Text>;
      default:
        return <Text className="font-bold" onPress={gotoEdit}
                     style={{ color: GlobalStyles.ThemeColor }}>{res}</Text>;
    }
  }, [gotoEdit, res]);

  return (
    <>
      <TableData {...PositionStyle}>
        <Text className="font-bold">{buildingName}</Text>
      </TableData>
      <TableData {...PositionStyle}>
        <Text className="font-bold">{penName}</Text>
      </TableData>
      <TableData {...PositionStyle}>
        {count}
      </TableData>
    </>
  );
};
export default memo(Row);
const PositionStyle = {
  useRNView: true,
  className: "flex-row justify-center"
};
