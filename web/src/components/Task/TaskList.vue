<template>
  <TaskCard title="任务列表" class="TaskCard TaskListContainer">
    <template #default>
      <div ref="TaskListRef" />
    </template>
    <template #title-right>
      <el-pagination
        id="el-pagination"
        v-model:page-size="taskStore.pageSize"
        v-model:current-page="taskStore.pageNum"
        :pager-count="5"
        layout="prev, pager, next"
        :total="taskStore.total"
        @current-change="(page:number)=>{
          companyStore.companyInfo&&
          taskStore.getTaskListData(companyStore.companyInfo.id,page);
        }"
      />
    </template>
  </TaskCard>
</template>

<script setup lang="ts" name="TaskList">
  import TaskCard from "@/components/Task/TaskCard.vue";
  import { onMounted, reactive, useTemplateRef, watch } from "vue";
  import { useTaskStore } from "@/stores/pinia/modules/taskStore.ts";
  import { useReactComponentReactive } from "@/hooks/useReactComponent.tsx";
  import TaskList from "@/components/Task/TaskList.tsx";
  import { FC } from "react";
  import { useCompanyStore } from "@/stores/pinia/modules/companyStore.ts";

  const taskStore = useTaskStore();
  const companyStore = useCompanyStore();
  const TaskListRef = useTemplateRef("TaskListRef");
  const TaskListProps = reactive<typeof TaskList extends FC<infer P> ? P : never>({
    data: [],
    selectTask: (task) => {
      taskStore.currentTask = task;
    }
  });
  watch(() => taskStore.currentTaskList, () => {
    TaskListProps.data = taskStore.currentTaskList;
  });
  useReactComponentReactive(TaskList, TaskListRef, TaskListProps);
  onMounted(() => {
    if (taskStore.currentTaskList.length === 0 && !taskStore.currentTask) {
      if (companyStore.companyInfo) taskStore.getTaskListData(companyStore.companyInfo.id).then(() => {
        TaskListProps.data = taskStore.currentTaskList;
      });
      else {
        watch(() => companyStore.companyInfo, () => {
          if (companyStore.companyInfo) taskStore.getTaskListData(companyStore.companyInfo.id).then(() => {
            TaskListProps.data = taskStore.currentTaskList;
          });
        }, { once: true });
      }
    }

  });
</script>

<style scoped lang="scss">
  .TaskCard {
    width: 100%;
    height: 100%;
  }

  #el-pagination {
    width: 100%;
    --el-fill-color-blank: var(--layout-card-pagination-bg);
    --el-text-color-primary: var(--layout-card-pagination-color);
    --el-color-primary: var(--layout-card-pagination-active-color);
    display: flex;
    justify-content: end;
  }
</style>
