<template>
  <div class="contact-container">
    <div class="list">
      <a
        v-for="(data, i) in listData"
        :key="i"
        :href="data.link"
        class="list-item"
      >
        <Icon :type="data.iconType" />
        <span>{{ data.content }}</span>
        <div class="popup" v-if="data.popup">
          <img :src="data.src" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import qqCode from "@/assets/qq.jpg";
import wxCode from "@/assets/wx.jpg";
import { mapState } from "vuex";

export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState("siteInit", {
      globalSetting: "data",
    }),
    listData() {
      return [
        {
          iconType: "github",
          content: this.globalSetting && this.globalSetting.githubName,
          popup: false,
          link: this.globalSetting && this.globalSetting.github,
          src: "",
        },
        {
          iconType: "mail",
          content: this.globalSetting && this.globalSetting.mail,
          popup: false,
          link: `mailto:${this.globalSetting && this.globalSetting.mail}`,
          src: "",
        },
        {
          iconType: "qq",
          content: this.globalSetting && this.globalSetting.qq,
          popup: true,
          link: `tencent://message/?Menu=yes&uin=${
            this.globalSetting && this.globalSetting.qq
          }&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`,
          src: qqCode,
        },
        {
          iconType: "weixin",
          content: this.globalSetting && this.globalSetting.weixin,
          popup: true,
          link: "#",
          src: wxCode,
        },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.contact-container {
  width: 100%;
}
.list {
  width: 100%;
  padding: 20px 15px;
  box-sizing: border-box;
  background-color: transparent;
  a {
    font-size: inherit;
    color: inherit;
  }
  .list-item {
    margin: 10px 0;
    transition: 0.3s;
    color: @gray;
    background-color: transparent;
    display: block;
    position: relative;

    .icon-container {
      font-size: 30px;
      margin-right: 10px;
    }
    span {
      vertical-align: super;
    }
    .popup {
      position: absolute;
      left: 0;
      bottom: 40px;
      border-radius: 5px;
      width: 200px;
      height: 200px;
      background-color: #fff;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: auto;

      img {
        width: 170px;
        height: 170px;
      }

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -5px;
        width: 10px;
        height: 10px;
        background-color: #fff;
        transform: translateX(-50%) rotate(45deg);
      }
    }

    &:last-of-type {
      .icon-container {
        font-size: 38px;
        margin-left: -4px;
        margin-right: 6px;
      }
    }
    &:hover {
      color: @primary;

      .popup {
        transform: scaleY(1);
      }
    }
  }
}
</style>