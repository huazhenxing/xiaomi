<template>
  <div class="box">
    <div
      class="box-item"
      v-for="(item, index) in items"
      :key="index"
      @click="
        clickJump(
          item.action.type,
          `/commodity/detail/${item.action.path}`,
          item.action.path,
          item.action.spm_stat
        )
      "
    >
      <div class="img">
        <img :src="item.img_url" alt="" />
      </div>
      <div class="text">
        <div class="name">{{ item.product_name }}</div>
        <div class="brief">
          {{ item.product_brief }}
        </div>
        <div class="price" style="color: rgb(245, 75, 75)">
          ￥{{ item.market_price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    clickJump(type, routing, path, spm_stat) {
      if (type == "product") {
        //商品详情
        this.$router.push(routing);
      } else if (type == "url" || "activity") {
        //链接
        window.location.href = path;
      } else if (type == "first_channel") {
        //链接拼接
        window.open(
          `https://m.mi.com/channel/all/${path}?sign=&spmref=MiShop_M.${spm_stat.spm_code}&scmref=${spm_stat.scm}`
        );
      } else if (type == "none") {
        console.log("回到首页");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 0 8.333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .box-item {
    width: 115.1rem;
    background: #fff;
    border-radius: 2rem;
    .img {
      width: 115.1rem;
      height: 115.1rem;
    }
    .text {
      text-align: center;
      overflow: hidden;
      padding: 10.417rem 5.208rem;
      .name {
        font-weight: bolder;
        color: #3c3c3c;
        font-size: 12.5rem;
      }
      .brief {
        color: #3c3c3c;
        font-size: 12rem;
        margin-top: 3.125rem;
      }
      .price {
        font-size: 14.5833rem;
        margin-top: 4.375rem;
        font-weight: 700;
      }
    }
  }
}
.name,
.brief {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>