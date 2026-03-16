<script setup lang="ts">
import axiosInstance from "@/libraries/axios";
import { ref } from "vue";

const user = ref({ name: "", email: "" });

const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    user.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    user.value = { name: "", email: "" };
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getUser();
</script>

<template>
  <h1 class="text-3xl text-slate-200">Dashboard</h1>
  <div class="flex items-center justify-between">
    <div class="">
      <p class="text-lg text-slate-200">ยินดีต้อนรับ {{ user?.name }}</p>
      <p class="text-sm text-slate-200">{{ user?.email }}</p>
    </div>
    <button @click="logout" class="btn btn-primary">Logout</button>
  </div>
</template>
