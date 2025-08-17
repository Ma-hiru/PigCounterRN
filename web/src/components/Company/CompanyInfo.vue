<template>
  <div class="w-full h-full grid grid-rows-1 grid-cols-[4fr_2fr]">
    <div class="flex flex-col justify-center items-center">
      <div
        class="flex flex-col justify-center items-center bg-[--company-info-card-bg] rounded-[0.5rem] p-4 pl-20 pr-20">
        <!--TODO        -->
        <el-avatar style="background: #ffffff" :size="100" :src="companyStore.companyInfo?.logo" />
        <div
          class="flex flex-col items-center justify-center mt-4 mb-2 space-y-1 text-[--task-currentTask-content-color] pb-2">
          <div class="text-2xl pb-2">
            <span>湘潭大学</span>
          </div>
          <div class="text-sm flex justify-between w-full ">
            <span>负责人：</span>
            <span>{{ companyStore.companyInfo?.adminName }}</span>
          </div>
          <div class="text-sm flex justify-between w-full">
            <span>电话：</span>
            <span>{{ companyStore.companyInfo?.tel }}</span>
          </div>
          <div class="text-sm flex justify-between w-full">
            <span>地址：</span>
            <span>{{ companyStore.companyInfo?.addr }}</span>
          </div>
        </div>
        <el-button :icon="Edit" style="background:transparent;" circle @click="()=>{
          EditModalProps.type = 'companyInfo';
          EditModalProps.open = true;
        }" />
      </div>
    </div>
    <TaskCard class="company-building-card" title="楼栋信息">
      <template #title-right>
        <div class="flex justify-center items-center">
          <el-button circle size="small" :icon="CirclePlus" @click="addBuilding" />
        </div>
      </template>
      <template #default>
        <div class="company-building-content">
          <el-tree
            :data="companyBuilding"
            node-key="id"
            :expand-on-click-node="true"
            default-expand-all
            :indent="20"
            :icon="ArrowRightBold"
          >
            <template #default="{ node, data }">
              <div class="custom-tree-node">
                <span class="node-left">{{ data.label }}</span>
                <div class="node-right">
                  <el-button
                    size="small"
                    circle
                    :icon="CirclePlusFilled"
                    type="success"
                    v-if="'children' in data"
                    @click="addPen(node,data)"
                  />
                  <el-button
                    size="small"
                    circle
                    type="primary"
                    :icon="Edit"
                    @click="change(node,data)"
                  />
                  <el-popconfirm
                    :title="`确定删除${data.label}?`"
                    @confirm="remove(node, data)"
                  >
                    <template #reference>
                      <el-button
                        size="small"
                        type="danger"
                        circle
                        :icon="DeleteFilled"
                      />
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
          </el-tree>
        </div>
      </template>
    </TaskCard>
    <div ref="EditModalRef" />
  </div>
</template>

<script setup lang="ts" name="CompanyInfo">
  import TaskCard from "@/components/Task/TaskCard.vue";
  import {
    ArrowRightBold,
    CirclePlus,
    Edit,
    DeleteFilled,
    CirclePlusFilled
  } from "@element-plus/icons-vue";
  import { useCompanyStore } from "@/stores/pinia/modules/companyStore";
  import { computed, onMounted, reactive, ref, useTemplateRef, watch } from "vue";
  import { ElButton } from "element-plus";
  import type Node from "element-plus/es/components/tree/src/model/node";
  import { useReactComponentReactive } from "@/hooks/useReactComponent.tsx";
  import CompanyInfoEditor from "@/components/Company/CompanyInfoEditor.tsx";
  import { FC } from "react";
  import { useFetchDataVue } from "@/hooks/useFetchData.ts";
  import Logger from "@/utils/logger.ts";

  interface Tree {
    id: number;
    label: string;
    index: number;
    children?: Tree[];
  }

  const companyStore = useCompanyStore();
  const companyBuilding = computed<Tree[]>(() => {
    return companyStore.companyBuilding.map((building, index) => {
      return {
        id: building.id,
        label: building.name,
        index,
        children: building.pens.map((pen, index) => {
          return {
            id: pen.id,
            label: pen.name,
            index
          };
        })
      };
    });
  });

  const { fetchData, API } = useFetchDataVue();
  const change = (node: Node, data: Tree) => {
    EditModalProps.open = true;
    if ("children" in data) {
      EditModalProps.type = "editCompanyBuilding";
      companyStore.companyBuilding.forEach((building) => {
        if (building.id === data.id) {
          EditModalProps.building = building;
        }
      });
    } else {
      EditModalProps.type = "editCompanyPen";
      companyStore.companyBuilding.forEach((building) => {
        if (building.id === node.parent.data.id) {
          EditModalProps.building = building;
          building.pens.forEach((pen) => {
            if (pen.id === data.id) {
              EditModalProps.pen = pen;
            }
          });
        }
      });
    }
  };
  //@ts-ignore
  const remove = async (node: Node, data: Tree) => {
    if ("children" in data) {
      await fetchData(
        API.reqDelBuilding,
        [data.id],
        () => {
          companyStore.getCompanyBuildingsAndPens();
        },
        (res) => {
          Logger.Message.Error(res?.message || "删除楼栋失败");
        }
      );
    } else {
      await fetchData(
        API.reqDelPen,
        [data.id],
        () => {
          companyStore.getCompanyBuildingsAndPens();
        },
        (res) => {
          Logger.Message.Error(res?.message || "删除栏舍失败");
        }
      );
    }
  };
  //@ts-ignore
  const addPen = (node: Node, data: Tree) => {
    EditModalProps.open = true;
    EditModalProps.type = "addCompanyPen";
    companyStore.companyBuilding.forEach((building) => {
      if (building.id === data.id) {
        EditModalProps.building = building;
      }
    });
  };
  const addBuilding = () => {
    EditModalProps.open = true;
    EditModalProps.type = "addCompanyBuilding";
  };
  const EditModalRef = useTemplateRef("EditModalRef");
  const EditModalKey = ref(0);
  const EditModalProps = reactive<typeof CompanyInfoEditor extends FC<infer P> ? P : never>({
    companyInfo: null,
    type: "companyInfo",
    onSave: () => {
      companyStore.getCompanyInfo();
      companyStore.getCompanyBuildingsAndPens();
      EditModalProps.open = false;
      setTimeout(() => {
        EditModalKey.value++;
      }, 1000);
    },
    open: false,
    onCancel: () => {
      EditModalProps.open = false;
    },
    building: null,
    pen: null
  });
  watch(() => companyStore.companyInfo, () => {
    if (companyStore.companyInfo) {
      EditModalProps.companyInfo = companyStore.companyInfo;
    }
  });
  useReactComponentReactive(CompanyInfoEditor, EditModalRef, EditModalProps, EditModalKey);
  onMounted(async () => {
    await companyStore.getCompanyInfo();
    await companyStore.getCompanyBuildingsAndPens();
    if (companyStore.companyInfo) EditModalProps.companyInfo = companyStore.companyInfo;
  });
</script>

<style scoped lang="scss">
  .company-info-card {
    .company-info-content {
      height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--layout-card-scrollbar-color) transparent;
    }
  }

  .company-building-card {
    .company-building-content {
      padding: 1rem 0.5rem;
      height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--layout-card-scrollbar-color) transparent;

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          .node-right {
            opacity: 1;
          }
        }

        .node-left {
          font-weight: bold;
          font-size: 1.1rem;
        }

        .node-right {
          opacity: 0;
        }

      }
    }
  }


</style>
