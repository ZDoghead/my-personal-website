<template>
  <div>
    <Avatar url="https://img1.baidu.com/it/u=2669465948,2438487741&fm=26&fmt=auto&gp=0.jpg" :size="200" />
  </div>
</template>

<script>
import Avatar from './';

export default {
  components: {
    Avatar,
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
div {
  width: 250px;
  height: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  background-color: @dark;
}
</style>