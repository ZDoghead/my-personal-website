<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h1 v-if="data.length">文章列表</h1>
    <!-- 使用层级列表插件 -->
    <LevelList v-if="data.length" :list="list" @activeChange="onActiveChange" />
  </div>
</template>

<script>
import LevelList from "./LevelList";
import { getBlogTypes } from "@/api/blog";
import fetchData from "@/mixins/fetchData.js";
export default {
  mixins: [fetchData([])],
  components: {
    LevelList,
  },
  computed: {
    categoryId() {
      let categoryId = -1;
      if (Object.keys(this.$route.params).length) {
        categoryId = +this.$route.params.categoryId;
      }

      return categoryId;
    },
    list() {
      const all = {
        // 定义全部分类的数据
        id: -1,
        name: "全部分类",
        isActive: false,
        articleCount: this.data.reduce((a, b) => a + b.articleCount, 0),
      };
      if (this.categoryId === -1) {
        all.isActive = true;
      }

      // 将请求到的数据转换为对应的分类格式
      const dataMap = this.data.map((it) => {
        return {
          id: it.id,
          name: it.name,
          isActive: it.id === this.categoryId,
          articleCount: it.articleCount,
        };
      });
      return [all, ...dataMap];
    },
  },
  methods: {
    async fetchData() {
      return await getBlogTypes();
    },
    onActiveChange(item) {
      if (item.id === this.categoryId) {
        return;
      }
      if (item.id !== -1) {
        this.$router.push({
          name: "blogCategory",
          params: {
            categoryId: item.id,
          },
          query: {
            page: 1,
            limit: 10,
          },
        });
      } else {
        this.$router.push({
          name: "blog",
          params: {
            categoryId: item.id,
          },
          query: {
            page: 1,
            limit: 10,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  height: 100%;
  position: relative;
  padding-left: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>