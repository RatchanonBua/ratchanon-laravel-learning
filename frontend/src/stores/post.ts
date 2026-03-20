import { ref } from "vue";
import { defineStore } from "pinia";
import { AxiosError } from "axios";
import type { FormKitNode } from "@formkit/core";

import axiosInstance from "@/libraries/axios";
import type { LaravelResponseCollection, Post, PostForm } from "@/types";
import router from "@/router";

export const usePostStore = defineStore("post", () => {
  const postsCollection = ref<LaravelResponseCollection<Post> | null>(null);
  const post = ref<Post | null>(null);
  const isLoading = ref<boolean>(false);

  const getPosts = async (page: number = 1) => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/dashboard/posts?page=${page}`);
      postsCollection.value = response.data;
      // console.log("getPosts", response);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const getPost = async (slug: string) => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/dashboard/posts/${slug}`);
      post.value = response.data.data;
      // console.log("getPost", response);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const createPost = async (payload: PostForm, node?: FormKitNode) => {
    try {
      await axiosInstance.post("/dashboard/posts", payload);
      await router.push(`/dashboard/posts`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data.errors);
      }
    }
  };

  const updatePost = async (slug: string, payload: PostForm, node?: FormKitNode) => {
    try {
      await axiosInstance.put(`/dashboard/posts/${slug}`, payload);
      await router.push(`/dashboard/posts`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        node?.setErrors([], error.response?.data.errors);
      }
    }
  };

  const deletePost = async (page: number, slug: string) => {
    isLoading.value = true;
    try {
      await axiosInstance.delete(`/dashboard/posts/${slug}`);
      await getPosts(page);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { postsCollection, post, isLoading, getPosts, getPost, createPost, updatePost, deletePost };
});
