<template>
  <i class="icon-container iconfont" :class="iconClass"></i>
</template>

<script>
// 图标类名映射表
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
};
// 导出是为了方便测试
export const types = Object.keys(classMap);
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    iconClass() {
      return classMap[this.type];
    }
  }
}
</script>

<style scoped>
@import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';
.icon-container {
  font-size: inherit;
  color: inherit;
}
</style>