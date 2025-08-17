<template>
  <TaskCard class="task-card" title="当前任务" flexible>
    <template #title-right>
      <div class="flex justify-center items-center">
        <el-button size="small" circle :icon="Plus" @click="addTaskModalProps.open = true" />
        <div ref="addTaskModalRef" />
      </div>
    </template>
    <template #default>
      <div v-if="taskStore.currentTask">
        <div class="task-title grid-rows-1 grid-cols-[auto_auto_1fr]">
          <span class="task-title-prefix">当前</span>
          <span class="task-title-name">
          {{
              taskStore.currentTask?.taskName
              || `任务(${taskStore.currentTask.id})`
            }}
        </span>
          <span class="task-title-countdown">
        <el-countdown
          :value="dayjs(taskStore.currentTask.endTime)"
          format="HH:mm:ss"
          id="el-countdown"
          :value-style="styles.ElCountDown"
        />
      </span>
        </div>
        <div class="task-content space-y-1">
          <div>开始时间：{{ taskStore.currentTask.startTime }}</div>
          <div>结束时间：{{ taskStore.currentTask.endTime }}</div>
          <div>负责人：
            {{ employeeName }}
          </div>
          <div>
            <el-progress
              class="el-progress"
              :percentage="currentPercentage"
              :stroke-width="10"
              type="line"
              :duration="20"
            >
          <span class="text-[var(--task-currentTask-progress-text-color)]">
            {{ currentPercentage }}%
          </span>
            </el-progress>
          </div>
        </div>
      </div>
      <div v-else class="h-[8rem] flex justify-center items-center">
        <span class="text-lg font-bold">暂无进行中的任务</span>
      </div>
    </template>
  </TaskCard>
</template>

<script setup lang="ts" name="CurrentTaskCard">
  import TaskCard from "@/components/Task/TaskCard.vue";
  import { useTaskStore } from "@/stores/pinia/modules/taskStore.ts";
  import dayjs from "dayjs";
  import { createStyleSheet } from "@/utils/createStyleSheet.ts";
  import { computed, onMounted, reactive, ref, useTemplateRef, watch } from "vue";
  import { Plus } from "@element-plus/icons-vue";
  import { useReactComponentReactive } from "@/hooks/useReactComponent.tsx";
  import TaskAdder from "@/components/Task/TaskAdder.tsx";
  import { FC } from "react";
  import { useCompanyStore } from "@/stores/pinia/modules/companyStore.ts";
  import { useFetchDataVue } from "@/hooks/useFetchData.ts";

  const employeeName = ref("");
  const companyStore = useCompanyStore();
  const taskStore = useTaskStore();
  const currentPercentage = computed(() => {
    const total = taskStore.currentTask?.buildings.reduce((total, building) => {
      return total + building.pens.length;
    }, 0) || 0;
    const completed = taskStore.currentTask?.buildings.reduce((completed, building) => {
      return completed + building.pens.filter(pen => pen.status).length;
    }, 0) || 0;

    return (completed / total) * 100;
  });
  const styles = createStyleSheet({
    ElCountDown: {
      fontSize: "1rem",
      display: "inline",
      fontWeight: "bold",
      color: "var(--task-currentTask-content-color)"
    }
  });
  const addTaskModalRef = useTemplateRef("addTaskModalRef");
  const addTaskModalProps = reactive<typeof TaskAdder extends FC<infer P> ? P : never>({
    open: false,
    close: () => {
      addTaskModalProps.open = false;
    },
    //TODO
    fresh: () => taskStore.getTaskListData(companyStore.companyInfo?.id || 1),
    id: companyStore.companyInfo?.id || 1
  });
  watch(() => companyStore.companyInfo, () => {
    companyStore.companyInfo && (addTaskModalProps.id = companyStore.companyInfo.id);
  });
  const { fetchData, API } = useFetchDataVue();
  watch(() => taskStore.currentTask, () => {
    taskStore.currentTask && companyStore.companyInfo && fetchData(
      API.reqGetEmployee,
      [1, 1000, companyStore.companyInfo.id],
      (res) => {
        res.data.list.find((item) => {
          if (item.id === taskStore.currentTask?.employeeId) {
            employeeName.value = item.name;
            return true;
          }
        });
      }
    );
  });
  useReactComponentReactive(TaskAdder, addTaskModalRef, addTaskModalProps);
  onMounted(() => {
    if (!companyStore.companyInfo) {
      companyStore.getCompanyInfo();
      companyStore.getCompanyBuildingsAndPens();
    }
  });
</script>

<style scoped lang="scss">
  .task-card {
    .task-title {
      display: grid;
      height: 1.5rem;

      .task-title-prefix {
        display: inline-block;
        font-weight: bold;
        background: var(--task-currentTask-title-prefix-bg-current);
        color: var(--task-currentTask-title-prefix-color);
        font-size: 0.8rem;
        padding: 0 0.5rem;
        border-radius: 5px;
      }

      .task-title-name {
        display: inline-block;
        margin-left: 0.5rem;
        font-weight: bolder;
      }

      .task-title-countdown {
        display: flex;
        justify-content: end;
      }
    }

    .task-content {
      display: flex;
      flex-direction: column;
      height: 6.5rem;

      .el-progress {
        --el-border-color-lighter: var(--task-currentTask-progress-bg-color);
      }
    }
  }
</style>
