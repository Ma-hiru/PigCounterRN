<template>
  <TaskCard class="employee-card" title="员工信息">
    <template #title-right>
      <div class="flex justify-end items-center">
        <el-pagination
          id="el-pagination"
          v-model:page-size="employeeStore.pageSize"
          layout="prev, pager, next"
          v-model:current-page="employeeStore.pageNum"
          :total="employeeStore.total"
          @current-change="employeeStore.getEmployeeList(orgId)"
        />
        <el-popover
          :visible="popover"
          placement="bottom"
          title=""
          width="10rem"
        >
          <template #default>
            <el-input placeholder="输入关键词" v-model="keyword" />
          </template>
          <template #reference>
            <el-button circle size="small" :icon="Filter" @click="popover  = !popover" />
          </template>
        </el-popover>
        <el-button circle size="small" :icon="CirclePlus" @click="add" />
      </div>
    </template>
    <template #default>
      <div class="employee-content">
        <el-table
          stripe
          :data="employeeStore.employeeList"
          show-overflow-tooltip
          row-key="id"
          border
          height="calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding))"
        >
          <el-table-column prop="id" align="center" label="id" min-width="64"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名"
                           min-width="128"></el-table-column>
          <el-table-column prop="username" align="center" label="用户名"
                           min-width="128"></el-table-column>
          <el-table-column prop="profilePicture" align="center" label="头像" min-width="100">
            <template #default="{row}">
              <el-avatar
                size="default"
                shape="circle"
                :src="handleServerURL(row.profilePicture,'avatar')"
              />
            </template>
          </el-table-column>
          <el-table-column prop="sex" align="center" label="性别" min-width="70"></el-table-column>
          <el-table-column prop="phone" align="center" label="电话"
                           min-width="130"></el-table-column>
          <el-table-column prop="createTime" align="center" label="加入时间"
                           min-width="125"></el-table-column>
          <el-table-column align="center" label="操作" min-width="110">
            <template #default="{row}">
              <el-button-group>
                <el-button size="default" :icon="Edit" @click="edit(row)" />
                <el-popconfirm :title="'你确定要删除'+row.name" @confirm="del(row)">
                  <template #reference>
                    <el-button size="default" :icon="Delete" />
                  </template>
                </el-popconfirm>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div ref="ModalRef" />
    </template>
  </TaskCard>
</template>

<script setup lang="ts" name="Employee">
  import TaskCard from "@/components/Task/TaskCard.vue";
  import { useEmployeeStore } from "@/stores/pinia/modules/employeeStore.ts";
  import { Delete, Edit, CirclePlus, Filter } from "@element-plus/icons-vue";
  import { useReactComponentReactive } from "@/hooks/useReactComponent.tsx";
  import { onMounted, reactive, ref, useTemplateRef, watch } from "vue";
  import EmployeeEditor from "@/components/Company/EmployeeEditor.tsx";
  import { FC } from "react";
  import { debounce } from "lodash-es";
  import { handleServerURL } from "@/utils/handleServerURL.ts";
  import { useCompanyStore } from "@/stores/pinia/modules/companyStore.ts";
  import { useFetchDataVue } from "@/hooks/useFetchData.ts";
  import Logger from "@/utils/logger.ts";

  const employeeStore = useEmployeeStore();
  const companyStore = useCompanyStore();
  const orgId = ref(companyStore.companyInfo?.id || 1);
  const orgName = ref(companyStore.companyInfo?.name || "");
  watch(() => companyStore.companyInfo, () => {
    ModalProps.orgId = companyStore.companyInfo?.id || 1;
    orgId.value = companyStore.companyInfo?.id || 1;
    ModalProps.orgName = companyStore.companyInfo?.name || "";
    orgName.value = companyStore.companyInfo?.name || "";
  });
  const { fetchData, API } = useFetchDataVue();
  const edit = (data: EmployeeInfo) => {
    ModalProps.employee = data;
    ModalProps.open = true;
    ModalProps.type = "edit";
  };
  const del = (data: EmployeeInfo) => {
    fetchData(
      API.reqDelEmployee,
      [data.id],
      () => {
        employeeStore.getEmployeeList(orgId.value);
      },
      (res) => {
        Logger.Message.Error(res?.message || "删除员工失败");
      }
    );
  };
  const add = () => {
    ModalProps.open = true;
    ModalProps.employee = {
      id: 0,
      name: "",
      username: "",
      profilePicture: "",
      organization: companyStore.companyInfo?.name || "",
      sex: "",
      phone: "",
      createTime: ""
    };
    ModalProps.type = "add";
  };
  const keyword = ref("");
  const popover = ref(false);
  const filter = debounce(() => {
    if (keyword.value === "")
      employeeStore.getEmployeeList(orgId.value);
    else fetchData(
      API.reqSearchEmployee,
      [{ name: keyword.value }],
      (req) => {
        employeeStore.employeeList = req.data.list;
      },
      (res) => {
        Logger.Message.Error(res?.message || "获取员工列表失败");
      }
    );
  });
  watch(keyword, () => {
    filter();
  });
  const ModalProps = reactive<typeof EmployeeEditor extends FC<infer P> ? P : never>({
    open: false,
    employee: null,
    close: () => {
      employeeStore.getEmployeeList(orgId.value).finally(
        () => {
          ModalProps.open = false;
        }
      );
    },
    type: "add",
    orgId: orgId.value,
    orgName: orgName.value
  });
  const ModalRef = useTemplateRef("ModalRef");
  useReactComponentReactive(EmployeeEditor, ModalRef, ModalProps);
  onMounted(() => {
    employeeStore.getEmployeeList(orgId.value);
  });
</script>

<style scoped lang="scss">
  .employee-card {
    .employee-content {
      height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--layout-card-scrollbar-color) transparent;
    }
  }

  .el-table {
    //border-radius: 0.5rem;
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

  #el-pagination {
    width: 100%;
    --el-fill-color-blank: var(--layout-card-pagination-bg);
    --el-text-color-primary: var(--layout-card-pagination-color);
    --el-color-primary: var(--layout-card-pagination-active-color);
    display: flex;
    justify-content: end;
  }
</style>
