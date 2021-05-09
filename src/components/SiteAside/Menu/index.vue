<template>
  <div class="menu-container">
    <router-link
      class="item-link"
      v-for="(item, i) in itemList"
      :key="i"
      :to="{ name: item.name }"
      :exact="item.exact"
      active-class="selected"
      exact-active-class=""
    >
      <Icon :type="item.iconType" />
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      itemList: [
        {
          title: "首页",
          name: "home",
          iconType: "home",
          exact: true,
        },
        {
          title: "文章",
          name: "blog",
          iconType: "blog",
          exact: false,
        },
        {
          title: "关于我",
          name: "about",
          iconType: "about",
          exact: true,
        },
        {
          title: "项目&效果",
          name: "project",
          iconType: "code",
          exact: true,
        },
        {
          title: "留言板",
          name: "message",
          iconType: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.menu-container {
  width: 100%;
  background-color: transparent;
}

.item-link {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  padding-left: 40px;
  background-color: transparent;
  color: @gray;
  box-sizing: border-box;
  transition: 0.3s;

  .icon-container {
    margin-right: 10px;
  }

  &.selected {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  &:hover {
    color: #fff;
  }
}
</style>