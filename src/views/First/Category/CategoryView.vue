<template>
  <div class="app-shell">
    <div class="app-view-wrapper">
      <div class="container app-view app-view-with-footer">
        <!-- 搜索框 -->
        <div class="header" @click="goSearch('/search')">
          <div class="app-header-icon">
            <i class="image-icons icon-search"></i>
            搜索商品名称
          </div>
        </div>
        <!-- 左边导航列表 -->
        <div class="list-navbar">
          <ul class="list-ul">
            <li
              v-for="(item, index) in nav_list"
              :key="item.category_id"
              :class="{ active: index == activeKey }"
              @click="onclick(item.category_id, index)"
            >
              <span>{{ item.category_name }}</span>
            </li>
          </ul>
        </div>

        <!-- 右边商品列表 -->
        <div class="swiper-container swiper-container-vertical">
          <div class="swiper-slide swiper-slide-active" style="height: 565px">
            <div
              class="component-list-main"
              v-for="(item, index) in category_list"
              :key="index"
            >
              <!-- 照片 -->
              <div
                class="cells_auto_fill"
                v-show="item.body.h == 220 && item.body.w == 734"
              >
                <img
                  v-for="item in item.body.items"
                  :key="item.action.path"
                  :src="item.img_url"
                  alt=""
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
                />
              </div>

              <!-- 导航 -->
              <div v-show="index == 0">
                <div class="nav">
                  <div class="nav-list">
                    <div
                      class="nav-item cur"
                      v-for="(item, idx) in category_list"
                      :key="idx"
                      v-show="item.body.category_name"
                    >
                      {{ item.body.category_name }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 标题 -->
              <div class="category_title" v-show="item.body.title">
                <span>{{ item.body.title }}</span>
              </div>

              <!-- 一个商品 -->
              <div
                class="category_group box-flex"
                v-show="
                  item.body.is_expand == true &&
                  item.body.product_list &&
                  item.body.h != 220 &&
                  item.body.w != 734
                "
              >
                <div class="box">
                  <div
                    class="product-row"
                    v-for="item in item.body.product_list"
                    :key="item.action.path"
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
                    <div class="exposure item">
                      <img :src="item.puzzle_url" alt="" />
                      <div class="right">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">
                          <span class="qian">￥</span>
                          {{ item.price }}
                          <span class="qi">起</span>
                          <div class="labels" v-if="item.labels">
                            <span
                              class="label"
                              v-for="(item, index) in item.labels"
                              :key="index"
                              >{{ item }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 三个商品 -->
              <div
                class="category_group box-flex"
                v-show="
                  item.body.is_expand == false &&
                  item.body.items &&
                  item.body.h != 220 &&
                  item.body.w != 734
                "
              >
                <div class="box" style="padding-bottom: 26.042rem">
                  <div
                    class="product"
                    v-for="item in item.body.items"
                    :key="item.action.path"
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
                      <img :src="item.img_url" alt="" class="big" />
                    </div>
                    <div class="name">{{ item.product_name }}</div>
                  </div>
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
  name: "CategoryView",
  components: {},
  data() {
    return {
      nav_list: [], // 左边导航列表
      title_list: null, //标题
      category_list: null, //右边商品列表
      activeKey: 0, //默认选中导航
      empty_id: null,
    };
  },
  created() {
    this.onclick(1242);
    this.axios.get("home/category_v2").then((res) => {
      this.nav_list = res.data.data;
      // console.log("点击获取侧边导航_数据", this.nav_list);
    });
  },
  methods: {
    //点击去到搜索页面
    goSearch(url) {
      this.$router.push(url);
    },

    //点击获取数据
    onclick(category_id, index) {
      this.activeKey = index;
      //防止重复点击
      if (this.empty_id !== category_id) {
        this.empty_id = category_id;
        this.axios({
          method: "get",
          url: "home/category_v2",
          params: {
            cat_id: category_id,
          },
        }).then((res) => {
          this.title_list = res.data.data[0].title_list;
          this.category_list = res.data.data[0].category_list;
          // console.log("所有数据==>", res);
          // console.log("导航列表==>", this.title_list);
          // console.log("商品列表==>", this.category_list);
        });
      }
    },

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
.app-shell {
  position: relative;
  width: 100%;
  z-index: 1;
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
    }
  }
}
.container {
  color: #3c3c3c;
  margin-right: auto;
  margin-left: auto;
  flex-basis: 100%;
  .header {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    .app-header-icon {
      width: 341.664rem;
      height: 31.25rem;
      max-height: 100%;
      background: #f7f7f7;
      border-radius: 31.25rem;
      display: flex;
      align-items: center;
      margin-left: 17.1875rem;
      color: #a6a6a6;
      font-size: 14.5833rem;
      .icon-search {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAEx0lEQVQYGe3Bf0yUdRwH8I9GpBtZVpul0y1/ZD8sKzdXbupMh3Pq0jWtzbVs9YfL8scfLq02h1m52R3c832+z/d5HrjjAOH4KQhy4MQD4eS4gXiCePLjBIwU8VeCOAPy3dZf/mEpz56zW93rRRQVFRUVFfU/dGFM+UTHlOrXzq/yf9HwefeS0plpk4/F0b+je5x/UZXIPZV+URmRwMEhQfs940K+ry6hYTY9Wu0Tyze6yxVYwSGgQoUKFSpUCMiwwH6zPLVqZVcsPRrlSwvqVVghwMGhQYMOHTp0aNDAIcBhhQ53UcWLFH4127QrElQwqEi7keUu21W/vnl5+/y2dwKraj8p3pdZ7bzDIYNDQmqweQWFU/cTpU4GAQUMro6SbR2z6D4aFuRb0m4yqFCgDXq3U7hciynOSYQOBertgr2np9I/ODHPlSlDg4AN3m8oPKq+t0GHguSexg/ogepjPbvZkIACbci3lsx3Yr06rECGvSO4gB6SbxMb5pBhDwZeInN1vWJvY5DB+5uX0ShUfmeDAhtKCkOxZCZPogUCMo5vpFEJxRSkcKiQ0BBP5gnMSu+RIaGokEatc2ZqSEBCqasnhszi32SFgBYKLiQDqnfI0CAGz79B5uibkOOVIZCXTob0TrK3qeA4tpfM0TmPQYO427CBDHLrDAoO+H+LITM0r+VQkRy88DwZFFiXBAWOS73PkRl8WzgU5JVVjyeDQi+LPhmOW63zyAxH9yvgKE31jCGDKqZltTPYh+rXkBmKXAIyKpLIsJpn8hskpMDzJZmhKFuAoXIfGeaPO+i1IQXHtpIZPHsVyCgXZJhnUm6TBPtI3UdkBv9mDo5DOVUxZFDpjAO/yHDcCcSTGVreZxDI8F58kgxqelMe5LD3h+aQGbrnsBENYrDjbTKobnMSFLh8A7Fkhpa4Ao8MgcpdZEjTuAI3h4DnRzJLYEMiODKPX3qKDAjOF30a+N3gYjJLz+SMs0lQUL2ZDDiYqkDCQffFcWSeih8sYEht/HUqjVJgjehTIOH0CjJT99QDbRJsKCxtG0+j0PWqvUOGFYdzyGxnlyVf5ZCQ9xM9tJPP5jbaIMEZ7J5B5jv6FR/iUPsP778eRw+hc4ajhEGBs+NkPIXDmTFuRyI4FBSW9EyhB2h9N+O0AgEFR5MoXK49XilzMDBktBZ+Fnia/oZ/ev6elKscAioUOEPtCyl8POucfRwSZOTVunZWxg9MoHtcnuxek5mQE7JBhoAODQIStBttCyh8OubmHEke4LBAhXM4uykt35mWb8212bPSi7M6nX9wWCGQfL2M9U73JjBw2KBfbl1M4VPxmG9tdl76gA0WWCBBhQYNKiRY8TMYMnuzXdVL6S/H90hQwGHvObeEwiv4Vpn1UG1ea9ZV510dOhxIG8npOnykNKF5Lt2jZjeDCgXJl4PLKdx6xja+4Hm94D3Hh471rhXFi+qm0X3UfMsgwKDeOreUIoP3awYFEsTNs8soMnh3MnAw6FdallNkOLGLQUBBcl/LSooMtTtkqODQBlpWU2TwbZGhgEG5fWY1RQbfVhkcDKK/eTVFhtrtMjg49Butiygy+LfKEOAodlKkCHyq94vhUx9T5GiYXjn73FiKioqKior6z/oTCs8KMOW0P6QAAAAASUVORK5CYII=);
        background-size: 20.5rem 20.5rem;
      }
    }
  }
  .list-navbar {
    position: fixed;
    top: 50px;
    bottom: 46.875rem;
    left: 0;
    width: 79.164rem;
    overflow: hidden;
    z-index: 18;
    ul {
      z-index: 90;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: -15.625rem;
      padding: 0 15.625rem 10.417rem 0;
      background: #fefefe;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      list-style: none;
      li {
        font-size: 12.5rem;
        color: #666;
        height: 46.875rem;
        line-height: 46.875rem;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        position: relative;
        transition: transform 0.1s linear;
        transform-origin: center center;
        -webkit-transition: -webkit-transform 0.1s linear;
        -webkit-transform-origin: center center;
        span {
          display: block;
          height: 46.875rem;
          overflow: hidden;
        }
        &.active {
          color: #333;
          font-weight: 700;
          font-size: 12.5rem;
          transform: scale(1);
          -webkit-transform: scale(1);
          &::after {
            content: "";
            display: block;
            width: 2.602rem;
            height: 14.578rem;
            background: #ff5934;
            position: absolute;
            left: 0;
            top: 15.625rem;
          }
        }
      }
    }
  }
  .swiper-container {
    margin-top: 50px;
    padding-left: 95.833rem;
    padding-right: 16.667rem;
    .swiper-slide {
      overflow: auto;
    }
  }
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
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.component-list-main {
  position: relative;
  .cells_auto_fill {
    height: auto !important;
    display: block;
    img {
      width: 254.859rem;
      height: 76.383rem;
    }
  }
  .nav {
    width: 263.016rem;
    overflow: auto;
    text-align: left;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 13.021rem;
    padding-top: 13.021rem;
    background: #fff;
    position: sticky;
    top: -1rem;
    left: 0;
    z-index: 20;
    .nav-list {
      white-space: nowrap;
      display: inline-block;
      .nav-item {
        display: inline-block;
        margin-right: 17.188rem;
        color: #666;
        padding: 3.125rem 5.208rem;
        font-size: 12.5rem;
      }
      .cur {
        background: #efefef;
        color: #333;
        border-radius: 2rem;
      }
    }
  }
  .category_title {
    background: #fff;
    font-size: 14.5833rem;
    text-align: left;
    font-weight: 700;
    margin-top: 15.625rem;
    height: 32.813rem;
    line-height: 32.813rem;
    overflow: hidden;
    color: #333;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
.category_group {
  background: #fff;
  margin: -3.125rem 0 0;

  .box {
    width: 100%;
    overflow: hidden;
  }
  .product-row {
    width: 100%;
    background: #f8f8f8;
    border-radius: 2rem;
    margin-bottom: 8.333rem;
    .item {
      display: flex;
      padding: 3.646rem;
      img {
        width: 69.266rem;
        height: 69.266rem;
      }
      .right {
        text-align: left;
        overflow: hidden;
        .name {
          font-size: 14.5833rem;
          color: #333;
          margin-left: 4.688rem;
          margin-top: 15.104rem;
          white-space: nowrap;
        }
        .price {
          font-size: 15.625rem;
          color: #333;
          margin-top: 7.813rem;
          margin-left: 4.688rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            margin-left: 2.083rem;
            font-size: 12rem;
          }
          .qian {
            margin-left: 0rem;
            position: relative;
            top: 0.563rem;
          }
          .qi {
            font-size: 12rem;
            position: relative;
            top: 0.563rem;
          }
          .labels {
            margin-left: 10.417rem;
            height: 19.266rem;
            display: flex;
            flex-wrap: wrap;
            span {
              color: #c69768;
              border: 1px solid #c69768;
              font-size: 12rem;
              margin-right: 7.813rem;
              margin-top: 3.125rem;
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
      background: #fff;
      overflow: hidden;
    }
    .name {
      margin-top: 14.583rem;
      white-space: nowrap;
      font-size: 12rem;
      color: rgba(0, 0, 0, 0.54);
    }
  }
  .big {
    height: 100% !important;
    width: auto !important;
  }
}
.box-flex {
  display: -webkit-box;
  display: flex;
}
</style>


<div>
    <!-- 搜索框 -->
    <div class="header" @click="goSearch('/search')">
      <div class="app-header-icon"><i class="image-icons"></i>搜索商品名称</div>
    </div>
    <!-- 内容 -->
    <div class="list-navbar">
      <!-- 侧边导航 -->
      <van-sidebar v-model="activeKey" class="left">
        <!-- @change="onChange" -->
        <van-sidebar-item
          v-for="item in nav_list"
          :key="item.block_id"
          :title="item.category_name"
          @click="onclick(item.category_id)"
        />
      </van-sidebar>
      <!-- 推荐 -->
      <div class="right">
        <CategoryRecommend v-if="activeKey == 0" :classList="category_list" />
        <!-- Xiaomi手机 -->
        <CategoryXiaomiRedmi v-if="activeKey == 1" :classList="category_list" />
        <!-- Redmi手机 -->
        <CategoryXiaomiRedmi v-if="activeKey == 2" :classList="category_list" />
        <!-- 游戏手机 -->
        <CategoryGameCellphone
          v-if="activeKey == 3"
          :classList="category_list"
        />
        <!-- 电脑平板 -->
        <CategoryComputerFlatplate
          v-if="activeKey == 4"
          :classList="category_list"
        />
        <!-- 智能穿戴 -->
        <CategorySameComponent
          v-if="activeKey == 5"
          :classList="category_list"
        />
        <!-- 电视 -->
        <CategorySameComponent
          v-if="activeKey == 6"
          :classList="category_list"
        />
        <!-- 大家电 -->
        <CategorySameComponent
          v-if="activeKey == 7"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 8"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 9"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 10"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 11"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 12"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 13"
          :classList="category_list"
        />
        <CategorySameComponent
          v-if="activeKey == 14"
          :classList="category_list"
        />
      </div>
    </div>
  </div>