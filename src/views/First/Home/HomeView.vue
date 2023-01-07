<template>
  <div class="home">
    <div class="header-bar">
      <!-- 搜索框 -->
      <div class="app-header-wrapper">
        <div class="app-header-left">
          <img
            src="https://m.mi.com/static/img/icon-header-logo3.ddf2a1c313.png"
            alt=""
          />
        </div>
        <div class="app-header-title" @click="clickRoutingJump('/search')">
          <img class="ipt-img-box" src="@/assets/icon-search.png" alt="" />
          <span>搜索商品名称</span>
        </div>
        <div class="app-header-right">
          <img
            src="https://m.mi.com/static/img/icon-user.23496a0116.png"
            alt=""
          />
        </div>
      </div>

      <!-- 点击切换显示不同内容 -->
      <van-tabs
        v-model="active"
        @click="onClick"
        title-active-color="rgb(237, 91, 0)"
        color="rgb(237, 91, 0)"
        background="#f2f2f2"
        class="top-tab"
        animated
      >
        <van-tab v-for="item in navData" :key="item.page_id" :title="item.name">
          <!-- 推荐 -->
          <div v-show="item.page_id == 0">
            <div v-for="(item, index) in recommendData" :key="index">
              <!-- 轮播图 -->
              <div
                v-if="!item.body.h && item.body.items && !item.body.bg_color"
              >
                <HomeSlideshow :items="item.body.items" />
              </div>
              <!-- 多选项 -->
              <div v-if="item.body.h == 152">
                <HomeOptions :items="item.body.items" />
              </div>
              <!-- 分隔线 -->
              <div v-if="item.body.line_color == '#f5f5f5'">
                <div
                  style="height: 8.33px; background-color: rgb(245, 245, 245)"
                ></div>
              </div>
              <!-- 三张图片(一大二小) -->
              <div v-if="item.body.h == 508">
                <div class="multi_cell">
                  <div
                    class="exposure items"
                    v-for="(item, index) in item.body.items"
                    :key="index"
                    :style="{
                      left: index > 0 ? '188.542rem' : '',
                      top: index > 1 ? '133.333rem' : '',
                    }"
                    @click="
                      clickJump(
                        item.action.type,
                        `/commodity/detail/${item.action.path}`,
                        item.action.path,
                        item.action.spm_stat
                      )
                    "
                  >
                    <img
                      :src="item.img_url"
                      alt=""
                      :style="{
                        height: index > 0 ? '131.242rem' : '264.578rem',
                      }"
                      style="width: 186.453rem; height: 264.578rem"
                    />
                  </div>
                </div>
              </div>
              <!-- 一张图片(大) -->
              <div v-if="item.body.h == 440">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img
                    :src="item.img_url"
                    alt=""
                    @click="
                      clickJump(
                        item.action.type,
                        `/commodity/detail/${item.action.path}`,
                        item.action.path,
                        item.action.spm_stat
                      )
                    "
                  />
                </div>
              </div>
              <!-- 分隔线 -->
              <div v-if="item.body.line_color == '#ffffff'">
                <div
                  style="height: 3.47rem; background-color: rgb(255, 255, 255)"
                ></div>
              </div>
              <!-- 二张图片(小) -->
              <div
                v-if="!item.body.h && item.body.bg_color == '#ffffff'"
                class="box"
              >
                <div
                  class="box-item"
                  v-for="(item, index) in item.body.items"
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
                    <div
                      class="tag2"
                      v-for="(item, index) in item.product_tag_array"
                      :key="index"
                    >
                      <img class="tag-icon" :src="item" alt="" />
                    </div>
                  </div>
                  <div class="text">
                    <div class="name">{{ item.product_name }}</div>
                    <div class="brief">{{ item.product_brief }}</div>
                    <div class="price">
                      ￥{{ item.market_price }}<span>起</span>
                    </div>
                    <div class="buybtn">立即购买</div>
                  </div>
                </div>
              </div>
              <!-- 标题 -->
              <div
                v-if="
                  !item.body.h &&
                  item.body.items &&
                  item.body.items.length === 1
                "
              >
                <div
                  class="ti"
                  v-for="(item, index) in item.body.items"
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
                  {{ item.action_title }}>
                </div>
              </div>
              <!-- 二张图片(大) -->
              <div v-if="item.body.h == 480">
                <div class="img">
                  <img
                    v-for="(item, index) in item.body.items"
                    :key="index"
                    :src="item.img_url"
                    alt=""
                    @click="
                      clickJump(
                        item.action.type,
                        `/commodity/detail/${item.action.path}`,
                        item.action.path,
                        item.action.spm_stat
                      )
                    "
                  />
                </div>
              </div>
              <!-- 一张图片(小) -->
              <div v-if="item.body.h == 280">
                <div
                  v-for="(item, index) in item.body.items"
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
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 了解小米 -->
              <div v-if="item.body.h == 72">
                <div
                  v-for="(item, index) in item.body.items"
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
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 智能 -->
          <div v-show="item.page_id == 10288">
            <div v-for="(item, index) in intelligenceData" :key="index">
              <!-- 轮播图 -->
              <div
                v-if="!item.body.h && item.body.items && !item.body.bg_color"
              >
                <HomeSlideshow :items="item.body.items" />
              </div>
              <!-- 多选项 -->
              <div v-if="item.body.h == 152">
                <HomeOptions :items="item.body.items" />
              </div>
              <!-- 商品容器 -->
              <div v-if="item.body.items && item.body.items.length == 3">
                <HomePublicComponent
                  :items="item.body.items"
                  style="background-color: rgb(240, 241, 243)"
                />
              </div>
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_height == '24' &&
                  item.body.line_color == '#fafafa'
                "
              >
                <div
                  style="height: 8.33px; background-color: rgb(250, 250, 250)"
                ></div>
              </div>
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_height == '24' &&
                  item.body.line_color == '#ffffff'
                "
              >
                <div
                  style="height: 8.33px; background-color: rgb(240, 241, 243)"
                ></div>
              </div>
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_height == '24' &&
                  item.body.line_color == '#f0f1f3'
                "
              >
                <div
                  style="height: 8.33px; background-color: rgb(240, 241, 243)"
                ></div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h == 80">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 一张图片(小) -->
              <div v-if="item.body.h == 112">
                <div
                  v-for="(item, index) in item.body.items"
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
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 一张图片(大) -->
              <div v-if="item.body.h == 280">
                <div
                  v-for="(item, index) in item.body.items"
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
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 电视 -->
          <div v-show="item.page_id == 19071">
            <div v-for="(item, index) in televisionData" :key="index">
              <!-- 标题 -->
              <div v-if="item.body.h == 120">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 分隔线 -->
              <div v-if="item.body.line_height == '24'">
                <div
                  style="height: 8.33px; background-color: rgb(255, 174, 153)"
                ></div>
              </div>
              <!-- 商品容器(三个商品) -->
              <div v-if="item.body.items && item.body.items.length == 3">
                <HomePublicComponent
                  :items="item.body.items"
                  style="background-color: rgb(255, 174, 153)"
                />
              </div>
              <!-- 商品容器(二个商品) -->
              <div v-if="item.body.items && item.body.items.length == 2">
                <div
                  class="television"
                  style="background-color: rgb(255, 174, 153)"
                >
                  <div
                    class="box-item"
                    v-for="(item, index) in item.body.items"
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
                    <div class="info-box">
                      <div class="text">
                        <div class="name">{{ item.product_name }}</div>
                        <div class="brief">
                          {{ item.product_brief }}
                        </div>
                      </div>

                      <div>
                        <div class="price" style="color: rgb(245, 75, 75)">
                          ￥{{ item.market_price }}
                        </div>
                        <div class="buttom">立即购买</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 背景 -->
              <div v-if="item.body.h === 76">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 家电 -->
          <div v-show="item.page_id == 18642">
            <div v-for="(item, index) in jiadianData" :key="index">
              <!-- 标题 -->
              <div v-if="item.body.h === 124">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 分隔线 -->
              <div v-if="item.body.line_height === '4'">
                <div
                  style="height: 1.38px; background-color: rgb(35, 147, 78)"
                ></div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 136">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 分隔线 -->
              <div v-if="item.body.line_height === '24'">
                <div
                  style="height: 8.33px; background-color: rgb(225, 65, 57)"
                ></div>
              </div>
              <!-- 商品容器(三个商品) -->
              <div v-if="item.body.items && item.body.items.length === 3">
                <HomePublicComponent
                  :items="item.body.items"
                  style="background-color: rgb(225, 65, 57)"
                />
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 106">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 104">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 105">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 分隔线 -->
              <div v-if="item.body.line_height === '184'">
                <div
                  style="height: 63.88px; background-color: rgb(225, 65, 57)"
                ></div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 110">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 笔记本 -->
          <div v-show="item.page_id == 13176">
            <div v-for="(item, index) in notebookData" :key="index">
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_color === '#4878a6' &&
                  item.body.line_height === '40'
                "
              >
                <div
                  style="height: 13.88px; background-color: rgb(72, 120, 166)"
                ></div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 80">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 75">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 标题 -->
              <div v-if="item.body.h === 74">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 大商品 -->
              <div v-if="item.body.btn_color === '#ea625b' && !item.body.h">
                <div
                  class="notebook"
                  v-for="(item, index) in item.body.items"
                  :key="index"
                  style="background-color: rgb(72, 120, 166)"
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
                    <img :src="item?.img_url" alt="" />
                  </div>
                  <div class="info">
                    <div class="l l1">
                      <div class="name fz-m">{{ item?.product_name }}</div>
                      <div class="price">
                        ￥{{ item?.market_price }}<span>起</span>
                      </div>
                    </div>
                    <div class="l l2">
                      <div class="brief w450">{{ item?.product_brief }}</div>
                      <div class="buybtn">立即购买</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 人群购机指南 -->
              <div v-if="item.body.h === 70">
                <div v-for="(item, index) in item.body.items" :key="index">
                  <img :src="item.img_url" alt="" />
                </div>
              </div>
              <!-- 二张图片 -->
              <div v-if="item.body.h === 156">
                <div class="imgs">
                  <img
                    :src="item.img_url"
                    alt=""
                    v-for="(item, index) in item.body.items"
                    :key="index"
                    @click="
                      clickJump(
                        item.action.type,
                        `/commodity/detail/${item.action.path}`,
                        item.action.path,
                        item.action.spm_stat
                      )
                    "
                  />
                </div>
              </div>
              <!-- 二张图片 -->
              <div v-if="item.body.h === 158">
                <div class="imgs">
                  <img
                    :src="item.img_url"
                    alt=""
                    v-for="(item, index) in item.body.items"
                    :key="index"
                    @click="
                      clickJump(
                        item.action.type,
                        `/commodity/detail/${item.action.path}`,
                        item.action.path,
                        item.action.spm_stat
                      )
                    "
                  />
                </div>
              </div>
              <!-- 二张图片 -->
              <div v-if="item.body.h === 148">
                <div class="imgs">
                  <img
                    :src="item.img_url"
                    alt=""
                    v-for="(item, index) in item.body.items"
                    :key="index"
                    @click="
                      clickJump(
                        item.action.type,
                        `/commodity/detail/${item.action.path}`,
                        item.action.path,
                        item.action.spm_stat
                      )
                    "
                  />
                </div>
              </div>
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_color === '#ffffff' &&
                  item.body.line_height === '24'
                "
              >
                <div
                  style="height: 8.328px; background-color: rgb(255, 255, 255)"
                ></div>
              </div>
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_color === '#4878a6' &&
                  item.body.line_height === '24'
                "
              >
                <div
                  style="height: 8.328px; background-color: rgb(72, 120, 166)"
                ></div>
              </div>
              <!-- 分隔线 -->
              <div
                v-if="
                  item.body.line_color === '#4878a6' &&
                  item.body.line_height === '35'
                "
              >
                <div
                  style="height: 13.88px; background-color: rgb(72, 120, 166)"
                ></div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="download-app-bottom-float">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/831de258b72b38b8d586b387c2f54b16.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import HomeSlideshow from "@/views/First/Home/components/HomeSlideshow.vue";
