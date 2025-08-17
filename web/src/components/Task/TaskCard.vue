<template>
  <div
    class="custom-card shadow-2xl"
    :class="flexible && 'btn'"
    id="custom-card"
  >
    <div
      class="title w-full grid grid-rows-1 grid-cols-[auto_minmax(0,1fr)] justify-items-end select-none"
      v-if="title"
    >
      {{ title }}
      <slot name="title-right" />
    </div>
    <ReactComponent v-if="title" :component="themedDivider" :props="styles" alone />
    <slot name="default" />
  </div>
</template>

<script setup lang="tsx" name="TaskCard">
  import { ref } from "vue";
  import { FC } from "react";
  import { Divider, ConfigProvider } from "antd";
  import ReactComponent from "@/hooks/ReactComponent.vue";
  import { createAntdTheme } from "@/utils/createAntdTheme.ts";


  type props = {
    title?: string;
    flexible?: boolean;
  }
  type themedDividerProps = typeof Divider extends FC<infer P> ? P : never;
  const { title, flexible } = defineProps<props>();
  const styles = ref({
    style: {
      marginTop: "calc(0.5*var(--layout-card-inset-padding))",
      marginBottom: "0",
      height: "calc(0.5*var(--layout-card-inset-padding))",
      marginLeft: "0",
      marginRight: "0"
    }
  });
  const theme = createAntdTheme({
    divider: {
      Divider: {
        colorSplit: "var(--layout-card-divider-color)"
      }
    }
  });
  const themedDivider: FC<themedDividerProps> = (props) => {
    return (
      <ConfigProvider theme={theme.divider}>
        <Divider {...props} />
      </ConfigProvider>
    );
  };
</script>

<style scoped lang="scss">
  #custom-card {
    padding: var(--layout-card-inset-padding);
    background: var(--layout-task-card-content-bg);
    border-radius: 0.5rem;
    margin-top: 0;
    color: var(--task-currentTask-content-color);
    border-width: 0;
    height: auto;
    overflow-y: hidden;

    .title {
      font-weight: bold;
      height: var(--layout-card-inset-padding);
      line-height: var(--layout-card-inset-padding);
    }
  }

  .custom-card {
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;
    display: block;
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
