<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="mainContainer">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :list="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogTOC from "./components/BlogTOC";
import BlogDetail from "./components/BlogDetail";
import BlogComment from "./components/BlogComment";
import { getBlog } from "@/api/blog";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll.js";

export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogTOC,
    BlogDetail,
    BlogComment,
  },
  computed: {
    blogId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async fetchData() {
      // 请求需要的数据
      return await getBlog(this.blogId);
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
}
.right-container {
  position: relative;
  width: 300px;
  height: 100%;
}
</style>