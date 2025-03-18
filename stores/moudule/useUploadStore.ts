import { createSlice } from "@reduxjs/toolkit";
import { TaskList } from "@/types/task";


interface initialType {
  TasksList: TaskList;
  DEFAULT_UPLOAD_RES: number;
  DEFAULT_UPLOAD_PATH: string;
}

export const useUploadStore = createSlice({
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
                res: 0,
                path: ""
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
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
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
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
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
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
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
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
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
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
                res: -1
              },
              {
                id: 2,
                name: "栏舍2",
                path: "",
                res: -1
              },
              {
                id: 3,
                name: "栏舍3",
                path: "",
                res: -1
              }
            ]
          }
        ]
      }
    ],
    DEFAULT_UPLOAD_RES: -1,
    DEFAULT_UPLOAD_PATH: ""
  } as initialType,
  reducers: {
    setTasksList: (state, action: { type: string; payload: TaskList }) => {
      state.TasksList = action.payload;
    }
  }
});

