<template>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
</template>

<script setup lang="ts" name="Company">

</script>

<style scoped lang="scss">
  .v-enter-active {
    transition: all 0.3s ease-in-out;
    transition-delay: 0.2s;
  }

  .v-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateX(5rem);
  }

  .v-enter-to,
  .v-leave-form {
    opacity: 1;
    transform: translateX(0px);
  }
</style>
