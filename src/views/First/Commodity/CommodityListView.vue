<template>
  <div class="app-shell">
    <!-- 头部 -->
    <header
      class="app-header-wrapper app-shell-header"
      style="background-color: rgb(242, 242, 242)"
    >
      <div class="app-header-left">
        <div class="app-header-item">
          <i class="image-icons app-header-icon icon-back"></i>
        </div>
      </div>
      <div class="app-header-middle">
        <div class="app-header-title" style="color: rgb(102, 102, 102)">
          {{ page_title }}
        </div>
      </div>
      <div class="app-header-right">
        <div class="app-header-item">
          <i class="image-icons app-header-icon icon-search"></i>
        </div>
      </div>
    </header>
    <!-- 内容 -->
    <div class="app-view-wrapper">
      <div
        class="
          app-product-list-page
          app-view
          app-view-with-header
          app-view-with-footer
        "
      >
        <!-- 导航列表 -->
        <div class="head">
          <div class="tab">
            <div
              class="tab-item"
              v-for="item in top_tab"
              :key="item.category_id"
              @click="ss"
            >
              <img :src="item.img_url" alt="" />
              <div class="pro-name bold">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
        <ol style="margin-top: 98.958rem">
          <li
            class="item ui-flex"
            v-for="item in product"
            :key="item.product_id"
          >
            <div class="item-img">
              <img :src="item.puzzle_url" alt="" />
            </div>
            <div class="item-intro box-flex flex">
              <div class="item-name flex">
                <p>{{ item.name }}</p>
              </div>
              <div class="item-brief flex">
                <p>{{ item.product_desc }}</p>
              </div>
              <div class="item-intro-price flex">
                <span class="price"><span>￥</span>{{ item.price }} </span>
                <del v-if="item.price != item.market_price">
                  <span class="price"
                    ><span>￥</span>{{ item.market_price }}
                  </span>
                </del>
              </div>
              <div class="item-intro-comment flex">
                <span>{{ item.comments_total }}条评价</span>
                <span>{{ item.satisfy_per }}满意</span>
              </div>
            </div>
          </li>
        </ol>
        <!-- 商品推荐 -->
        <div class="recommend">
          <div class="recommend-title">── 商品推荐 ──</div>
          <div class="recommend-list">
            <div
              class="recommend-item"
              v-for="(item, index) in recommend_list"
              :key="index"
            >
              <div
                class="exposure"
                v-for="item in item.body.items"
                :key="item.id"
              >
                <img :src="item.img_url" alt="" />
                <div class="goods-name">{{ item.product_name }}</div>
                <div class="goods-desc" v-if="item.label_title">
                  {{ item.label_title }}
                </div>
                <div class="goods-price">
                  <span>￥</span>{{ item.product_price }}
                  <del
                    class="price"
                    v-if="item.product_price != item.prod_org_price"
                  >
                    <span>￥</span>{{ item.prod_org_price }}
                  </del>
                  <span class="label" v-if="item.subtitle">{{
                    item.subtitle
                  }}</span>
                </div>
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
  data() {
    return {
      top_tab: null, //导航数据
      product: null, //商品列表
      recommend_list: null, //推荐商品
      page_title: null, //标题
    };
  },
  created() {
    // console.log("路由参数==>", this.$route.params.id);
    this.axios({
      method: "get",
      url: "product/all_product",
      params: {
        cat_id: this.$route.params.id,
      },
    }).then((res) => {
      this.page_title = res.data.data.page_title;
      console.log("导航+商品列表数据==>", res);
      this.top_tab = res.data.data.top_tab;
      this.product = res.data.data.product;
    });

    this.axios({
      method: "get",
      url: "product/recommendv2",
      params: {
        cat_id: this.$route.params.id,
      },
    }).then((res) => {
      console.log("推荐商品数据==>", res);
      this.recommend_list = res.data.data.recommend_list;
    });
  },
};
</script>

