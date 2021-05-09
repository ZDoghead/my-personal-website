<template>
  <div class="blog-list-container" v-loading="isLoading" ref="blogList">
    <ul>
      <li class="list-item" v-for="data in lastData" :key="data.id">
        <RouterLink
          :to="{
            name: 'blogDetail',
            params: {
              id: data.id,
            },
          }"
          class="pic"
          v-if="data.thumb"
        >
          <img v-lazy="data.thumb" :alt="data.title" :title="data.title" />
        </RouterLink>
        <div class="content">
          <RouterLink
            :to="{
              name: 'blogDetail',
              params: {
                id: data.id,
              },
            }"
            >{{ data.title }}</RouterLink
          >
          <div class="info">
            <span>日期：{{ data.createDate }}</span>
            <span>浏览：{{ data.scanNumber }}</span>
            <span>评论：{{ data.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'blogCategory',
                params: {
                  categoryId: data.category.id,
                },
              }"
              class="classify"
              >{{ data.category.name }}</RouterLink
            >
          </div>
          <p class="des">{{ data.description }}</p>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页组件 -->
    <Pager
      v-if="data.rows.length"
      :current="urlInfo.page"
      :limit="urlInfo.limit"
      :total="data.total"
      @pageChange="onPageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog";
import formatDate from "@/utils/formatDate";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from '@/components/Empty';
export default {
  mixins: [fetchData({total: 0, rows: []}), mainScroll("blogList")],
  components: {
    Pager,
    Empty
  },
  computed: {
    urlInfo() {
      // 需要 当前是第几页、页容量、分类id

      const page = this.$route.query.page ? +this.$route.query.page : 1;
      const limit = this.$route.query.limit ? +this.$route.query.limit : 10;
      let categoryId = -1;
      if (Object.keys(this.$route.params).length) {
        categoryId = this.$route.params.categoryId;
      }

      return {
        page,
        limit,
        categoryId,
      };
    },
    lastData() {
      if (!this.data.rows) {
        return [];
      }
      return this.data.rows.map((it) => {
        // 日期格式转换
        it.createDate = this.formatDate(+it.createDate);
        return it;
      });
    },
  },
  methods: {
    async fetchData() {
      const { page, limit, categoryId } = this.urlInfo;
      return await getBlogs(page, limit, categoryId);
    },
    formatDate,
    onPageChange(newPage) {
      // 需要改变url地址
      this.$refs.blogList.scrollTop = 0;
      this.$router.push({
        name: this.$route.name,
        params: {
          categoryId: this.urlInfo.categoryId,
        },
        query: {
          page: newPage,
          limit: this.urlInfo.limit,
        },
      });
    },
  },
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.data = await this.fetchData();
        this.isLoading = false;
      },
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth; // 滚动页面时平滑效果
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    .list-item {
      display: flex;
      padding-bottom: 15px;
      border-bottom: 1px solid @gray;
      margin-bottom: 30px;
      &:last-of-type {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
}
.pic {
  margin-right: 20px;
  img {
    border-radius: 7px;
    width: 250px;
    height: 200px;
  }
}
.content {
  a {
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: bold;
    color: @words;
    &:hover {
      color: @primary;
    }
  }
  .info {
    font-size: 13px;
    margin-top: 10px;
    color: @lightWords;
    span {
      margin-right: 15px;
    }
    .classify {
      margin-left: 20px;
      font-size: inherit;
      letter-spacing: inherit;
      color: inherit;
      &:hover {
        color: @primary;
      }
    }
  }
  .des {
    margin-top: 20px;
    margin-bottom: 0;
    color: @words;
    line-height: 1.5;
  }
}
</style>