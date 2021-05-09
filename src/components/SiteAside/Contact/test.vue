<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
import "@/styles/global.less";

export default {
  components: {
    Contact,
  },
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.test-container {
  width: 300px;
  height: 500px;
  background-color: @dark;
  margin: 0 auto;
}
</style>