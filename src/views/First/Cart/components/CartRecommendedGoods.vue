<template>
  <div class="goods-item">
    <div class="goods-img-box">
      <img :src="item.image_url" alt="" />
    </div>
    <div class="goods-info">
      <div class="goods-name">{{ item.name }}</div>
      <div class="goods-price">
        <span>￥</span> {{ item.price }}
        <del v-if="item.price !== item.market_price" class="price">
          <span>￥</span>{{ item.market_price }}
        </del>
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
      min-height: 185.625rem;
    }
  }
  .goods-info {
    padding: 9.375rem 13.542rem 11.458rem;
    .goods-name {
      font-size: 14.5833rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .goods-price {
      font-size: 16.6667rem;
      display: inline-block;
      color: #ff6700;
      margin-top: 5.20833rem;
      span {
        font-size: 12.5rem;
      }
      .price {
        font-size: 12.5rem;
        margin-left: 5.20833rem;
        color: rgba(0, 0, 0, 0.54);
        text-decoration: line-through;
        span {
          font-size: 12rem;
          text-decoration: none;
        }
      }
    }
  }
}
</style>