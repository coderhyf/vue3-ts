import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import LocalCache from "@/utils/csche";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Index.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    children:[
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/views/not-found/not-found.vue")
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = LocalCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
});
export default router;
