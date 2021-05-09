export default function (refValue) {
  return {
    mounted() {
      this.$bus.$on("setScroll", this.handleSetScroll);
      this.$refs[refValue].addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      this.$refs[refValue].removeEventListener("scroll", this.handleScroll);
      this.$bus.$emit("mainScroll");
      this.$bus.$off("setScroll", this.handleSetScroll);
    },
    methods: {
      handleScroll() {
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
      handleSetScroll(top) {
        this.$refs[refValue].scrollTop = top;
      },
    }
  }
}