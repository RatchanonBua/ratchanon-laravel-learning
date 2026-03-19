<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import axiosInstance from "@/libraries/axios";
import type { Post } from "@/types";

const route = useRoute();
const post = ref<Post | null>(null);

const getPostData = async (slug: string) => {
  if (slug === undefined) return;
  try {
    const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`);
    post.value = data.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

watch(() => route.params.slug, (slug) => getPostData(String(slug)), { immediate: true });
</script>

<template>
  <section class="mt-6">
    <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">{{ post?.title }}</h1>
    <span class="text-sm text-slate-200 p-4 flex justify-center">โพสต์เมื่อ: {{ post?.created }}</span>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      {{ post?.body }}
    </div>
  </section>
</template>
