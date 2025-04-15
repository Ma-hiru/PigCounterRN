import RootState, { uploadActions } from "@/stores";
import { cloneDeep } from "lodash-es";

export type TaskIndexTuple = {
  TaskIndex: number;
  BuildingIndex: number;
  PenIndex: number;
}
const { setTasksList } = uploadActions;
const dispatch = RootState.dispatch;
export const updateTaskList = (TaskIndexTuple: TaskIndexTuple, newPath?: Pen["picturePath"], newType?: Pen["type"], newRes?: Pen["penNum"]) => {
  const newTaskList = cloneDeep(RootState.getState().uploadStore?.TasksList);
  const pen = newTaskList[TaskIndexTuple.TaskIndex].buildings[TaskIndexTuple.BuildingIndex].pens[TaskIndexTuple.PenIndex];
  newPath !== undefined && (pen.picturePath = newPath);
  newRes && (pen.penNum = newRes);
  newType !== undefined && (pen.type = newType);
  dispatch(setTasksList(newTaskList));
};
