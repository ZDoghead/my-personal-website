<template>
  <div id="comment-area" class="blog-comment-container">
    <MessageArea
      :title="title"
      :subTitle="`${data.total}`"
      :list="data.rows"
      :isListLoading="isLoading"
      v-if="data.rows.length"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, commitComment } from "@/api/blog";
import { debounce } from "@/utils";

export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      title: "评论列表",
    };
  },
  created() {
    this.handleScrollDebounce = debounce(this.handleScroll);
    this.$bus.$on("mainScroll", this.handleScrollDebounce);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScrollDebounce);
  },
  methods: {
    // 请求数据的函数，请求数据时是否显示加载动画
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
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
    async handleSubmit(commentInfo, callback) {
      // 提交评论
      const result = await commitComment(commentInfo);
      this.data.rows.unshift(result); // 增加评论
      this.data.total++; // 增加评论总数
      callback("感谢评论");
    },
    handleScroll(scrollDom) {
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
  },
};
</script>

<style scoped lang="less">
</style>