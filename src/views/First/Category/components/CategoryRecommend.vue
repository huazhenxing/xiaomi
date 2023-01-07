<template>
  <div class="swiper-container" v-if="classList">
    <CategoryImgUrl :img_url="classList.category_list[0].body.items[0]" />

    <CategoryName :title="classList.category_list[1].body.category_name" />

    <CategoryProductIist
      :product_list="classList.category_list[2].body.product_list"
    />
    <CategoryItemsList :items="classList.category_list[3].body.items" />
  </div>
</template>

<script>
import CategoryName from "@/views/First/Category/components/CategoryName.vue";
import CategoryImgUrl from "@/views/First/Category/components/CategoryImgUrl.vue";
import CategoryProductIist from "@/views/First/Category/components/CategoryProductIist.vue";
import CategoryItemsList from "@/views/First/Category/components/CategoryItemsList.vue";

export default {
  components: { CategoryName, CategoryImgUrl, CategoryProductIist, CategoryItemsList },
  props: ["classList"],
};
</script>


<style lang="scss" scoped>
img {
  width: 100%;
  display: block;
}
.swiper-container {
  padding-right: 16.667rem;
  .cells_auto_fill {
    width: 254.859rem;
  }
  .nav {
    padding: 13.021rem 0rem;

    width: 263.016rem;
    overflow: auto;
    text-align: left;
    border-bottom: 1px solid #ebebeb;
    background: #fff;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 20;
    &::-webkit-scrollbar {
      width: 0rem;
    }
    .nav-list {
      white-space: nowrap;
      display: inline-block;
      .nav-item {
        display: inline-block;
        margin-right: 17.1875rem;
        color: #666;
        padding: 3.125rem 5.20833rem;
        font-size: 12.5rem;
      }
      .cur {
        background: #efefef;
        color: #333;
        border-radius: 5rem;
      }
    }
  }
  .category_title {
    margin-top: 15.625rem;
    background: #fff;
    font-size: 14.5833rem;
    text-align: left;
    font-weight: 700;
    height: 32.81rem;
    line-height: 32.81rem;
    overflow: hidden;
    color: #333;
  }
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
}
.name,
.price {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>