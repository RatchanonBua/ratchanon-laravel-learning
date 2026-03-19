<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

import axiosInstance from "@/libraries/axios";
import type { Post } from "@/types";

const route = useRoute();
const post = ref<Post | null>(null);

const getPostData = async (id: string | string[] | undefined) => {
  if (id === undefined) return;
  try {
    const { data } = await axiosInstance.get(`/dashboard/posts/${id}`);
    post.value = data.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

watch(() => route.params.id, (id) => getPostData(id), { immediate: true });
</script>

<template>
  <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">{{ post?.title }}</h1>
  <span class="text-sm text-slate-200 p-4 flex justify-center">โพสต์เมื่อ: {{ post?.created }}</span>
  <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
    {{ post?.body }}
  </div>
</template>
