<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute();
const postStore = usePostStore();

watch(() => route.params.slug, (slug) => postStore.getPost(String(slug)), { immediate: true });
</script>

<template>
  <section v-if="postStore.post && !postStore.isLoading" class="mt-6">
    <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">{{ postStore.post?.title }}</h1>
    <span class="text-sm text-slate-200 p-4 flex justify-center">โพสต์เมื่อ: {{ postStore.post?.created }}</span>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      {{ postStore.post?.body }}
    </div>
  </section>
</template>
