<template>
  <!-- 头像组件 -->
  <img 
    class="avatar-container" 
    :src="url" 
    :style="{ 
      width: size + 'px', 
      height: size + 'px' 
    }"
  />
</template>

<script>
export default {
  props: {
    // 图片地址
    url: {
      type: String,
      required: true,
    },
    // 图片尺寸
    size: {
      type: Number,
      default: 150
    },
  },
};
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>