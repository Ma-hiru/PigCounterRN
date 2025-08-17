import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoticeStore = defineStore("noticeStore", () => {
  const currentNotice = ref<Notice>({
    id: 0,
    employeeId: 0,
    companyId: 0,
    time: "2025-04-22",
    type: "系统",
    content: "系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！",
    read: false,
    del: false
  });
  const noticeList = ref<Notice[]>([
    {
      id: 0,
      employeeId: 0,
      companyId: 0,
      time: "2025-04-22",
      type: "系统",
      content: "系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！",
      read: false,
      del: false
    },
    {
      id: 1,
      employeeId: 0,
      companyId: 0,
      time: "2025-04-22",
      type: "系统",
      content: "过期提醒：任务一即将过期，请及时处理",
      read: false,
      del: false
    },
    {
      id: 2,
      employeeId: 0,
      companyId: 0,
      time: "2025-04-22",
      type: "组织",
      content: "组织公告：抓紧完成上传任务一。",
      read: false,
      del: false
    }
  ]);
  return {
    noticeList,
    currentNotice
  };
});
