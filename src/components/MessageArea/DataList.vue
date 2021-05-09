<template>
  <ul class="data-list-container">
    <li class="comment-item" v-for="item in list" :key="item.id">
      <Avatar
        class="avatar"
        :url="item.avatar"
        :size="44"
      />
      <div class="comment-info">
        <div class="nickname">{{item.nickname}}</div>
        <div class="content">{{item.content}}</div>
        <div class="time">{{formatDate(item.createDate, true)}}</div>
      </div>
    </li>
    <div class="more" v-loading="isListLoading"></div>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import {formatDate} from '@/utils';
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    isListLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Avatar,
  },
  methods: {
    formatDate,
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.comment-item {
  display: flex;
  padding-bottom: 25px;
  border-bottom: 1px solid lighten(@gray, 15%);
  margin-bottom: 25px;
  .avatar {
    margin-right: 15px;
  }
  &:last-of-type {
    border: 0;
  }
}
.comment-info {
  font-family: Arial, Helvetica, sans-serif;
  flex: 1 1 auto;
  position: relative;
}
.nickname {
  font-weight: bold;
  margin-bottom: 15px;
  color: @success;
  letter-spacing: 1px;
}
.content {
  font-size: 15px;
  line-height: 1.2;
  letter-spacing: 1px;
}
.time {
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 13px;
  color: @gray;
}
.more {
  position: relative;
  margin-top: 20px;
}
</style>