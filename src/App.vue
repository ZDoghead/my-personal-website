<template>
  <div class="app-container">
    <Layout>
      <!-- 左侧 -->
      <template v-slot:left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <!-- 中间区域 -->
      <template v-slot:default>
        <div class="main">
          <router-view></router-view>
        </div>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from './components/Layout';
import SiteAside from './components/SiteAside';
import ToTop from './components/ToTop';

export default {
  components: {
    Layout,
    SiteAside,
    ToTop
  },
}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';

.app-container {
  .self-fill(fixed);
  height: 100%;
}
.aside {
  width: 270px;
  height: 100%;
}
.right {
  width: 0;
}
.main {
  height: 100%;
}
</style>