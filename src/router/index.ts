import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LocalCache from "@/utils/csche";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    component: () => import("@/views/Login/Index.vue")
  },
  {
    path: "/main",
    component: () => import("@/views/main/main.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach(to => {
  if (to.path !== "/login") {
    const token = LocalCache.getCache("token");
    if (!token){
      return '/login'
    }
  }
});
export default router;
