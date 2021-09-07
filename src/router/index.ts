import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Login/Index.vue")
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () => import("@/views/About.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
