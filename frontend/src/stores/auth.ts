import { ref } from "vue";
import { defineStore } from "pinia";
import { AxiosError } from "axios";
import type { FormKitNode } from "@formkit/core";

import axiosInstance from "@/libraries/axios";
import type { LoginForm, RegisterForm, User } from "@/types";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoggedIn = ref<boolean>(false);

  const register = async (payload: RegisterForm, node?: FormKitNode) => {
    await axiosInstance.get("/sanctum/csrf-cookie", { baseURL: "http://localhost:8000" });
    try {
      const response = await axiosInstance.post("/register", payload);
      // console.log(response.data);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.status === 422) {
        // errors.name = error.response.data.errors.name;
        // errors.email = error.response.data.errors.email;
        // errors.password = error.response.data.errors.password;
        node?.setErrors([], error.response?.data.errors);
      }
    }
  };

  const login = async (payload: LoginForm, node?: FormKitNode) => {
    await axiosInstance.get("/sanctum/csrf-cookie", { baseURL: "http://localhost:8000" });
    try {
      const response = await axiosInstance.post("/login", payload);
      // console.log(response.data);
      await getUser();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.status === 422) {
        // errors.email = error.response.data.errors.email;
        // errors.password = error.response.data.errors.password;
        node?.setErrors([], error.response?.data.errors);
      }
    }
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/user");
      // console.log(response.data);
      user.value = response.data;
      isLoggedIn.value = true;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/logout");
      // console.log(response.data);
      user.value = null;
      isLoggedIn.value = false;
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return { user, isLoggedIn, register, login, getUser, logout };
}, {
  persist: {
    storage: sessionStorage,
    pick: ["user", "isLoggedIn"],
  }
});
