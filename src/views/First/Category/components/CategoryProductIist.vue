<template>
  <!-- 大块 -->
  <div class="category_group box-flex" v-if="product_list">
    <div class="box">
      <div
        class="product-row"
        v-for="item in product_list"
        :key="item.product_id"
      >
        <div class="item">
          <div class="img">
            <img :src="item.puzzle_url" alt="" />
          </div>
          <div class="right">
            <div class="name">{{ item.name }}</div>
            <div class="price">
              <span class="￥">￥</span>
              {{ item.price }}
              <span class="qi">起</span>
              <div class="labels" v-if="item?.labels">
                <span
                  class="label"
                  v-for="(item, index) in item?.labels"
                  :key="index"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product_list"],
};
</script>

<style lang="scss" scoped>
.category_group {
  background: #fff;
  margin: -3.125rem 0 0;
  .box {
    width: 100%;
    overflow: hidden;
    .product-row {
      width: 100%;
      background: #f8f8f8;
      border-radius: 2rem;
      margin-bottom: 8.333rem;

      .item {
        display: flex;
        padding: 3.646rem;
        .img {
          width: 69.266rem;
          height: 69.266rem;
        }
        .right {
          text-align: left;
          overflow: hidden;
          .name {
            font-size: 14.5833rem;
            color: #333;
            margin-left: 4.6875rem;
            margin-top: 15.1042rem;
            white-space: nowrap;
          }
          .price {
            font-size: 15.625rem;
            color: #333;
            margin-top: 7.8125rem;
            margin-left: 4.6875rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            height: 19.266rem;
            align-items: center;
            .￥ {
              font-size: 12rem;
              margin-left: 2.0833rem;
              color: #333;
            }
            .qi {
              font-size: 12rem;
              margin-left: 2.0833rem;
              color: #333;
            }
            .labels {
              margin-left: 10.417rem;
              height: 19.266rem;
              display: flex;
              flex-wrap: wrap;
              .label {
                color: #c69768;
                border: 1px solid #c69768;
                font-size: 12rem;
                margin-right: 7.813rem;
                margin-top: 3.125rem;
                margin-left: 2.083rem;
                padding: 0 4.688rem;
                border-radius: 2rem;
                height: 13.016rem;
                display: flex;
                align-items: center;
                flex-shrink: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>