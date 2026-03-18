import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import DashboardView from "@/views/auth/DashboardView.vue";
import PostIndexView from "@/views/posts/PostIndexView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/posts",
      name: "PostIndex",
      component: PostIndexView,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/posts/create",
      name: "PostCreate",
      component: PostCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
    {
      path: "/500",
      name: "500",
      component: () => import("@/views/500.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isLoggedIn) {
    next({ name: "Login" });
  } else if (to.matched.some((record) => record.meta.requiresGuest) && auth.isLoggedIn) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
