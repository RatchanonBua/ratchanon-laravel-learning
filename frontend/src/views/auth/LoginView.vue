<script setup lang="ts">
import axiosInstance from "@/libraries/axios";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";
import { reactive } from "vue";

interface LoginForm {
  email: string;
  password: string;
}

const form = reactive<LoginForm>({ email: "", password: "" });
const errors = reactive({ email: [], password: [] });

const login = async (payload: LoginForm, node?: FormKitNode) => {
  // Set Cookie
  await axiosInstance.get("/sanctum/csrf-cookie", { baseURL: "http://localhost:8000" });
  // Clear Errors
  errors.email = [];
  errors.password = [];
  // Axios Request
  try {
    const response = await axiosInstance.post("/login", payload);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError && error.response?.status === 422) {
      // errors.email = error.response.data.errors.email;
      // errors.password = error.response.data.errors.password;
      node?.setErrors([], error.response?.data.errors);
    }
  }
};
</script>

<template>
  <h1 class="text-3xl text-slate-200 p-4 text-center">เข้าสู่ระบบ</h1>
  <!-- FormKit -->
  <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
    <FormKit type="form" submit-label="เข้าสู่ระบบ" @submit="login">
      <FormKit type="email" label="ที่อยู่อีเมล" name="email" />
      <FormKit type="password" label="รหัสผ่าน" name="password" />
    </FormKit>
  </div>
  <!-- Tailwind CSS -->
  <!-- <form @submit.prevent="login(form)" class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ที่อยู่อีเมล</label>
      <input type="email" id="email" v-model="form.email" class="outline-none focus:ring-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john@doe.com" autocomplete="off" />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2.5 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
      <input type="password" id="password" v-model="form.password" class="outline-none focus:ring-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" autocomplete="off" />
      <template v-if="errors.email?.length">
        <span v-for="error in errors.email" :key="error" class="text-red-500 text-xs italic block mt-5">{{ error }}</span>
      </template>
      <template v-if="errors.password?.length && !errors.email?.length">
        <span v-for="error in errors.password" :key="error" class="text-red-500 text-xs italic block mt-5">{{ error }}</span>
      </template>
    </div>
    <div class="flex items-start mb-5">
      <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="text-blue-700 dark:text-blue-600 cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
      </div>
      <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">จดจำการเข้าสู่ระบบ</label>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เข้าสู่ระบบ</button>
  </form> -->
</template>
