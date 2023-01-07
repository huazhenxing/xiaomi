<template>
  <!-- 小块 -->
  <div class="category_group box-flex" v-if="items">
    <div class="box" style="padding-bottom: 20.042rem">
      <div
        class="product"
        v-for="item in items"
        :key="item.product_id"
        @click="
          goJump(
            item.action.type,
            `/commodity/detail/${item.action.path}`,
            `/commodity/list/${item.action.path}`,
            `/search/list`,
            item.action.path,
            item.action.spm_stat
          )
        "
      >
        <div class="img">
          <img :src="item.img_url" alt="" />
        </div>
        <div class="name">{{ item.product_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    //点击跳转
    goJump(type, commodityDetail, commodityList, searchList, path, spm_stat) {
      if (type === "product") {
        //路由跳转到商品详情
        this.$router.push(commodityDetail);
      } else if (type === "url" || type === "activity") {
        //链接跳转
        window.location.href = path;
      } else if (type === "first_channel") {
        //链接拼接跳转
        window.open(
          `https://m.mi.com/channel/all/${path}?sign=&spmref=MiShop_M.${spm_stat.spm_code}&scmref=${spm_stat.scm}`
        );
      } else if (type === "none") {
        console.log("回到首页");
      } else if (type === "cate") {
        //路由跳转到商品列表
        this.$router.push(commodityList);
      } else if (type === "keyword") {
        //路由跳转到搜索列表
        this.$router.push({ path: searchList, query: { key: path } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.category_group {
  background: #fff;
  margin: -3.125rem 0 0;
  .box {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    .product {
      float: left;
      width: 33.333333333333336%;
      text-align: center;
      margin-top: 10.417rem;
      margin-bottom: 15.625rem;
      overflow: hidden;
      .img {
        width: 52.078rem;
        height: 52.078rem;
        margin: 0 auto;
      }
      .name {
        margin-top: 14.583rem;
        white-space: nowrap;
        font-size: 12rem;
        color: rgba(0, 0, 0, 0.54);
      }
    }
  }
}
</style>