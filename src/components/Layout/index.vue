<template>
  <div class="layout-container">
    <!-- 左侧边栏 -->
    <div class="aside">
      <slot name="left"></slot>
    </div>
    <!-- 中间区域 -->
    <div class="main">
      <slot></slot>
    </div>
    <!-- 右侧边栏 -->
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
}
// 不能设置大小，需要通过其子元素撑开，子元素来自父元素
.aside,
.right {
  flex: 0 0 auto;
  overflow: hidden;
}
.main {
  flex: 1 1 auto;
  overflow: hidden;
  word-break: break-all;
}
</style>