import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchDataVue } from "@/hooks/useFetchData.ts";
import Logger from "@/utils/logger.ts";
import AppSettings from "@/settings";
import { getSafeValue } from "@/utils/checkNullValue.ts";

const { fetchData, API } = fetchDataVue();
export const useTaskStore = defineStore("taskStore", () => {
  /* TaskData */
  const currentTask = ref<Task>();
  const currentTaskList = ref<BaseTask[]>([]);
  const pageNum = ref(AppSettings.DEFAULT_TASK_PAGE_NUM);
  const pageSize = ref(AppSettings.DEFAULT_TASK_PAGE_SIZE);
  const total = ref(0);

  /* Init */
  async function Init(orgId: number) {
    await fetchData(
      API.reqGetTask,
      [
        AppSettings.DEFAULT_TASK_PAGE_NUM,
        AppSettings.DEFAULT_TASK_PAGE_SIZE,
        orgId
      ],
      (res) => {
        const { total: Total, list: List } = res.data;
        total.value = getSafeValue(Total, 0);
        currentTaskList.value = getSafeValue<BaseTask[]>(List, []);
        if (List.length > 0 && List[0]?.id) {
          fetchData(
            API.reqGetTaskDetail,
            [List[0].id],
            (res) => {
              res.data && (currentTask.value = getSafeValue(res.data, AppSettings.DEFAULT_TASK_VAL, true, [undefined, null]));
            },
            (res) => {
              Logger.Message.Error("获取初始任务详情失败：" + res?.message || "");
            }
          );
        }
      },
      (res) => {
        Logger.Message.Error("获取初始任务列表失败：" + res?.message || "");
      }
    );
  }

  async function getTaskListData(orgId: number, currentPage?: number) {
    Logger.Console("TASK getTaskListData currentPage:", currentPage);
    Logger.Console("TASK getTaskListData pageNum.value:", pageNum.value);
    await fetchData(
      API.reqGetTask,
      [getSafeValue(currentPage, pageNum.value), pageSize.value, orgId],
      (res) => {
        total.value = getSafeValue(res.data.total, 0);
        Logger.Console("TASK getTaskListData res.data.list:", res.data);
        Logger.Console("TASK getTaskListData", [getSafeValue(currentPage, pageNum.value), pageSize.value]);
        currentTaskList.value = getSafeValue<BaseTask[]>(res.data.list, []);
      },
      (res) => {
        Logger.Message.Error("获取任务列表失败" + getSafeValue(res.message, ""));
      }
    );
  }

  return {
    currentTask,
    currentTaskList,
    pageNum,
    pageSize,
    total,
    getTaskListData,
    Init
  };
});
