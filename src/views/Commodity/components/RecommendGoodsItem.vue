<template>
  <div class="goods-item">
    <div class="goods-img-box">
      <img :src="item.image_url" alt="" />
    </div>
    <div class="goods-info">
      <div class="goods-name">{{ item.name }}</div>
      <div class="goods-price">
        <span>￥</span>{{ item.price }}
        <del class="price" v-if="item.price != item.market_price"
          ><span>￥</span>{{ item.market_price }}</del
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.goods-item {
  flex: 0 1 49.5%;
  overflow: hidden;
  .goods-img-box {
    img {
      display: block;
      width: 100%;
      min-height: 3.56rem;
    }
  }
  .goods-info {
    padding: 9.375rem 13.542rem 11.458rem;
    .goods-name {
      font-size: 14.5833rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .goods-price {
      font-size: 16.667rem;
      display: inline-block;
      color: #ff6700;
      margin-top: 5.208rem;
      span {
        font-size: 14rem;
      }
      .price {
        font-size: 12rem;
        margin-left: 5.208rem;
        color: rgba(0, 0, 0, 0.54);
        text-decoration: line-through;
        span {
          font-size: 12rem;
        }
      }
    }
  }
}
</style>