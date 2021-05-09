<template>
  <div class="to-top-container" v-show="show" @click="handleClick">
    <Icon type="arrowUp" />
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      show: false,
      showLimit: 500,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(scrollDom) {
      if (!scrollDom) {
        this.show = false;
        return;
      }
      this.show = scrollDom.scrollTop > this.showLimit;
    },
    handleClick() {
      this.$bus.$emit('setScroll', 0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  background-color: @primary;
  color: #fff;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
}
</style>