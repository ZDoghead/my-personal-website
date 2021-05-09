<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div 
      class="project-item"
      v-for="item in data"
      :key="item.id"
    >
      <div class="img">
        <a 
          :href="item.url ? item.url : 'javascript:void(0)'"
        >
          <img v-lazy="item.thumb" :alt="item.name">
        </a>
      </div>
      <div class="content">
        <h2 class="title">
          <a
            :href="item.url ? item.url : 'javascript:void(0)'"
          >{{item.name}}</a>
        </h2>
        <a 
          class="github"
          :href="item.github ? item.github : 'javascript:void(0)'"  
          target="_blank"
          v-if="item.github"
        >github</a>
        <p
          v-for="(des, i) in item.description"
          :key="i"
        >{{des}}</p>
      </div>
    </div>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mainScroll from '@/mixins/mainScroll.js';
import Empty from '@/components/Empty';
export default {
  components: {
    Empty
  },
  mixins: [mainScroll('projectContainer')],
  computed: mapState('project', ['loading', 'data']),
  created() {
    this.$store.dispatch('project/fetchProject');
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.project-container {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  scroll-behavior: smooth;
}
.project-item {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  transition: .3s;
  margin-bottom: 20px;
  .img {
    width: 300px;
    height: 250px;
    margin-right: 15px;
    overflow: hidden;
    border-radius: 5px;
    flex: 0 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 1 1 auto;
    .title {
      margin: 0;
      margin-bottom: 15px;
      a {
        color: @words;
        &:hover {
          color: @primary;
        }
      }
    }
    p {
      margin: 0;
      margin-bottom: 10px;
    }
    .github {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
  &:hover {
    box-shadow: 0 0 6px 0 gray;
  }
  &:last-of-type {
    margin: 0;
  }
}
</style>