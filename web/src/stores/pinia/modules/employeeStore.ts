import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchDataVue } from "@/hooks/useFetchData.ts";
import Logger from "@/utils/logger.ts";
import AppSettings from "@/settings";
import { getSafeValue } from "@/utils/checkNullValue.ts";

const { fetchData, API } = fetchDataVue();
export const useEmployeeStore = defineStore("employeeStore", () => {
  const employeeList = ref<EmployeeInfo[]>([]);
  const pageNum = ref(AppSettings.DEFAULT_EMPLOYEE_PAGE_NUM);
  const pageSize = ref(AppSettings.DEFAULT_EMPLOYEE_PAGE_SIZE);
  const total = ref(0);

  async function Init(organizationId: number) {
    await fetchData(
      API.reqGetEmployee,
      [
        AppSettings.DEFAULT_EMPLOYEE_PAGE_NUM,
        AppSettings.DEFAULT_EMPLOYEE_PAGE_SIZE,
        organizationId
      ],
      (res) => {
        res.data && (employeeList.value = getSafeValue(res.data.list, []));
      },
      (res) => {
        Logger.Message.Error("获取员工列表失败:" + res?.message);
      }
    );
  }

  async function getEmployeeList(orgId: number) {
    await fetchData(
      API.reqGetEmployee,
      [pageNum.value, pageSize.value, orgId],
      (res) => {
        employeeList.value = getSafeValue(res.data.list, []);
      },
      (res) => {
        Logger.Message.Error(res?.message || "获取员工列表失败");
      }
    );
  }

  return {
    employeeList,
    pageNum,
    pageSize,
    total,
    getEmployeeList,
    Init
  };
});
