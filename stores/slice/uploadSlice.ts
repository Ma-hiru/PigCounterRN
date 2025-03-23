import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskList } from "@/types/task";
import { RootStateType } from "@/stores";


interface initialType {
  TasksList: TaskList;
  DEFAULT_UPLOAD_RES: number;
  DEFAULT_UPLOAD_PATH: string;
  DEFAULT_UPLOAD_TYPE: string;
}

const uploadSlice = createSlice({
  name: "uploadStore",
  initialState: {
    TasksList: [
      {
        id: 1,
        time: "2025/3/17/12/00~2025/3/17/14/00",
        validation: true,
        area: [
          {
            id: 1,
            name: "楼栋一",
            children: [
              {
                id: 1,
                name: "栏舍1",
                type: "",
                res: 0,
                path: ""
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                type: "",
                res: -1
              }
            ]
          },
          {
            id: 2,
            name: "楼栋二",
            children: [
              {
                id: 1,
                name: "栏舍1",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                type: "",
                res: -1
              }
            ]
          },
          {
            id: 3,
            name: "楼栋三",
            children: [
              {
                id: 1,
                name: "栏舍1",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                type: "",
                res: -1
              }
            ]
          }
        ]
      },
      {
        id: 2,
        time: "2025/3/17/12/00~2025/3/17/14/00",
        validation: false,
        area: [
          {
            id: 1,
            name: "楼栋一",
            children: [
              {
                id: 1,
                name: "栏舍1",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                type: "",
                res: -1
              }
            ]
          },
          {
            id: 2,
            name: "楼栋二",
            children: [
              {
                id: 1,
                name: "栏舍1",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                type: "",
                res: -1
              }
            ]
          },
          {
            id: 3,
            name: "楼栋三",
            children: [
              {
                id: 1,
                name: "栏舍1",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                type: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                type: "",
                res: -1
              }
            ]
          }
        ]
      }
    ],
    DEFAULT_UPLOAD_RES: -1,
    DEFAULT_UPLOAD_PATH: "",
    DEFAULT_UPLOAD_TYPE: ""
  } as initialType,
  reducers: {
    setTasksList: (state, action: PayloadAction<TaskList>) => {
      state.TasksList = action.payload;
    }
  }
});
export const uploadReducer = uploadSlice.reducer;
export const uploadSelector = (root: RootStateType) => root.uploadStore;
export const uploadActions = uploadSlice.actions;
