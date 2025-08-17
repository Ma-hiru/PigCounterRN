<template>
  <router-view />
</template>

<script setup lang="ts" name="App">
  import { onMounted } from "vue";

  onMounted(() => {
    if (localStorage.getItem("darkMode") === "true") {
      document.documentElement.classList.toggle("darkMode");
      document.documentElement.classList.toggle("dark");
    }
  });
</script>

<style scoped lang="scss"></style>