import HomeOptions from "@/views/First/Home/components/HomeOptions.vue";
import HomePublicComponent from "@/views/First/Home/components/HomePublicComponent.vue";

import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
export default {
  name: "HomeView",
  components: {
    HomeSlideshow, //首页轮播图
    HomeOptions, //首页选项
    HomePublicComponent, //首页公共组件（智能、电视、家电）
  },
  filters: {},
  props: {},
  data() {
    return {
      // judge: true,
      active: 0, //默认选中推荐

      navData: [], //导航数据
      recommendData: [], //推荐数据
      intelligenceData: [], //智能数据
      televisionData: [], //电视数据
      jiadianData: [], //家电数据
      notebookData: [], //笔记本数据
    };
  },
  computed: {},
  watch: {},
  created() {
    //推荐
    this.axios.get("home/page").then((res) => {
      this.navData = res.data.data.tabs;
      this.recommendData = res.data.data.data.sections;
      console.log("推荐数据", this.recommendData);
    });
  },

  methods: {
    onClick(name) {
      switch (name) {
        case 0:
          //推荐
          this.axios.get("home/page").then((res) => {
            this.navData = res.data.data.tabs;
            this.recommendData = res.data.data.data.sections;
            console.log("推荐数据", this.recommendData);
          });
          break;
        case 1:
          //智能
          this.axios
            .get("home/page?page_type=activity&page_id=10288")
            .then((res) => {
              this.intelligenceData = res.data.data.data.sections;
              console.log("智能数据", this.intelligenceData);
            });
          break;
        case 2:
          // 电视
          this.axios
            .get("home/page?page_type=activity&page_id=19071")
            .then((res) => {
              this.televisionData = res.data.data.data.sections;
              console.log("智能数据", this.televisionData);
            });
          break;
        case 3:
          //家电
          this.axios
            .get("home/page?page_type=activity&page_id=18642")
            .then((res) => {
              this.jiadianData = res.data.data.data.sections;
              console.log("智能数据", this.jiadianData);
            });
          break;
        case 4:
          //笔记本
          this.axios
            .get("home/page?page_type=activity&page_id=13176")
            .then((res) => {
              this.notebookData = res.data.data.data.sections;
              console.log(this.notebookData);
              console.log("智能数据", this.notebookData);
            });
          break;
        default:
      }
    },

    //点击跳转搜索
    clickRoutingJump(url) {
      this.$router.push(url);
    },

    //点击跳转
    clickJump(type, routing, path, spm_stat) {
      console.log("触发点击事件");
      if (type == "product") {
        //路由跳转
        this.$router.push(routing);
      } else if (type == "url" || "activity") {
        //链接跳转
        window.location.href = path;
      } else if (type == "first_channel") {
        //链接拼接跳转
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
.van-swipe-item {
  img {
    width: 100%;
    display: block;
  }
}
.home {
  padding-bottom: 50rem;
  .header-bar {
    color: #666;
    overflow: hidden;
    padding-top: 50rem;

    .app-header-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50rem;
      overflow: hidden;
      z-index: 100;
      background: #f2f2f2;
      .app-header-left {
        width: 25rem;
        margin: 0 10rem;
        img {
          width: 100%;
          display: block;
        }
      }
      .app-header-title {
        flex: 1;

        height: 30rem;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #e5e5e5;
        text-align: left;
        width: 100%;
        color: rgba(0, 0, 0, 0.3);
        background-color: #fff;
        border-radius: 2rem;
        .ipt-img-box {
          width: 20rem;
        }
      }
      .app-header-right {
        width: 25rem;
        margin: 0 10rem;
        img {
          width: 100%;
          display: block;
        }
      }
    }

    .top-tab {
      padding-top: 44rem;
    }
    ::v-deep .van-tabs__wrap {
      position: fixed;
      top: 50rem;
      z-index: 100;
      width: 100%;
      box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%);
    }
  }
}
.download-app-bottom-float {
  width: 138.54rem;

  position: fixed;
  z-index: 99;
  left: 50%;
  bottom: 60rem;
  transform: translateX(-50%);
}

.multi_cell {
  position: relative;
  width: 375rem;
  height: 264.578rem;
  .items {
    position: absolute;
    width: 186.453rem;
    height: 264.578rem;

    height: auto !important;
    display: block;
  }
}

.cells_auto_fill {
  position: relative;
  width: 375rem;
  height: 264.578rem;
}
.img {
  display: flex;
  justify-content: space-between;
  img {
    width: 186.45rem;
  }
}
.ti {
  line-height: 52.078rem;
  font-size: 14.5833rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
}

.imgs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 187.5rem;
  }
}

