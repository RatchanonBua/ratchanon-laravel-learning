<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import type { FormKitNode } from "@formkit/core";

import { usePostStore } from "@/stores/post";
import type { PostForm } from "@/types";

const route = useRoute();
const postStore = usePostStore();

const handleUpdate = async (payload: PostForm, node?: FormKitNode) => {
  await postStore.updatePost(String(route.params.slug), payload, node);
};

watch(() => route.params.slug, (slug) => postStore.getPost(String(slug)), { immediate: true });
</script>

<template>
  <section v-if="postStore.post && !postStore.isLoading" class="mt-6">
    <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">แก้ไข: {{ postStore.post?.title }}</h1>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      <FormKit type="form" submit-label="แก้ไขโพสต์" @submit="handleUpdate">
        <FormKit type="text" label="หัวเรื่อง" name="title" :value="postStore.post?.title" :classes="{ input: 'text-white' }" />
        <FormKit type="textarea" label="เนื้อหา" name="body" :value="postStore.post?.body" :classes="{ input: 'text-white' }" />
      </FormKit>
    </div>
  </section>
</template>
