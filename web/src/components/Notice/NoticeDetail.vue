<template>
  <TaskCard title="详情">
    <template #title-right>
      <div class="w-[30%] flex justify-center items-center">
        <el-progress
          v-if="noticeStore.currentNotice"
          :percentage="percentage"
          class="w-full"
          :status="status"
        />
        <el-popconfirm title="确定删除该公告吗？" @confirm="remove">
          <template #reference>
            <el-button circle size="small" type="danger" :icon="Delete" />
          </template>
        </el-popconfirm>
      </div>
    </template>
    <template #default>
      <div v-if="noticeStore.currentNotice" id="notice-detail-content">
        <el-table border :data="[]">
          <el-table-column label="id"></el-table-column>
          <el-table-column label="姓名"></el-table-column>
          <el-table-column label="已读"></el-table-column>
        </el-table>
      </div>
      <div v-else class="notice-blank flex flex-col justify-center items-center w-full h-full">
        <img src="/blank.svg" alt="blank">
        <span class="mt-4 text-lg font-bold">暂无公告</span>
      </div>
    </template>
  </TaskCard>
</template>

<script setup lang="ts" name="NoticeDetail">
  import { useNoticeStore } from "@/stores/pinia/modules/noticeStore.ts";
  import TaskCard from "@/components/Task/TaskCard.vue";
  import { ref } from "vue";
  import { Delete } from "@element-plus/icons-vue";

  const noticeStore = useNoticeStore();
  const status = ref<"success" | "exception" | "warning" | "">("");
  const percentage = ref(0);
  const remove = () => {
  };
</script>

<style scoped lang="scss">
  #notice-detail-content {
    height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
    overflow-y: auto;
    scrollbar-width: none;
  }
</style>
