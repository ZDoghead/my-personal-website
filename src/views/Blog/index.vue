<template>
  <div class="blog-container">
    <Layout>
      <!-- 中间区域 -->
      <template #default>
        <BlogList />
      </template>
      <!-- 右侧区域 -->
      <template #right>
        <BlogCategory />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout';
import BlogList from './components/BlogList';
import BlogCategory from './components/BlogCategory';
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory
  }
}
</script>

<style lang="less" scoped>
.blog-container {
  height: 100%;
}
</style>