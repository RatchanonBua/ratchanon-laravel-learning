<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TailwindPagination } from "laravel-vue-pagination";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { usePostStore } from "@/stores/post";
import Loading from "@/components/Loading.vue";

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const page = ref<number>(Number(route.query.page) || 1);

onMounted(async () => {
  await postStore.getPosts(page.value);
});

watch(page, async () => {
  await postStore.getPosts(page.value);
  await router.push({ query: { page: page.value } });
});
</script>

<template>
  <div class="flex p-4 justify-end mt-6">
    <RouterLink :to="{ name: 'PostCreate' }">สร้างโพสต์</RouterLink>
  </div>
  <section>
    <template v-if="postStore.isLoading">
      <Loading />
    </template>
    <template v-else>
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
            <template v-if="postStore.postsCollection">
              <tr v-for="post in postStore.postsCollection.data" :key="post.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ post.id }}</th>
                <td class="px-6 py-4">{{ post.title }}</td>
                <td class="px-6 py-4">{{ post.slug }}</td>
                <td class="px-6 py-4">{{ post.published }}</td>
                <td class="px-6 py-4">{{ post.created }}</td>
                <td class="px-6 py-4">
                  <div class="flex space-x-4">
                    <RouterLink :to="{ name: 'PostShow', params: { slug: post.slug } }">
                      <EyeIcon class="w-5 h-5 text-blue-500 dark:text-blue-400 hover:text-blue-700"></EyeIcon>
                    </RouterLink>
                    <RouterLink :to="{ name: 'PostEdit', params: { slug: post.slug } }">
                      <PencilSquareIcon class="w-5 h-5 text-green-500 dark:text-green-400 hover:text-green-700"></PencilSquareIcon>
                    </RouterLink>
                    <TrashIcon @click="postStore.deletePost(page, post.slug)" class="w-5 h-5 text-red-500 dark:text-red-400 hover:text-red-700"></TrashIcon>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <template v-if="postStore.postsCollection">
        <div class="py-4 pagination">
          <TailwindPagination :data="postStore.postsCollection" @pagination-change-page="page = $event"></TailwindPagination>
        </div>
      </template>
    </template>
  </section>
</template>
