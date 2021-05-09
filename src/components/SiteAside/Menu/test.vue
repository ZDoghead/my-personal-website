<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
import "@/styles/global.less";

export default {
  components: {
    Menu,
  },
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.test-container {
  width: 300px;
  height: 600px;
  background-color: @dark;
  border: 2px solid red;
  margin: 0 auto;
}
</style>