<style lang="scss" scoped>
.app-shell {
  // 头部开始
  .app-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #f2f2f2;
    color: #666;
    padding: 0;
    transition: transform 0.2s ease-out;
    & > div {
      display: flex;
      align-items: center;
    }
    .app-header-item {
      width: 31.25rem;
      margin: 0 10.417rem;
    }
    .app-header-icon {
      display: block;
      width: 31.25rem;
      height: 31.25rem;
      overflow: hidden;
      &.icon-back {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
        width: 26.039rem;
        height: 26.039rem;
      }
      &.icon-search {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAEx0lEQVQYGe3Bf0yUdRwH8I9GpBtZVpul0y1/ZD8sKzdXbupMh3Pq0jWtzbVs9YfL8scfLq02h1m52R3c832+z/d5HrjjAOH4KQhy4MQD4eS4gXiCePLjBIwU8VeCOAPy3dZf/mEpz56zW93rRRQVFRUVFfU/dGFM+UTHlOrXzq/yf9HwefeS0plpk4/F0b+je5x/UZXIPZV+URmRwMEhQfs940K+ry6hYTY9Wu0Tyze6yxVYwSGgQoUKFSpUCMiwwH6zPLVqZVcsPRrlSwvqVVghwMGhQYMOHTp0aNDAIcBhhQ53UcWLFH4127QrElQwqEi7keUu21W/vnl5+/y2dwKraj8p3pdZ7bzDIYNDQmqweQWFU/cTpU4GAQUMro6SbR2z6D4aFuRb0m4yqFCgDXq3U7hciynOSYQOBertgr2np9I/ODHPlSlDg4AN3m8oPKq+t0GHguSexg/ogepjPbvZkIACbci3lsx3Yr06rECGvSO4gB6SbxMb5pBhDwZeInN1vWJvY5DB+5uX0ShUfmeDAhtKCkOxZCZPogUCMo5vpFEJxRSkcKiQ0BBP5gnMSu+RIaGokEatc2ZqSEBCqasnhszi32SFgBYKLiQDqnfI0CAGz79B5uibkOOVIZCXTob0TrK3qeA4tpfM0TmPQYO427CBDHLrDAoO+H+LITM0r+VQkRy88DwZFFiXBAWOS73PkRl8WzgU5JVVjyeDQi+LPhmOW63zyAxH9yvgKE31jCGDKqZltTPYh+rXkBmKXAIyKpLIsJpn8hskpMDzJZmhKFuAoXIfGeaPO+i1IQXHtpIZPHsVyCgXZJhnUm6TBPtI3UdkBv9mDo5DOVUxZFDpjAO/yHDcCcSTGVreZxDI8F58kgxqelMe5LD3h+aQGbrnsBENYrDjbTKobnMSFLh8A7Fkhpa4Ao8MgcpdZEjTuAI3h4DnRzJLYEMiODKPX3qKDAjOF30a+N3gYjJLz+SMs0lQUL2ZDDiYqkDCQffFcWSeih8sYEht/HUqjVJgjehTIOH0CjJT99QDbRJsKCxtG0+j0PWqvUOGFYdzyGxnlyVf5ZCQ9xM9tJPP5jbaIMEZ7J5B5jv6FR/iUPsP778eRw+hc4ajhEGBs+NkPIXDmTFuRyI4FBSW9EyhB2h9N+O0AgEFR5MoXK49XilzMDBktBZ+Fnia/oZ/ev6elKscAioUOEPtCyl8POucfRwSZOTVunZWxg9MoHtcnuxek5mQE7JBhoAODQIStBttCyh8OubmHEke4LBAhXM4uykt35mWb8212bPSi7M6nX9wWCGQfL2M9U73JjBw2KBfbl1M4VPxmG9tdl76gA0WWCBBhQYNKiRY8TMYMnuzXdVL6S/H90hQwGHvObeEwiv4Vpn1UG1ea9ZV510dOhxIG8npOnykNKF5Lt2jZjeDCgXJl4PLKdx6xja+4Hm94D3Hh471rhXFi+qm0X3UfMsgwKDeOreUIoP3awYFEsTNs8soMnh3MnAw6FdallNkOLGLQUBBcl/LSooMtTtkqODQBlpWU2TwbZGhgEG5fWY1RQbfVhkcDKK/eTVFhtrtMjg49Butiygy+LfKEOAodlKkCHyq94vhUx9T5GiYXjn73FiKioqKior6z/oTCs8KMOW0P6QAAAAASUVORK5CYII=);
      }
    }
    .app-header-middle {
      flex: 1;
      font-size: 15.625rem;
      min-width: 0;
      .app-header-title {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
      }
    }
    .app-header-right {
      min-width: 52.078rem;
    }
  }
  .app-shell-header {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 50%;
    width: 375rem;
    transform: translateX(-50%);
  }
  .image-icons {
    display: inline-block;
    width: 37.5rem;
    height: 37.5rem;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }
  // 头部结束
  // 内容开始
  .app-view-wrapper {
    position: relative;
    max-width: 375rem;
    margin: 0 auto;
    .app-view {
      background: #fff;
      color: #3c3c3c;
      &.app-view-with-footer {
        padding-bottom: 46.875rem;
      }
      &.app-view-with-header {
        padding-top: 50px;
      }
    }
  }
  .app-product-list-page {
    background: #f4f4f4 !important;
  }
  .head {
    width: 100%;
    overflow-x: auto;
    background: #fff;
    padding: 5.208rem 0 0 10.417rem;
    text-align: left;
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 20;
  }
  .tab {
    text-align: left;
    white-space: nowrap;
    display: inline-block;
    -webkit-overflow-scrolling: touch;
    .tab-item {
      width: 67.703rem;
      text-align: center;
      display: inline-block;
      margin-right: 10.417rem;
      color: #666;
      font-size: 12rem;
      img {
        width: 58.328rem;
        height: 58.328rem;
      }
      .pro-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bold {
        font-weight: 700;
      }
      .selected {
        width: 14.578rem;
        height: 2.602rem;
        background: #ff5934;
        margin: 0 auto;
        margin-top: 7.813rem;
      }
    }
  }
  ol {
    margin-top: 10.417rem;
    padding: 0 10.417rem;
    background: #fff;
    .item {
      padding: 10.417rem 0;
      position: relative;
      border-bottom: 1px solid #e4e4e4;
    }
    .item-img {
      position: relative;
      width: 125rem;
      height: 125rem;
      text-align: center;
      display: block;
      border-radius: 4rem;
      overflow: hidden;
      background: #f4f4f4;
      img {
        width: auto;
        height: 100%;
      }
    }
    .item-intro {
      display: block;
      padding: 0 16.667rem 4.167rem;
      width: 195.839rem;
      box-sizing: border-box;
      text-align: left;
      .item-name {
        font-size: 16.6667rem;
        color: #333;
        margin-bottom: 8.333rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .item-brief {
        font-size: 12rem;
        color: rgba(0, 0, 0, 0.54);
        margin-bottom: 8.333rem;
        // line-height: 0.3rem;
        height: 46.875rem;
        overflow: hidden;
        font-weight: 400;
      }
      .item-intro-price {
        font-size: 16.6667rem;
        position: relative;
        align-content: center;
        display: flex;
        .price {
          color: #ff6000;
          display: inline-block;
          span {
            font-size: 12rem;
          }
        }
        del {
          margin-left: 7.813rem;
          font-size: 15.625rem;
        }
      }
      .item-intro-comment {
        margin-top: 5.208rem;
        span {
          font-size: 12rem;
          color: #888;
          margin-right: 10.417rem;
        }
      }
    }
  }
  .recommend {
    background: #fff;
    margin-top: 10.417rem;
    padding: 10.417rem;
    .recommend-title {
      font-size: 17.1875rem;
      color: #333;
      margin-top: 6.25rem;
      text-align: center;
    }
    .recommend-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 15.625rem;
    }
    .recommend-item {
      width: 147.914rem;
      display: inline-block;
      text-align: left;
      background: #f8f8f8;
      border-radius: 4rem;
      padding: 10.417rem 12.5rem;
      margin-bottom: 8.333rem;
      img {
        width: 147.914rem;
        height: 147.914rem;
      }
      .goods-name {
        font-size: 14.5833rem;
        font-weight: 400;
        color: #333;
        margin-top: 7.813rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // line-height: 0.37rem;
      }
      .goods-desc {
        color: #888;
        font-size: 12rem;
        margin-top: 6.25rem;
      }
      .goods-price {
        color: #333;
        font-size: 15.625rem;
        margin-top: 7.813rem;
        display: flex;
        align-items: center;
        span {
          font-size: 12rem;
        }
        .price {
          font-size: 12rem;
          margin-left: 5.208rem;
          color: #666;
          text-decoration: line-through;
          margin-top: 1.125rem;
        }
        .label {
          color: #c69768;
          border: 1px solid #c69768;
          font-size: 12rem;
          margin-left: 7.813rem;
          padding: 2.604rem 4.688rem;
          border-radius: 4rem;
        }
      }
    }
  }
  .ui-flex {
    display: -webkit-box;
    display: flex;
  }
  .box-flex {
    display: -webkit-box;
    display: flex;
  }
  .flex {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
  }

  // 内容结束
}
</style>