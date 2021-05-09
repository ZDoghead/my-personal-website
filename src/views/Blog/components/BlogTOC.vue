<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <LevelList :list="listMap" @activeChange="onActiveChange" />
  </div>
</template>

<script>
import LevelList from "./LevelList";
import {debounce} from '@/utils';

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeAnchor: "",
      range: 100, // 标题元素距离视口顶部的有效范围，为了激活目录
    };
  },
  computed: {
    paragraphId() {
      // 获取url中的hash
      return this.$route.hash;
    },
    listMap() {
      // 根据activeAnchor得到isActive属性，对目录进行映射，得到带有isActive属性的目录数组
      const TOCMap = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isActive: t.anchor === this.activeAnchor,
          children: TOCMap(t.children),
        }));
      };
      return TOCMap(this.list);
    },
    // 根据目录中的anchor属性，得到页面中对应id的HTML元素
    doms() {
      const doms = [];
      const getDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            getDoms(t.children);
          }
        }
      };
      getDoms(this.list);
      return doms;
    },
  },
  components: {
    LevelList,
  },
  created() {
    this.setActiveDebounce = debounce(this.setActive, 100);  // 防抖
    this.$bus.$on('mainScroll', this.setActiveDebounce);
  },
  beforeDestroy() {
    this.$bus.$off('mainScroll', this.setActiveDebounce);
  },
  methods: {
    onActiveChange(tocInfo) {
      location.hash = tocInfo.anchor;
    },
    // 设置正确的activeAnchor
    setActive(scrollDom) {
      if (!scrollDom) {
        return;
      }
      this.activeAnchor = "";
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= this.range) {
          // 元素距离视口顶部在有效范围内
          this.activeAnchor = dom.id;
        } else if (top > this.range) {
          // 元素距离视口顶部大于了有效范围
          return;
        } else {
          // 元素距离视口顶部为负数
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  width: 300px;
  height: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>