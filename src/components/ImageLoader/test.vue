<template>
  <ImageLoader 
    src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
    placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
    :duration="1000"
    @load="handleLoad"
  />
</template>

<script>
import ImageLoader from './';

export default {
  components: {
    ImageLoader
  },
  methods: {
    handleLoad() {
      console.log('都加载完成了')
    }
  }
}
</script>

<style lang="less" scoped>
.image-loader-container {
  width: 700px;
  height: 450px;
}
</style>