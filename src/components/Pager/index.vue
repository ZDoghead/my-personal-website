<template>
  <div class="pager-container">
    <a :class="{disabled: current === 1}" @click="handleClick(1)">|&lt;</a>
    <a :class="{disabled: current === 1}" @click="handleClick(current - 1)">&lt;</a>
    <a
      v-for="(n, i) in visiblePage"
      :key="i"
      :class="{active: n === current}"
      @click="handleClick(n)"
    >{{n}}</a>
    <a :class="{disabled: current === totalPageNumber}" @click="handleClick(current + 1)">&gt;</a>
    <a :class="{disabled: current === totalPageNumber}" @click="handleClick(totalPageNumber)">&gt;|</a>
  </div>
</template>

<script>
export default {
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1
    },
    // 总的数据量
    total: {
      type: Number,
      default: 0
    },
    // 页容量
    limit: {
      type: Number,
      default: 10
    },
    // 可见页码数
    visibleNumber: {
      type: Number,
      default: 10
    }
  },
  computed: {
    // 总页数
    totalPageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 最小可见页码
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    // 最大可见页面
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.totalPageNumber) {
        max = this.totalPageNumber;
      }
      return max;
    },
    // 当前可见的页码
    visiblePage() {
      const arr = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    handleClick(newPage) {
      // 处理边界情况，提升效率
      if (newPage < 1 || newPage > this.totalPageNumber) {
        return;
      }
      if (newPage === this.current) {
        return;
      }
      // 需要改动父组件传来的数据，应该交给父组件去改
      this.$emit('pageChange', newPage);
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/global.less';
@import '~@/styles/var.less';

.pager-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;

  a {
    margin: 0 6px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 7px;
    border: 1px solid @primary;
    padding: 2px;
    transition: .3s;

    &:hover {
      &:not(.disabled) {
        background-color: @primary;
        color: #fff;
      }
    }

    &.disabled {
      border-color: @gray;
      color: @gray;
      cursor: not-allowed;
    }

    &.active {
      background-color: @primary;
      color: #fff;
      cursor: auto;
    }
  }
}
</style>