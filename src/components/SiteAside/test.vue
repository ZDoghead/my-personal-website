<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from './';
import '@/styles/global.less';

export default {
  components: {
    SiteAside
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.test-container {
  width: 250px;
  height: 900px;
  background-color: @dark;
  margin: 0 auto;
}
</style>