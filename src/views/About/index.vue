<template>
  <div class="about-container" v-loading="allLoaded">
    <iframe
      class="about-content"
      :src="data"
      frameborder="0"
      @load="loaded"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      iframLoaded: false,
    }
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
  computed: {
    ...mapState("about", ["data", "loading"]),
    allLoaded() {
      return this.loading || !this.iframLoaded;
    }
  },
  methods: {
    loaded() {
      this.iframLoaded = true;
    }
  }
};
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
}
</style>