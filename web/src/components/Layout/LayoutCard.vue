<template>
  <div class="custom-card shadow-2xl h-[--layout-card-height-calc] w-[--layout-card-width-calc]" style="margin: var(--layout-content-padding); ">
    <slot name="default" />
  </div>
</template>

<script setup lang="ts" name='LayoutCard'>

</script>

<style scoped lang="scss">
  .custom-card {
    padding: var(--layout-card-inset-padding);
    background: var(--layout-card-content-bg);
    border-radius: 0.5rem;
    backdrop-filter: blur(0.5rem);
    transition: all 0.5s ease-in-out;
    overflow: hidden;
  }
</style>
