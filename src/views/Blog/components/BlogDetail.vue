<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ publishDate }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#comment-area">评论：{{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'blogCategory',
          params: {
            categoryId: blog.category.id,
          },
        }"
        >{{ blog.category.name }}</RouterLink
      >
    </div>
    <div class="main-container markdown-body" v-html="blog.htmlContent"></div>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate";
import "@/styles/markdown.css";
import "highlight.js/styles/github.css";
import {titleController} from '@/utils';

export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  created() {
    titleController.setRouteTitle(this.blog.title);
  },
  computed: {
    // 获取格式化后的时间
    publishDate() {
      return this.formatDate(+this.blog.createDate);
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-detail-container {
  padding: 20px;
  box-sizing: border-box;
  h1 {
    margin: 0;
    margin-bottom: 20px;
  }
}
.aside {
  font-size: 14px;
  color: @gray;
  span {
    margin-right: 15px;
  }
  a {
    color: @gray;
    margin-right: 15px;
    &:hover {
      color: @primary;
    }
  }
}
.main-container {
  margin: 20px 0;
}
</style>