<template>
  <div class="product-item" v-if="item">
    <div class="product-img">
      <img :src="item.image_url" alt="" />
    </div>
    <div class="product-name">{{ item.name }}</div>
    <div class="product-price">
      ￥{{ item.price }}
      <span>起</span>
      <span class="market-price" v-if="item.price != item.market_price"
        >￥{{ item.market_price }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.product-item {
  margin-bottom: 18.229rem;
  margin-right: 7.813rem;
  width: 108.328rem;
  &:nth-child(3n) {
    margin-right: 0rem;
  }
  .product-img {
    display: block;
    margin-bottom: 8.333rem;
    height: 108.328rem;
    border-radius: 8.333rem;
    background-color: #f7f7f7 !important;
    overflow: hidden;
  }
  .product-name {
    margin-bottom: 4.688rem;
    font-size: 12.5rem;
    line-height: 18.75rem;
    height: 37.5rem;
    text-align: left;
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .product-price {
    font-size: 12.5rem;
    text-align: left;
    font-weight: 600;
    color: #ff6700;
    span {
      margin-left: 0.521rem;
      font-size: 12rem;
      font-weight: 400;
    }
    .market-price {
      margin-left: 4.167rem;
      font-size: 12rem;
      color: rgba(0, 0, 0, 0.3);
      text-decoration: line-through;
      font-weight: 400;
    }
  }
}
</style>