import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

const _import = (path: string) =>
  defineAsyncComponent(() => import(`../views/${path}.vue`));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: _import("HomeView"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: _import("AboutView"),
    },
  ],
  sensitive: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
