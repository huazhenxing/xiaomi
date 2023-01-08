export default {
  install(Vue) {
    Vue.prototype.getTime = function (id) {
      this.axios({
        method: "get",
        url: "product/all_product",
        params: {
          id,
        },
      }).then((res) => {
        this.page_title = res.data.data.page_title;
        console.log("导航+商品列表数据==>", res);
        this.top_tab = res.data.data.top_tab;
        this.product = res.data.data.product;
      });
    };
  },
};
