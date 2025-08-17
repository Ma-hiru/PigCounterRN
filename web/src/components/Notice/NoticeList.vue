<template>
  <TaskCard title="公告列表">
    <template #title-right>
      <div class="flex justify-center items-center">
        <el-button circle size="small" :icon="Plus" @click="()=>{
            AdderProps.open = true;
          }" />
      </div>
    </template>
    <template #default>
      <div v-if="noticeStore.noticeList.length>0" id="notice-list-content">
        <div ref="NoticeListRef" />
      </div>
      <div v-else class="notice-blank w-full h-full flex justify-center items-center">
        <img src="/blank_1.svg" class="w-[1.5rem] mr-1" alt="nodata" />
        暂无数据
      </div>
      <div ref="AddNoticeModal" />
    </template>
  </TaskCard>
</template>

<script setup lang="ts" name="NoticeList">
  import { useNoticeStore } from "@/stores/pinia/modules/noticeStore.ts";
  import { useReactComponentReactive } from "@/hooks/useReactComponent.tsx";
  import NoticeList from "@/components/Notice/NoticeList.tsx";
  import NoticeAdder from "@/components/Notice/NoticeAdder.tsx";
  import { reactive, useTemplateRef } from "vue";
  import { FC } from "react";
  import { Plus } from "@element-plus/icons-vue";
  import TaskCard from "@/components/Task/TaskCard.vue";
  import { useCompanyStore } from "@/stores/pinia/modules/companyStore.ts";


  const noticeStore = useNoticeStore();
  const companyStore = useCompanyStore();
  const NoticeListRef = useTemplateRef("NoticeListRef");
  const AddNoticeModalRef = useTemplateRef("AddNoticeModal");
  const ListProps = reactive<typeof NoticeList extends FC<infer P> ? P : never>({
    list: noticeStore.noticeList,
    change: (index: number) => {
      noticeStore.currentNotice = noticeStore.noticeList[index];
    }
  });
  const AdderProps = reactive<typeof NoticeAdder extends FC<infer P> ? P : never>({
    open: false,
    close: () => {
      AdderProps.open = false;
    },
    refresh: () => {
      //TODO
    },
    companyId: companyStore.companyInfo?.id || 1
  });
  useReactComponentReactive(NoticeList, NoticeListRef, ListProps);
  useReactComponentReactive(NoticeAdder, AddNoticeModalRef, AdderProps);
</script>

<style scoped lang="scss">
  #notice-list-content {
    height: calc(var(--layout-card-content-height-calc) - 4 * var(--layout-card-inset-padding));
  }
</style>
