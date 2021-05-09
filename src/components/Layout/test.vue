<template>
  <div class="test-container">
    <Layout>
      <template v-slot:left>
        <div class="left">左侧边栏</div>
      </template>
      <div class="main">中间主区域</div>
      <template v-slot:right>
        <div class="right">右侧边栏</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './';

export default {
  components: {
    Layout
  }
}
</script>

<style scoped lang="less">
.test-container {
  width: 1000px;
  height: 700px;
  border: 2px solid;
  margin: 0 auto;
}
.left {
  width: 250px;
  background-color: red;
}
.main {
  background-color: #008c8c;
}
.right {
  width: 200px;
  background-color: pink;
}
</style>