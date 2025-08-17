<template>
  <div class="w-[var(--layout-card-content-width-calc)] h-[var(--layout-card-content-height-calc)] grid grid-rows-1 grid-cols-[1fr_2fr]">
    <div class="h-full w-full grid grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)] ">
      <CurrentTaskCard />
      <div class="h-[--layout-card-inset-padding]" />
      <TaskList />
    </div>
    <TaskDetail />
  </div>
</template>

<script setup lang="ts" name="Task">
  import CurrentTaskCard from "@/components/Task/CurrentTaskCard.vue";
  import TaskDetail from "@/components/Task/TaskDetail.vue";
  import TaskList from "@/components/Task/TaskList.vue";
</script>

<style scoped lang="scss">
</style>
