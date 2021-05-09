<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from '../Icon';

export default {
  props: {
    text: {
      type: String,
      default: '无数据'
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/mixin.less';

.icon-container {
  font-size: 100px;
}
.empty-container {
  .self-center();

  color: @lightWords;
  text-align: center;
}
</style>