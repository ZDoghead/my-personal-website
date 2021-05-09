<template>
  <div class="carousel-item-container" ref="container" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <div class="image" ref="image" :style="[imagePosition]">
      <ImageLoader 
        :src="item.bigImg" 
        :placeholder="item.midImg" 
        @load="loaded"
      />
    </div>
    <h2 :style="textStyle">{{item.title}}</h2>
    <p :style="textStyle">{{item.description}}</p>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader';

export default {
  props: ['item'],
  components: {
    ImageLoader
  },
  data() {
    return {
      textStyle: {
        opacity: 0,
        transform: 'translateY(-15px)'
      },
      containerSize: null,  // 组件最外层元素的尺寸
      imageSize: null,  // 图片容器的尺寸
      mouseX: 0,  // 鼠标的横坐标
      mouseY: 0, // 鼠标的纵坐标
    }
  },
  methods: {
    loaded() {
      this.textStyle = {
        opacity: 1,
        transform: 'translateY(0px)'
      }
    },
    onMouseMove(e) {
      // container的坐标
      const rect = this.$refs.container.getBoundingClientRect();

      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    getKeySize() {
      // container的宽高
      const containerWidth = this.$refs.container.clientWidth;
      const containerHeight = this.$refs.container.clientHeight;
      // image的宽高
      const imageWidth = this.$refs.image.clientWidth;
      const imageHeight = this.$refs.image.clientHeight;

      this.containerSize = {
        width: containerWidth,
        height: containerHeight,
      }
      this.imageSize = {
        width: imageWidth,
        height: imageHeight
      }
    },
    onSizeChange() {
      this.getKeySize();
    },
    onMouseLeave() {
      this.mouseX = this.containerSize.width / 2;
      this.mouseY = this.containerSize.height / 2;
    }
  },
  computed: {
    imagePosition() {
      if (!this.imageSize || !this.containerSize) {
        return;
      }
      // image与container最大的宽高差
      const extraWidth = this.imageSize.width - this.containerSize.width;
      const extraHeight = this.imageSize.height - this.containerSize.height;

      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;

      return {
        transform: `translate(${left}px, ${top}px)`
      }
    },
    mousePosition() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2
      }
    }
  },
  mounted() {
    this.getKeySize();

    this.mouseX = this.mousePosition.x
    this.mouseY = this.mousePosition.y
    
    
    window.addEventListener('resize', this.onSizeChange);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onSizeChange);
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.carousel-item-container {
  width: 100%;
  height: 100%;
  // background-color: @dark;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.image {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0px, 0px);
  transition: .3s linear;
}
.image-loader-container {
  height: 100%;
}
h2, p {
  position: absolute;
  left: 50px;
  text-shadow: 1px 0 0 rgba(0, 0, 0, .5),
               0 1px 0 rgba(0, 0, 0, .5),
               -1px 0 0 rgba(0, 0, 0, .5),
               0 -1px 0 rgba(0, 0, 0, .5);
  color: rgba(255, 255, 255, .9);
}
h2 {
  top: calc(50% - 80px);
  font-size: 30px;
  transition: 1s;
  letter-spacing: .3em;
}
p {
  top: calc(50% + 10px);
  font-size: 20px;
  transition: 1s 1s;
  letter-spacing: .7em;
}
</style>