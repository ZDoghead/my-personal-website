<template>
  <div class="not-found-container">
    <img src="@/assets/404.jpeg" :alt="404">
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.not-found-container {
  background: rgb(255, 247, 128);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>