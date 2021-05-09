<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`${data.total}`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getMessages, postMessage } from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
import { debounce } from "@/utils";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  components: {
    MessageArea,
  },
  created() {
    this.handleScrollDebounce = debounce(this.handleMsgScroll);
    this.$bus.$on("mainScroll", this.handleScrollDebounce);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScrollDebounce);
  },
  methods: {
    async fetchData() {
      return await getMessages(this.page, this.limit);
    },
    async handleSubmit(msgInfo, callback) {
      const res = await postMessage(msgInfo);
      this.data.rows.unshift(res);
      this.data.total++;
      callback("感谢您的留言");
    },
    handleMsgScroll(scrollDom) {
      if (!scrollDom) {
        return;
      }
      // scrollHeight与scrollTop+clientHeight的差在0-100的范围内，认为需要加载下一页的评论数据
      const range = 100;
      const distanceBottom = Math.abs(
        scrollDom.scrollTop + scrollDom.clientHeight - scrollDom.scrollHeight
      );
      if (distanceBottom <= range) {
        this.fetchMore();
      }
    },
    async fetchMore() {
      // 当评论列表长度超过了总评论数，就没有更多的数据了
      if (this.data.rows.length >= this.data.total) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const res = await this.fetchData();
      this.data.total = res.total;
      this.data.rows = this.data.rows.concat(res.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.message-container {
  height: 100%;
  overflow: auto;
  padding: 20px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 900px;
  margin: 0 auto;
}
</style>