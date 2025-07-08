import { DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE } from "@/settings.app";

export const TaskConfig: ZustandConfig<InitialStateType & TaskActions, InitialStateType> = (set, get, api) => ({
  ...InitialState,
  setTasksList(list: TaskList) {
    set((state) => {
      state.TasksList = list;
    });
  },
  setOnceTask(task: Task) {
    set((state) => {
      state.OnceTask = task;
    });
  },
  setAllTaskList(list: BaseTask[]) {
    set((state) => {
      state.AllTaskList = list;
    });
  },
  updateTaskListPenPartial(TaskIndexTuple: TaskIndexTuple, newPen: Partial<Pen>) {
    set((state) => {
      const { TaskIndex, BuildingIndex, PenIndex } = TaskIndexTuple;
      const oldPen = state.TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex];
      state.TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex] = {
        ...oldPen,
        ...newPen
      };
    });
  },
  updateTaskListPenStatus(TaskIndexTuple: TaskIndexTuple, Status?: boolean) {
    if (Status !== undefined) {
      const { TaskIndex, BuildingIndex, PenIndex } = TaskIndexTuple;
      set(state => {
        state.TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex].status = Status;
      });
    }
  },
  updateOnceTaskPenPartial(newPen: Partial<Pen>) {
    set((state) => {
      const oldPen = state.OnceTask.buildings[0].pens[0];
      state.OnceTask.buildings[0].pens[0] = {
        ...oldPen,
        ...newPen
      };
    });
  }
});

const InitialState: InitialStateType = {
  TasksList: [],
  AllTaskList: [],
  OnceTask: {
    id: 0,
    employeeId: 0,
    taskName: "",
    startTime: "",
    endTime: "",
    buildings: [
      {
        buildingId: 0,
        buildingName: "",
        pens: [
          {
            penId: 0,
            penName: "",
            count: DEFAULT_UPLOAD_RES,
            manualCount: DEFAULT_UPLOAD_RES,
            picturePath: "",
            outputPicturePath: "",
            status: false,
            type: ""
          }
        ]
      }
    ]
  },
  DEFAULT_UPLOAD_PATH,
  DEFAULT_UPLOAD_RES,
  DEFAULT_UPLOAD_TYPE
};

interface InitialStateType {
  TasksList: TaskList;
  AllTaskList: BaseTask[];
  OnceTask: TaskList[0];
  readonly DEFAULT_UPLOAD_RES: typeof DEFAULT_UPLOAD_RES;
  readonly DEFAULT_UPLOAD_PATH: typeof DEFAULT_UPLOAD_PATH;
  readonly DEFAULT_UPLOAD_TYPE: typeof DEFAULT_UPLOAD_TYPE;
}

interface TaskActions {
  setTasksList(list: TaskList): void;

  setOnceTask(task: TaskList[0]): void;

  setAllTaskList(list: BaseTask[]): void;

  updateTaskListPenPartial(TaskIndexTuple: TaskIndexTuple, newPen: Partial<Pen>): void;

  updateOnceTaskPenPartial(newPen: Partial<Pen>): void;

  updateTaskListPenStatus(TaskIndexTuple: TaskIndexTuple, Status?: boolean): void;
}

