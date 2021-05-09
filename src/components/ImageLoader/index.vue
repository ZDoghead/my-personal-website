<template>
  <div 
    class="image-loader-container"
  >
    <img
      class="placeholder"
      :src="placeholder"
      v-if="!isEverythingDone"
    />
    <img 
      :src="src"
      :style="{opacity: originLoaded, transition: `${duration}ms`}"
      @load="imageLoad"
    />
  </div>
</template>

<script>

export default {
  props: {
    // 原始图片地址
    src: {
      type: String,
      required: true
    },
    // 占位图片地址
    placeholder: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      isLoaded: false,  // 原始图是否加载完成
      isEverythingDone: false,  // 所有一切是否都已就绪
    }
  },
  computed: {
    originLoaded() {
      return this.isLoaded ? 1 : 0;
    }
  },
  methods: {
    imageLoad() {
      this.isLoaded = true;
      // 处理原图加载完后，占位图消失闪白问题
      setTimeout(() => {
        this.isEverythingDone = true;
        this.$emit('load');
      }, this.duration);
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';

.image-loader-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    height: 100%;
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>