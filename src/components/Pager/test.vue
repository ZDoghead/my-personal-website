<template>
  <div id="app">
    <Pager :total="303" :current="currentPage" @pageChange="handlePage($event)" />
  </div>
</template>

<script>
import Pager from './';

export default {
  components: {
    Pager
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    handlePage(newPage) {
      this.currentPage = newPage;
    }
  }
};
</script>

<style scoped>
</style>