import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "@/views/HomePage";

const routes = [{ path: "/", component: HomePage, name: "home" }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
