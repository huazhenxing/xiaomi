<template>
  <div class="app-search-page app-view">
    <!-- 头部 -->
    <div class="app-search-head">
      <!-- 搜索 -->
      <div class="app-search">
        <!-- 点击返回 -->
        <div class="header-btn-left" @click="clickReturn">
          <i class="image-icons"></i>
        </div>
        <!-- 搜索框 -->
        <van-search
          v-model="value"
          show-action
          placeholder="搜索商品名称"
          left-icon=""
          @search="onSearch(value)"
        >
          <!-- 搜索按钮 -->
          <template #action>
            <div class="header-btn-right" @click="onSearch(value)">
              <i class="image-icons"></i>
            </div>
          </template>
        </van-search>
      </div>
      <!-- 搜索列表 -->
      <ul class="search-key-list" v-if="isShow">
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="commodityList(item.title, '/search/list')"
        >
          <div class="item">
            <span class="txt">{{ item.title }}</span>
          </div>
        </li>
      </ul>

      <div class="guide" v-if="false">
        <img
          src="https://i8.mifile.cn/b2c-mimall-media/7e6f1f652ccc78e3bf84c2e85585a6f4.png?w=1080&h=300&bg=E8EDF1"
          alt=""
        />
      </div>

      <div class="app-nav">
        <div class="nav-main">
          <div class="item active" @click="show = true">
            综合
            <i class="icon icon-down active"></i>
          </div>

          <div class="item">销量</div>
          <div class="item">
            价格
            <span>
              <i class="icon icon-up"></i>
              <i class="icon icon-down"></i>
            </span>
          </div>
          <div class="item">筛选</div>
        </div>
        <div class="item-child" v-if="show">
          <div>
            <div class="active">
              综合排序
              <em></em>
            </div>
            <div>
              综合排序
              <em></em>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品选择 -->
    <div class="page-wrap" style="padding-top: 37.336px">
      <div class="app-goods-list">
        <div class="app-goods-classify">
          <div class="classify-box">
            <div
              class="classify-item"
              v-for="(item, index) in classes"
              :key="index"
            >
              <span>
                <img :src="item.class_icon" alt="" />
                {{ item.class_name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品选择列表 -->
    <div class="item-box bd-bottom-1px">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="(item, index) in list_v2" :key="index">
          <img class="item-img" :src="item.body.image" alt="" />
          <div class="item-con">
            <h3 :class="{ mt: !item.body.class_parameters.list.length > 0 }">
              {{ item.body.name }}
            </h3>
            <p
              v-if="item.body.desc"
              class="item-desc"
              v-html="item.body.desc"
            ></p>

            <div
              class="item-specs-list"
              v-if="item.body.class_parameters.list.length > 0"
            >
              <div
                class="specs-item bd-right-1px"
                v-for="item in item.body.class_parameters.list"
                :key="item.parameter_id"
              >
                <span class="name">{{ item.name }}</span>
                <span class="desc">{{ item.value }}</span>
              </div>
            </div>
            <div class="item-price">
              <sub>¥</sub>
              {{ item.body.price }}
              <span class="spe">起</span>
              <del v-if="item.body.price != item.body.market_price">
                <sub>¥</sub>
                {{ item.body.market_price }}
              </del>
              <span class="icon-box" v-if="item.body.sale_label.activity_label">
                <img
                  v-for="(item, index) in item.body.sale_label.activity_label"
                  :key="index"
                  :src="item.img_url"
                  alt=""
                />
              </span>
            </div>

            <div class="item-count" v-if="item.body.comments_total">
              <span>{{ item.body.comments_total }}条评价</span>
              <span> {{ item.body.satisfy_per }}满意</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { Search, List, DropdownMenu, DropdownItem } from "vant";
Vue.use(Search);
Vue.use(List);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
  name: "SearchView",
  data() {
    return {
      list: null, //搜索列表数据
      value: this.$route.query.key, //输入值
      isShow: false, //是否显示搜索列表
      timer: null, //定时器
      classes: null, //商品选择
      list_v2: [], //商品选择列表

      // 触底加载更多
      loading: false,
      finished: false,
      page: 2,

      show: false,
    };
  },

  methods: {
    onSearch(value) {
      this.value = value;
    },
    commodityList(str, url) {
      this.value = str;
      this.isShow = true;
      this.$router.push({ path: url, query: { key: str } });
    },
    clickReturn() {
      this.$router.go(-1);
    },

    onLoad() {
      console.log(this.$route.query.key);
      this.page = this.list_v2.length / 20 + 1;
      setTimeout(() => {
        this.axios({
          method: "get",
          url: "hisearch/query_v3",
          params: {
            query: this.$route.query.key,
            page_index: this.page,
            page_size: 20,
          },
        }).then((res) => {
          console.log(res);
          if (this.list_v2) {
            // 加载状态结束
            this.loading = false;
          }
          this.classes = res.data.data.classes;
          this.list_v2.push(...res.data.data.list_v2);
        });

        // // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 500);
    },
  },

  created() {},

  mounted() {
    // 路由参数
    console.log(this.$route.query.key);
  },

  // 路由复用
  beforeRouteUpdate(to, from, next) {
    this.onLoad();
    next();
  },

  watch: {
    value() {
      clearTimeout(this.timer); //清除上一次定时器
      if (this.value == "") {
        this.isShow = false;
      }
      this.timer = setTimeout(() => {
        if (this.value !== "") {
          this.isShow = true;
          this.axios({
            method: "get",
            url: "hisearch/suggestion_v3",
            params: {
              query: this.value,
            },
          }).then((res) => {
            this.list = res ? res.data.data.list : [];
          });
        }
      }, 500);
    },
  },
};
</script>


<style lang="scss" scoped>
.app-search-page {
  color: #3c3c3c;
  .app-search-head {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    background: #fafafa;
    .app-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 41.667rem;
      width: 100%;
      .header-btn-left {
        display: block;
        margin: 0 8rem;
        color: #666;
        .image-icons {
          width: 26.039rem;
          height: 26.039rem;
          display: block;
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
        }
      }
      .search-item {
        background: #fff;
        flex: 1;
        border: 1px solid #e5e5e5;

        input {
          border-radius: 2rem;
          padding: 0rem 0rem 0rem 10.417rem;
          outline: 0;
          font-size: 15.5rem;
          font-weight: 400;
          height: 24.039rem;
          line-height: normal;
        }
      }
      .header-btn-right {
        display: block;
        color: #666;
        .image-icons {
          display: block;
          width: 31.25rem;
          height: 31.25rem;
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAEx0lEQVQYGe3Bf0yUdRwH8I9GpBtZVpul0y1/ZD8sKzdXbupMh3Pq0jWtzbVs9YfL8scfLq02h1m52R3c832+z/d5HrjjAOH4KQhy4MQD4eS4gXiCePLjBIwU8VeCOAPy3dZf/mEpz56zW93rRRQVFRUVFfU/dGFM+UTHlOrXzq/yf9HwefeS0plpk4/F0b+je5x/UZXIPZV+URmRwMEhQfs940K+ry6hYTY9Wu0Tyze6yxVYwSGgQoUKFSpUCMiwwH6zPLVqZVcsPRrlSwvqVVghwMGhQYMOHTp0aNDAIcBhhQ53UcWLFH4127QrElQwqEi7keUu21W/vnl5+/y2dwKraj8p3pdZ7bzDIYNDQmqweQWFU/cTpU4GAQUMro6SbR2z6D4aFuRb0m4yqFCgDXq3U7hciynOSYQOBertgr2np9I/ODHPlSlDg4AN3m8oPKq+t0GHguSexg/ogepjPbvZkIACbci3lsx3Yr06rECGvSO4gB6SbxMb5pBhDwZeInN1vWJvY5DB+5uX0ShUfmeDAhtKCkOxZCZPogUCMo5vpFEJxRSkcKiQ0BBP5gnMSu+RIaGokEatc2ZqSEBCqasnhszi32SFgBYKLiQDqnfI0CAGz79B5uibkOOVIZCXTob0TrK3qeA4tpfM0TmPQYO427CBDHLrDAoO+H+LITM0r+VQkRy88DwZFFiXBAWOS73PkRl8WzgU5JVVjyeDQi+LPhmOW63zyAxH9yvgKE31jCGDKqZltTPYh+rXkBmKXAIyKpLIsJpn8hskpMDzJZmhKFuAoXIfGeaPO+i1IQXHtpIZPHsVyCgXZJhnUm6TBPtI3UdkBv9mDo5DOVUxZFDpjAO/yHDcCcSTGVreZxDI8F58kgxqelMe5LD3h+aQGbrnsBENYrDjbTKobnMSFLh8A7Fkhpa4Ao8MgcpdZEjTuAI3h4DnRzJLYEMiODKPX3qKDAjOF30a+N3gYjJLz+SMs0lQUL2ZDDiYqkDCQffFcWSeih8sYEht/HUqjVJgjehTIOH0CjJT99QDbRJsKCxtG0+j0PWqvUOGFYdzyGxnlyVf5ZCQ9xM9tJPP5jbaIMEZ7J5B5jv6FR/iUPsP778eRw+hc4ajhEGBs+NkPIXDmTFuRyI4FBSW9EyhB2h9N+O0AgEFR5MoXK49XilzMDBktBZ+Fnia/oZ/ev6elKscAioUOEPtCyl8POucfRwSZOTVunZWxg9MoHtcnuxek5mQE7JBhoAODQIStBttCyh8OubmHEke4LBAhXM4uykt35mWb8212bPSi7M6nX9wWCGQfL2M9U73JjBw2KBfbl1M4VPxmG9tdl76gA0WWCBBhQYNKiRY8TMYMnuzXdVL6S/H90hQwGHvObeEwiv4Vpn1UG1ea9ZV510dOhxIG8npOnykNKF5Lt2jZjeDCgXJl4PLKdx6xja+4Hm94D3Hh471rhXFi+qm0X3UfMsgwKDeOreUIoP3awYFEsTNs8soMnh3MnAw6FdallNkOLGLQUBBcl/LSooMtTtkqODQBlpWU2TwbZGhgEG5fWY1RQbfVhkcDKK/eTVFhtrtMjg49Butiygy+LfKEOAodlKkCHyq94vhUx9T5GiYXjn73FiKioqKior6z/oTCs8KMOW0P6QAAAAASUVORK5CYII=);
        }
      }
    }
    .search-key-list {
      text-align: left;
      position: fixed;
      top: 41.66rem;
      z-index: 10;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      li {
        background: #fff;
        list-style: none;
        .item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          margin: 0 16.667rem;
          display: flex;
          height: 48.477rem;
          .txt {
            display: inline-block;
            width: 100%;
            overflow: hidden;
            height: 49.477rem;
            font-size: 14.5833rem;
            line-height: 49.477rem;
            white-space: nowrap;
            color: #333;
          }
        }
      }
    }

    .guide {
      width: 100%;
      display: block;
    }
    .app-nav {
      width: 100%;
      position: relative;
      z-index: 2;
      .nav-main {
        background: #fafafa;
        height: 37.5rem;
        display: flex;
        align-items: center;
        font-size: 14.5833rem;
        line-height: 37.5rem;
        width: 100%;
        .item {
          text-align: center;
          color: rgba(0, 0, 0, 0.54);
          flex: 1;
          position: relative;
          .icon {
            width: 0;
            height: 0;
            border-style: solid;
            display: inline-block;
            margin-left: 5.208rem;
            vertical-align: middle;
          }
          .active {
            border-color: #ff6700 transparent transparent;
            color: #ff6700;
          }
          .icon-down {
            border-width: 4.164rem 4.164rem 0;
          }
          span {
            display: inline-block;
            position: relative;
            margin-left: 5.208rem;
            .icon {
              position: absolute;
              left: 0;
              margin-left: 0;

              width: 0;
              height: 0;
              border-style: solid;
              display: inline-block;
              vertical-align: middle;
            }
            .icon-up {
              top: -11.979rem;

              border-width: 0 4.164rem 4.164rem;
              border-color: #bdbdbd transparent #bdbdbd;
            }
            .icon-down {
              top: -1.039rem;

              border-width: 4.164rem 4.164rem 0;
              border-color: #bdbdbd transparent #bdbdbd;
            }
          }
        }
        .active {
          color: #ff6700;
        }
      }
      .item-child {
        position: absolute;
        top: 37.5rem;
        left: 0;
        width: 100%;
        font-size: 14.5833rem;
        z-index: 3;
        div {
          width: 100%;
          background: #fff;
          div {
            line-height: 50rem;
            text-align: left;
            margin: 0 16.667rem;
            color: rgba(0, 0, 0, 0.87);
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            em {
              float: right;
              width: 18.75rem;
              height: 12.5rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAAAXNSR0IArs4c6QAAAWJJREFUSA3F1r9KxEAQBvBvAmoh9wD2Vr6C+gTXWSgi2OoJNqKdwnFvYOc9wjV2YqGFnaWF7fVqKXYirt/cwZIjidlshs1A/uxmd+dHsptE0HG4AS7gcEbGM5awL1163DFGxFx5Q4bdzBcSnxQwgl/ipp2AChiQApzIDV6SP7JSjGBAzFgfUlJQHSYpKASTDBSKUZCf1O4cq1phHU0wmlvcKVbwjUeeb3GbYA2HMmSNQTTFaMoMP9jmUTEae3jDrRtieV6M38dgNFvG1K88fuZS99uiYjEzkFzjg4u/z8KXBaoNRvP79xAH2uT78p51vRzsjnNqJ3ROtcUsgLTQBmWBKYBiUVaYUlBTlCWmEhSKssb8C6pD4R2XCz9X+guR+2pr/5jwq6yqM+9CcfUJpky/nutjgtHxakHaqBSlF+ZhhtHhgkDasAJlimkEKkGZYxqDZqgjbPC+HnAOPckYD1pnGX+3u8d2kq5oywAAAABJRU5ErkJggg==)
                50% 0;
              background-size: cover;
              margin-top: 15.625rem;
              display: none;
            }
          }
          .active {
            color: #ff6700;
          }
        }
      }
    }
    ::v-deep .van-search--show-action {
      flex: 1;
      padding: 0;
      background: 0;
    }
    ::v-deep .van-search__content {
      background-color: #fff;
      border: 1px solid #e5e5e5;
      height: 24.039rem;
      display: flex;
      align-items: center;
    }
  }

  .page-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    overflow: auto;
    height: 100%;
    background: #fafafa;
    .app-goods-list {
      padding-bottom: 15.625rem;
      .app-goods-classify {
        overflow-y: hidden;
        overflow-x: scroll;
        height: 91.661rem;
        background: #f4f4f4;
        font-size: 12.5rem;
        white-space: nowrap;
        z-index: 2;
        padding: 13.021rem 0;
        text-align: left;
        width: 100%;
        transition: transform 0.3s;
        &::-webkit-scrollbar {
          display: none;
        }
        .classify-box {
          .classify-item {
            display: inline-block;
            background: #fff;
            padding-bottom: 5.208rem;
            width: 67.703rem;
            margin-left: 6.25rem;
            overflow-x: hidden;
            text-align: center;
            border-radius: 5rem;
            span {
              display: inline-block;
              font-size: 12rem;
              img {
                display: block;
                width: 66.664rem;
                height: 66.664rem;
                margin: 3.125rem auto;
              }
            }
          }
        }
      }
    }
  }

  .item-box {
    padding-bottom: 15.625rem;
    .item {
      border-bottom: none;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      padding: 14.583rem 0;
      padding-right: 14.583rem;
      min-height: 131.766rem;
      position: relative;
      background: #fff;
      .item-img {
        width: 131.766rem;
        height: 131.766rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .item-con {
        display: block;
        text-align: left;
        width: 213.539rem;
        margin-left: 11.979rem;
        h3 {
          font-size: 14.5833rem;
          color: rgba(0, 0, 0, 0.87);
          line-height: 19.789rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-weight: 400;
        }
        .mt {
          margin-top: 13.021rem;
        }
        .item-desc {
          font-size: 12rem;
          line-height: 14.0625rem;
          color: rgba(0, 0, 0, 0.54);
          margin-top: 2.604rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .item-specs-list {
          display: flex;
          align-items: center;
          margin: 11.458rem 0 0 !important;
          .specs-item {
            flex: 1;
            span {
              display: block;
              text-align: center;
            }
            .name {
              color: #4a4a4a;
              font-size: 12.5rem;
              line-height: 16.664rem;
            }
            .desc {
              color: rgba(0, 0, 0, 0.54);
              font-size: 12rem;
              line-height: 14.063rem;
              height: 14.063rem;
              overflow: hidden;
            }
          }
        }
        .item-price {
          color: #ff6700;
          font-size: 18.75rem;
          line-height: 21.875rem;
          margin-top: 11.458rem;
          display: flex;
          sub {
            font-size: 12.5rem;
            top: 13rem;
            margin-right: 2.604rem;

            bottom: -3.125rem;

            line-height: 0;
            position: relative;
            vertical-align: baseline;
          }
          .spe {
            font-size: 12.5rem;
            display: inline-block;
            line-height: 23.875rem;
          }
          del {
            margin-left: 2.604rem;
            color: rgba(0, 0, 0, 0.54);
            font-size: 12.5rem;
            line-height: 21.875rem;
            sub {
              margin-right: 2.604rem;

              top: -1.042rem;
              font-size: 12rem;
              bottom: -1.823em;
              line-height: 0;
              position: relative;
              vertical-align: baseline;
            }
          }
          .icon-box {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            img {
              height: 13.016rem;
              margin-left: 5.208rem;
            }
          }
        }

        .item-count {
          color: rgba(0, 0, 0, 0.54);
          font-size: 12rem;
          line-height: 12.5rem;
          margin-top: 5.208rem;
        }
      }
    }
  }
}
.app-view {
  padding-top: 41.667rem;
}

.bd-right-1px {
  position: relative;
}
</style>