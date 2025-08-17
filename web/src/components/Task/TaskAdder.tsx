import { FC, ReactNode, useEffect } from "react";
import MyModal from "@/components/MyModal.tsx";
import { useReactive } from "ahooks";
import { DatePicker, Input, Select, Cascader, type CascaderProps } from "antd";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";
import { useFetchDataReact } from "@/hooks/useFetchData.ts";
import Logger from "@/utils/logger.ts";

type props = {
  open: boolean;
  close: () => void;
  fresh: () => void;
  id: number;
};

const TaskAdder: FC<props> = ({ open, close, fresh, id }) => {
  const newTask = useReactive<NewTask>({
    buildings: [],
    taskName: "",
    employeeId: 0,
    endTime: "",
    startTime: ""
  });
  const { fetchData, API } = useFetchDataReact();

  interface SelectOption {
    value: string | number;
    label: string | ReactNode;
    children?: SelectOption[];
  }

  const selectInfo = useReactive({
    building: [] as CascaderProps["options"],
    employee: [] as SelectOption[]
  });
  useEffect(() => {
    fetchData(
      API.reqGetBuildingsAndPens,
      [id],
      (res) => {
        selectInfo.building = res.data.buildings?.reduce((pre, cur) => {
          pre!.push({
            value: cur.id,
            label: cur.name,
            children: cur.pens.reduce((pre, cur) => {
              pre!.push({
                value: cur.id,
                label: cur.name
              });
              return pre;
            }, [] as CascaderProps["options"])
          });
          return pre;
        }, [] as CascaderProps["options"]);
      },
      (res) => {
        Logger.Message.Error(res.message || "楼栋信息请求错误！");
      }
    ).then();
    fetchData(
      API.reqGetEmployee,
      [1, 10000, id],
      (res) => {
        selectInfo.employee = res.data.list.reduce((pre, cur) => {
          pre.push({
            value: cur.id,
            label: cur.name
          });
          return pre;
        }, [] as SelectOption[]);
      },
      (res) => {
        Logger.Message.Error(res.message || "员工信息请求错误！");
      }
    ).then();
  }, [API.reqGetBuildingsAndPens, API.reqGetEmployee, fetchData, id, selectInfo]);
  const submit = async () => {
    await fetchData(
      API.reqAddTask,
      [{ ...newTask, orgId: id }],
      () => {
        close();
        fresh();
      },
      (res) => {
        Logger.Message.Error(res.message || "请求错误！");
      }
    );
  };
  const [isDark] = useDarkModeReact();
  return (
    <>
      <MyModal title={"添加任务"} open={open} onOk={submit} onCancel={close}>
        <div className="flex flex-col justify-center items-center space-y-3.5 mt-4">
          <Input placeholder={"任务名"} value={newTask.taskName} onChange={(event) => {
            newTask.taskName = event.currentTarget.value;
          }} variant={isDark ? undefined : "filled"} />
          <DatePicker.RangePicker
            variant={isDark ? undefined : "filled"}
            style={{ width: "100%" }} showNow showTime
            onChange={(date) => {
              if (date && date[0] && date[1]) {
                newTask.startTime = date[0].format("YYYY-MM-DD HH:mm:ss");
                newTask.endTime = date[1].format("YYYY-MM-DD HH:mm:ss");
              }
            }}
            size={"middle"}
          />
          <Select
            variant={isDark ? undefined : "filled"}
            style={{ width: "100%" }}
            options={selectInfo.employee}
            placeholder={"选择员工"}
            onChange={(value) => {
              const id = Number(value);
              if (Number.isNaN(id)) {
                newTask.employeeId = -1;
              } else {
                newTask.employeeId = id;
              }
            }}
          />
          <Cascader
            placeholder={"选择楼栋"}
            variant={isDark ? undefined : "filled"}
            className="w-full"
            options={selectInfo.building}
            multiple
            maxTagCount="responsive"
            onChange={(value) => {
              newTask.buildings = value.reduce((pre, cur) => {
                const buildingId = cur[0] as number;
                if (cur.length === 1) {
                  pre.push({
                    buildingId,
                    //TODO 是否需要全部加入
                    pens: []
                  });
                } else {
                  if (pre.find(item => item.buildingId === cur[0])) {
                    pre = pre.map((item) => {
                      if (item.buildingId === cur[0]) {
                        if (!item.pens) item.pens = [];
                        item.pens.push({ penId: cur[1] as number });
                      }
                      return item;
                    });
                  } else {
                    pre.push({
                      buildingId,
                      pens: [{ penId: cur[1] as number }]
                    });
                  }
                }
                return pre;
              }, [] as NewBuilding[]);
            }}
          />
        </div>
      </MyModal>
    </>
  );
};
export default TaskAdder;
