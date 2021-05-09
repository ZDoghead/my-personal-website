<template>
  <div class="site-aside-container">
    <div class="avatar" v-if="data">
      <Avatar :url="data.avatar" />
    </div>
    <h1 class="title">ZDoghead的小窝</h1>
    <div class="menu">
      <Menu />
    </div>
    <div class="contact">
      <Contact />
    </div>
    <p class="footer" v-if="data">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";

export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState("siteInit", ["data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.site-aside-container {
  background-color: @dark;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px 0;
  box-sizing: border-box;
}
.avatar {
  padding: 0 20px;
  box-sizing: border-box;
  .avatar-container {
    margin: 0 auto;
  }
}
.contact {
  font-size: 14px;
  margin-top: 100px;
}
.footer {
  color: @lightWords;
  font-size: 12px;
  text-align: center;
}
.title {
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 10px;
}
</style>