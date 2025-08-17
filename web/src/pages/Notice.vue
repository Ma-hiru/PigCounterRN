<template>
  <div class="grid grid-rows-1 grid-cols-[1fr_auto_2fr]">
    <NoticeList />
    <div class="w-[--layout-card-inset-padding]" />
    <NoticeDetail />
  </div>
</template>

<script setup lang="ts" name="Notice">

  import NoticeDetail from "@/components/Notice/NoticeDetail.vue";
  import NoticeList from "@/components/Notice/NoticeList.vue";
</script>

<style scoped lang="scss">
</style>
