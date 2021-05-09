<template>
  <LevelList :list="list" @activeChange="handleActive" />
</template>

<script>
import LevelList from "./LevelList";
import '@/mock';
import {getBlogs} from '@/api/blog';
export default {
  components: {
    LevelList,
  },
  data() {
    return {
      list: [
        { title: "a", isActive: false },
        {
          title: "b",
          isActive: true,
          children: [
            { title: "b-1", isActive: false },
            { title: "b-2", isActive: false },
            { title: "b-3", isActive: false },
            { title: "b-4", isActive: false },
          ],
        },
        { title: "c", isActive: false },
        { title: "d", isActive: false },
      ],
    };
  },
  methods: {
    handleActive(item) {
      console.log(item);
    }
  },
  async created() {
    // console.log(await getBlogTypes())
    console.log(await getBlogs());
  }
};
</script>

<style>
</style>