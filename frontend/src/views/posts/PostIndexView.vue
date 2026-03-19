<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TailwindPagination } from "laravel-vue-pagination";
import { EyeIcon } from "@heroicons/vue/24/solid";

import axiosInstance from "@/libraries/axios";
import type { Post } from "@/types";

type LaravelData = { data: Post[]; links: any; meta: any };

const posts = ref<LaravelData>({ data: [], links: {}, meta: {} });
const getPostList = async (page = 1) => {
  const response = await axiosInstance.get(`/dashboard/posts?page=${page}`);
  posts.value = response.data;
  // console.log(response);
};

onMounted(async () => { await getPostList(); });
</script>

<template>
  <div class="flex p-4 justify-end">
    <RouterLink :to="{ name: 'PostCreate' }">สร้างโพสต์</RouterLink>
  </div>
  <section>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 uppercase">
          <tr>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Slug</th>
            <th scope="col" class="px-6 py-3">Published</th>
            <th scope="col" class="px-6 py-3">Created</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="posts.data?.length > 0">
            <tr v-for="post in posts.data" :key="post.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ post.id }}</th>
              <td class="px-6 py-4">{{ post.title }}</td>
              <td class="px-6 py-4">{{ post.slug }}</td>
              <td class="px-6 py-4">{{ post.published }}</td>
              <td class="px-6 py-4">{{ post.created }}</td>
              <td class="px-6 py-4">
                <div class="flex space-x-4">
                  <RouterLink :to="{ name: 'PostShow', params: { id: post.id } }">
                    <EyeIcon class="w-5 h-5 text-blue-500 dark:text-blue-400 hover:text-blue-700"></EyeIcon>
                  </RouterLink>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="pt-4">
        <TailwindPagination :data="posts" @pagination-change-page="getPostList"></TailwindPagination>
      </div>
    </div>
  </section>
</template>
