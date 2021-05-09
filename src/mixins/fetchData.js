// 获取远程数据的公共代码
// 获取远程数据的函数需要使用的组件进行提供，因为获取的数据可能不一样，函数也可能不一样，提供一个fetchData函数

export default function (defaultDataValue = null) {
  return {
    data() {
      return {
        isLoading: true, // 是否正在获取远程数据
        data: defaultDataValue,  // 获取到的数据
      }
    },
    async created() {
      this.data = await this.fetchData();
      this.isLoading = false;
    }
  };
}