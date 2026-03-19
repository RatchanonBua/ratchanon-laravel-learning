<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { AxiosError } from "axios";
import type { FormKitNode } from "@formkit/core";

import axiosInstance from "@/libraries/axios";
import router from "@/router";
import type { Post } from "@/types";

const route = useRoute();
const post = ref<Post | null>(null);

const getPostData = async (slug: string) => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/posts/${slug}`);
    post.value = data.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (payload: Post, node: FormKitNode) => {
  // console.log(payload);
  if (post.value) {
    try {
      await axiosInstance.put(`/dashboard/posts/${post.value?.slug}`, payload);
      await router.push("/dashboard/posts");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data.errors);
      }
    }
  }
};

watch(
  () => route.params.slug,
  (slug) => getPostData(String(slug)),
  { immediate: true },
);
</script>

<template>
  <section v-if="post" class="mt-6">
    <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">แก้ไข: {{ post?.title }}</h1>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      <FormKit type="form" submit-label="แก้ไขโพสต์" @submit="updatePost">
        <FormKit type="text" label="หัวเรื่อง" name="title" :value="post?.title" :classes="{ input: 'text-white' }" />
        <FormKit type="textarea" label="เนื้อหา" name="body" :value="post?.body" :classes="{ input: 'text-white' }" />
      </FormKit>
    </div>
  </section>
</template>
