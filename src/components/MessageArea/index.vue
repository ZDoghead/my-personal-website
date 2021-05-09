<template>
  <div class="message-area-container">
    <FormData v-on="$listeners" />
    <div class="title">
      <h2>{{ title }}</h2>
      <span>({{ subTitle }})</span>
    </div>
    <DataList :list="list" :isListLoading="isListLoading" />
  </div>
</template>

<script>
import FormData from "./FormData";
import DataList from "./DataList";
export default {
  components: {
    FormData,
    DataList,
  },
  props: {
    // 消息区域的标题
    title: {
      type: String,
      default: "",
    },
    // 消息区域的副标题
    subTitle: {
      type: String,
      default: "",
    },
    // 消息列表信息
    list: {
      type: Array,
      default: () => [],
    },
    // 列表是否在加载中
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.message-area-container {
  margin-bottom: 20px;
  padding: 20px;
  padding-top: 0;
  box-sizing: border-box;
}
.title {
  display: flex;
  margin: 20px 0;
  align-items: center;
  margin-bottom: 30px;
  h2 {
    margin: 0;
    font-size: 20px;
    margin-right: 10px;
  }
  span {
    font-weight: bold;
    font-size: 20px;
  }
}

</style>