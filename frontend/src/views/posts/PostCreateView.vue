<script setup lang="ts">
import { AxiosError } from "axios";
import type { FormKitNode } from "@formkit/core";

import axiosInstance from "@/libraries/axios";
import router from "@/router";

type PostForm = { title: string; body: string };

const createPost = async (payload: PostForm, node?: FormKitNode) => {
  try {
    await axiosInstance.post("/dashboard/posts", payload);
    router.push("/dashboard/posts");
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 422) {
      node?.setErrors([], error.response?.data.errors);
    }
  }
};
</script>

<template>
  <section class="mt-6">
    <h1 class="text-3xl text-slate-200 p-4 text-center font-bold">สร้างโพสต์</h1>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      <FormKit type="form" submit-label="สร้างโพสต์" @submit="createPost">
        <FormKit type="text" label="หัวเรื่อง" name="title" :classes="{ input: 'text-white' }" />
        <FormKit type="textarea" label="เนื้อหา" name="body" :classes="{ input: 'text-white' }" />
      </FormKit>
    </div>
  </section>
</template>
