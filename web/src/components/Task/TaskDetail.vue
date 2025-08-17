<template>
  <TaskCard title="任务详情" class="TaskDetailContainer">
    <template #title-right>
      <div class="flex flex-row justify-center items-center space-x-4">
        <template
          v-if="taskStore.currentTask &&taskStore.currentTask.buildings && taskStore.currentTask.buildings.length>0"
        >
          <span>已识别总数：{{ total.count }}</span>
          <span>已人工确认：{{ total.manualCount }}</span>
        </template>
        <template v-else>
          <span>已识别总数：-</span>
          <span> 已人工确认：-</span>
        </template>
      </div>
    </template>
    <template #default>
      <div class="task-detail">
        <template
          v-if="taskStore.currentTask &&taskStore.currentTask.buildings && taskStore.currentTask.buildings.length>0"
          v-for="(building,index) in taskStore.currentTask.buildings">
          <div class="collapse collapse-plus w-full">
            <input type="radio" name="table-accordion" :checked="index===0" />
            <div class="collapse-title font-bold">
              {{ building.buildingName }}
            </div>
            <div class="collapse-content">
              <el-table
                show-overflow-tooltip
                stripe
                :data="building.pens"
                row-key="penId"
                border
                show-summary
                :summary-method="summary"
              >
                <el-table-column prop="penId" label="名称" align="center">
                  <template #default="{row}">
                    <div>{{ row.penName }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="penId" label="识别数量" align="center">
                  <template #default="{row}">
                    <div>{{ (row as Pen).count <= 0 ? 0 : (row as Pen).count }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="penId" label="确认数量" align="center">
                  <template #default="{row}">
                    <div>{{ (row as Pen).manualCount <= 0 ? 0 : (row as Pen).manualCount }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="识别图片" align="center">
                  <template #default="{row}">
                    <el-button @click="checkImg(row, building, 'ai')">
                      点击查看
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="上传图片" align="center">
                  <template #default="{row}">
                    <el-button @click="checkImg(row, building, 'manual')">
                      点击查看
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                  <template #default="{row}">
                    <el-tag type="danger" v-if="!row.status">
                      {{ "未完成" }}
                    </el-tag>
                    <el-tag type="primary" v-if="row.status">
                      {{ "已完成" }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="task-blank flex flex-col justify-center items-center w-full">
            <img src="/blank.svg" alt="blank">
            <span class="mt-4 text-lg font-bold">暂无进行中的任务</span>
          </div>
        </template>
      </div>
    </template>
  </TaskCard>
  <div ref="ImgModal" />
</template>

<script setup lang="ts" name="TaskDetail">
  import TaskCard from "@/components/Task/TaskCard.vue";
  import { useTaskStore } from "@/stores/pinia/modules/taskStore.ts";
  import { computed, reactive, useTemplateRef } from "vue";
  import { useReactComponentReactive } from "@/hooks/useReactComponent.tsx";
  import TaskUploadImgChecker from "@/components/Task/TaskUploadImgChecker.tsx";
  import { getTaskCount } from "@/utils/getTaskCount.ts";
  import Logger from "@/utils/logger.ts";
  import { handleServerURL } from "@/utils/handleServerURL.ts";

  const taskStore = useTaskStore();
  const ImgModal = useTemplateRef("ImgModal");
  const total = computed<{
    count: number,
    manualCount: number
  }>(() => getTaskCount(taskStore.currentTask)
  );
  const summary = (param: any) => {
    const pens: Pen[] = param.data;
    const cols: { label: string }[] = param.columns;
    return cols.reduce((sums, col, index) => {
      if (index === 0) sums[0] = "合计";
      else if (col.label === "识别数量") {
        (sums[1] as number) = 0;
        pens.forEach((pen) => {
          (sums[1] as number) += Number(pen.count <= 0 ? 0 : pen?.count || 0);
        });
      } else if (col.label === "确认数量") {
        (sums[2] as number) = 0;
        pens.forEach((pen) => {
          (sums[2] as number) += Number(pen?.manualCount <= 0 ? 0 : pen?.manualCount || 0);
        });
      } else sums[index] = "";
      return sums;
    }, [] as (string | number)[]);
  };
  const checkImg = (row: Pen, building: Building, type: "ai" | "manual") => {
    if (!row.status) {
      return Logger.Message.Info("请先完成该任务");
    }
    modalProps.open = true;
    modalProps.title = `${building.buildingName} · ${row.penName}`;
    if (type === "ai") {
      modalProps.title += "（识别结果）";
      modalProps.count = (row as Pen).count;
      modalProps.url = handleServerURL((row as Pen).outputPicturePath, "CountUploadImg");
    } else {
      modalProps.title += "（人工结果）";
      modalProps.count = (row as Pen).manualCount;
      modalProps.url = handleServerURL((row as Pen).picturePath, "CountUploadImg");
    }
  };
  const modalProps = reactive({
    open: false,
    close: () => {
      modalProps.open = false;
    },
    count: 0,
    url: "",
    title: ""
  });
  useReactComponentReactive(TaskUploadImgChecker, ImgModal, modalProps);
</script>

<style scoped lang="scss">
  .TaskDetailContainer {
    margin-left: var(--layout-card-inset-padding);

    .task-detail {
      height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
      overflow: auto;
      scrollbar-width: thin;

      .task-blank {
        height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
      }
    }
  }

  .el-table {

    width: calc(100% - 10px);
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //--el-table-bg-color: transparent;
    //--el-table-tr-bg-color: transparent;
    //--el-table-header-bg-color: transparent;
    //--el-table-border: none;
    //--el-table-border-color: transparent;
    //--el-table-text-color: #fff;
    //--el-table-header-text-color: #fff;
    //--el-table-row-hover-bg-color
    //--el-table-current-row-bg-color
  }
</style>
