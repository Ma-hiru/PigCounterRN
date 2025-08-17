import { createRouter, createWebHashHistory } from "vue-router";
import constantRoutes from "./constantRoutes.ts";
import { beforeEach, onErr } from "@/vueRouter/permission.ts";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});
router.beforeEach(beforeEach);
router.onError(onErr);

export default router;
