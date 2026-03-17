<script setup lang="ts">
// import { ref } from "vue";
// import type { User } from "@/types";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

// const user = ref<User | null>(null);
const auth = useAuthStore();
onMounted(() => {
  if (!auth.isLoggedIn) { auth.getUser(); }
});
</script>

<template>
  <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">Dashboard</h1>
  <div class="flex items-center justify-between">
    <div class="">
      <p class="text-lg text-slate-200">ยินดีต้อนรับ {{ auth.user?.name }}</p>
      <p class="text-sm text-slate-200">{{ auth.user?.email }}</p>
    </div>
    <button @click="auth.logout" class="btn btn-primary">Logout</button>
  </div>
</template>
