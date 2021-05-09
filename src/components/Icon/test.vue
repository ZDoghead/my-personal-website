<template>
  <div>
    <Icon
      v-for="t in types"
      :key="t"
      :type="t"
    />
  </div>
</template>

<script>
import Icon, { types } from './';

export default {
  components: {
    Icon
  },
  data() {
    return {
      types
    }
  }
}
</script>

<style lang="less" scoped>
div {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto;
}
.icon-container {
  font-size: 50px;
  margin: 0 10px;
  display: block;
}
</style>