<template>
  <ul class="level-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span :class="{ active: item.isActive }" @click="handleClick(item)">{{
        item.name
      }}</span>
      <span
        class="blog-num"
        :class="{ active: item.isActive }"
        @click="handleClick(item)"
        v-if="item.articleCount"
        >{{ item.articleCount }}篇</span
      >
      <LevelList
        v-if="item.children"
        :list="item.children"
        @activeChange="handleClick"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "LevelList",
  props: {
    // [{name: 'a', isActive: true, articleCount: 32, children: [{...}]}, {name: 'b', isActive: false}, ......]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("activeChange", item);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.level-list-container {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    min-height: 40px;
    line-height: 40px;
    color: @lightWords;
    font-size: 14px;
    .level-list-container {
      margin-left: 1em;
    }
    span {
      cursor: pointer;
    }
    span.active {
      font-weight: bold;
      color: @warn;
    }
    .blog-num {
      margin-left: 20px;
      font-size: 14px;
    }
  }
}
</style>