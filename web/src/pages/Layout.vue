<template>
  <div
    class="w-screen h-screen grid grid-cols-1 grid-rows-[auto_1fr]"
    style="background: var(--layout-container-bg);
    background-blend-mode: multiply, multiply;"
  >
    <div ref="LayoutBarRef" />
    <LayoutCard>
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </LayoutCard>
  </div>
</template>

<script setup lang="ts" name='Layout'>
  import LayoutCard from "@/components/Layout/LayoutCard.vue";
  import { onMounted, useTemplateRef } from "vue";
  import { useReactComponent } from "@/hooks/useReactComponent.tsx";
  import LayoutBar from "@/components/Layout/LayoutBar.tsx";
  import { useRouter } from "vue-router";
  import { useCompanyStore } from "@/stores/pinia/modules/companyStore.ts";

  const { currentRoute, push, go } = useRouter();
  const companyStore = useCompanyStore();
  const LayoutBarRef = useTemplateRef("LayoutBarRef");
  useReactComponent(LayoutBar, LayoutBarRef, {
    currentRoute: currentRoute.value.path,
    setRoute: push,
    reload: () => go(0)
  });
  onMounted(async () => {
    await companyStore.getCompanyInfo();
    await companyStore.getCompanyBuildingsAndPens();
  });
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
