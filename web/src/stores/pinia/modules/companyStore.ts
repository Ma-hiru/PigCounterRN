import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchDataVue } from "@/hooks/useFetchData.ts";
import Logger from "@/utils/logger.ts";
import { getSafeValue } from "@/utils/checkNullValue.ts";

const { fetchData, API } = fetchDataVue();
export const useCompanyStore = defineStore("companyStore", () => {
  const companyInfo = ref<Company>();
  const companyBuilding = ref<CompanyBuilding[]>([]);

  async function getCompanyInfo() {
    //TODO  获取公司信息
    companyInfo.value = {
      id: 1,
      name: "湘潭大学",
      adminName: "聂国梁",
      addr: "湘潭市雨湖区",
      tel: "0086-731-58293938",
      logo: "https://shiina-mahiru.cn/temp/xtu_logo.png"
    };
  }

  async function getCompanyBuildingsAndPens() {
    if (!companyInfo.value || !companyInfo.value.id) return;
    await fetchData(
      API.reqGetBuildingsAndPens,
      [companyInfo.value.id],
      (res) => {
        companyBuilding.value = getSafeValue(res.data.buildings, []);
      },
      (res) => {
        Logger.Message.Error("获取楼栋列表失败：" + res?.message);
      }
    );
  }

  async function Init() {
    await getCompanyInfo();
    await getCompanyBuildingsAndPens();
  }

  return {
    companyInfo,
    companyBuilding,
    getCompanyBuildingsAndPens,
    getCompanyInfo,
    Init
  };
});
