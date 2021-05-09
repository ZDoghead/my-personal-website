<template>
  <div class="home-container" v-loading="loading">
    <ul
      class="carousel-container"
      ref="carouselDom"
      :style="{ marginTop }"
      @wheel="handleWheel"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :item="item" />
      </li>
    </ul>
    <div class="icon icon-up" @click="switchTo(index - 1)" v-show="index > 0">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      @click="switchTo(index + 1)"
      v-show="index < data.length - 1"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="point">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i === index }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";

export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, // 表示当前显示的版面
      eleHeight: 0, // 表示轮播图元素的高度
    };
  },
  computed: {
    marginTop() {
      return -this.eleHeight * this.index + "px";
    },
    ...mapState("banner", ["data", "loading"]),
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      // if (this.switching) {
      //   return;
      // }
      //
      // if (e.deltaY < 5 && e.deltaY > 0 && this.index < this.banners.length - 1) {
      //   this.switching = true;
      //   this.index ++;
      // } else if (e.deltaY > -5 && e.deltaY < 0 && this.index > 0) {
      //   this.switching = true;
      //   this.index --;
      // }

      // 这里使用节流来做
      if (e.deltaY > 0 && this.index < this.data.length - 1) {
        this.index++;
      } else if (e.deltaY < 0 && this.index > 0) {
        this.index--;
      }
    },
    onTransitionEnd() {
      this.switching = false;
    },
    // 节流
    throttle(bundler, wait) {
      let lastTime = 0;
      return (...args) => {
        const nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
          bundler.call(this, ...args);
          lastTime = nowTime;
        }
      };
    },
    onResize() {
      this.eleHeight = this.$refs.carouselDom.clientHeight;
    },
  },
  created() {
    this.handleWheel = this.throttle(this.handleWheel, 1000);
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.eleHeight = this.$refs.carouselDom.clientHeight;
    // 页面尺寸的变化会导致切换图片时产生bug
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  // 该属性使home-container元素变成块级格式化上下文(BFC)
  // 因为它的子元素ul使用margin移动时会出现外边距合并的现象
  overflow: hidden;
  // background-color: @dark;
}
.carousel-container {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  transition: 0.4s;
  li {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  cursor: pointer;
  color: @gray;
  @offset: 15px;
  &.icon-up {
    top: @offset;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    bottom: @offset;
    animation: jump-down 2s infinite;
  }
  @jump-dis: 10px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, -@jump-dis);
    }
    50% {
      transform: translate(-50%, @jump-dis);
    }
    100% {
      transform: translate(-50%, -@jump-dis);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, @jump-dis);
    }
    50% {
      transform: translate(-50%, -@jump-dis);
    }
    100% {
      transform: translate(-50%, @jump-dis);
    }
  }
}
.point {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    width: 7px;
    height: 7px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-bottom: 10px;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
  }
}
</style>