.box {
  padding: 0 6.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-item {
  width: 178.13rem;
  .img {
    width: 179.16em;
    height: 145.83em;
    position: relative;
    .tag2 {
      position: absolute;
      bottom: 0;
      right: 0;
      img {
        display: inline-block;
        width: 52.078rem;
        height: auto;
      }
    }
  }
  .text {
    text-align: center;
    padding: 10.417rem 14.063rem;
    .name {
      font-size: 14.5833rem;
      color: rgba(0, 0, 0, 0.87);
    }
    .brief {
      margin-top: 3.125rem;
      font-size: 12rem;
      line-height: 15.63rem;
      color: rgba(0, 0, 0, 0.54);
    }
    .price {
      font-size: 14.5833rem;
      color: #ea625b;
      line-height: 21.88rem;
      display: inline-block;
      span {
        font-size: 12rem;
        margin-left: 2.083rem;
      }
    }
    .buybtn {
      width: 104.16rem;
      background: #ea625b;
      border-radius: 2rem;
      text-align: center;
      color: #fff;
      font-size: 12.5rem;
      padding: 8.333rem 0;
      font-weight: 700;

      margin: 0 auto;
    }
  }
}

.name,
.brief {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
// 电视
.television {
  padding: 0 8.333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .box-item {
    width: 176.04rem;
    background: #fff;
    border-radius: 2rem;

    .img {
      width: 176.04rem;
      height: 176.04rem;
    }
    .info-box {
      text-align: center;
      overflow: hidden;
      padding: 10.417rem 5.208rem;
      .text {
        margin-bottom: 6.25rem;
        .name {
          font-weight: bolder;
          color: #3c3c3c;
          font-size: 14.5833rem;
        }
        .brief {
          color: #3c3c3c;
          font-size: 12rem;
          margin-top: 3.125rem;
        }
      }
      .action-box {
        .price {
          font-size: 14.5833rem;
          margin-top: 4.375rem;
          font-weight: 700;
        }
        .buttom {
          width: 91.664rem;
          height: 25.516rem;
          background-color: rgb(245, 75, 75);
          color: rgb(255, 255, 255);
          font-size: 12.5rem;
          font-weight: 700;
          text-align: center;
          line-height: 25.516rem;
        }
      }
    }
  }
}

// 笔记本
.notebook {
  padding: 0rem 6.25rem;
  .img {
    img {
      width: 100% !important;
    }
  }
  .info {
    padding: 10.417rem 14.063rem;
    text-align: left;
    background-color: #fff;
    .l {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #3c3c3c;
      .name {
        color: rgba(0, 0, 0, 0.87);
        font-size: 16.6667rem;
      }
      .price {
        font-size: 14.5833rem;
        color: #ea625b;
        height: 19rem;
        line-height: 19rem;
        position: relative;
        display: inline-block;
        span {
          display: inline-block;
          margin-left: 2.08333rem;
          font-size: 12rem;
        }
      }

      .brief {
        font-size: 12px;
        margin-top: 3.125rem;
        color: rgba(0, 0, 0, 0.54);
      }
      .buybtn {
        width: 104.16rem;
        background: #ea625b;
        border-radius: 2rem;
        text-align: center;
        color: #fff;
        font-size: 12.5rem;
        padding: 8.33333rem 0;
        font-weight: 700;
      }
    }
  }
}
</style>
