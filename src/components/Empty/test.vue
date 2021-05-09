<template>
  <div class="test">
    <Empty />
  </div>
</template>

<script>
import Empty from './';

export default {
  components: {
    Empty
  }
}
</script>

<style lang="less" scoped>
.test {
  width: 400px;
  height: 600px;
  border: 1px solid black;
  background-color: #eee;
  margin: 100px auto;
  position: relative;
}
</style>