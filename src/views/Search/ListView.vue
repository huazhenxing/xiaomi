<template>
  <div class="app-search-page">
    <!-- 遮罩层 -->
    <div class="showbg" v-if="isShowHideDg" @click="clickHideDg"></div>

    <!-- 头部 -->
    <div class="app-search-head">
      <!-- 搜索 -->
      <div class="app-search">
        <!-- 点击返回 -->
        <div class="header-btn-left" @click="clickReturn">
          <i class="image-icons"></i>
        </div>
        <!-- 搜索框 -->
        <van-search v-model="value" show-action placeholder="搜索商品名称" left-icon="" @search="onSearch(value)"
          @input="onInput">
          <!-- 搜索按钮 -->
          <template #action>
            <div class="header-btn-right" @click="onSearch(value)">
              <i class="image-icons"></i>
            </div>
          </template>
        </van-search>
      </div>
      <!-- 搜索关键字列表 -->
      <ul class="search-key-list" v-if="isShow_search_key_list">
        <li v-for="(item, index) in search_key_data_list" :key="index"
          @click="jumpListView(item.title, '/search/list')">
          <div class="item">
            <span class="txt">{{ item.title }}</span>
          </div>
        </li>
      </ul>

      <!-- 选购指南 -->
      <a v-if="isShow_guide" :href="class_buy_guide?.wap_action?.path">
        <div class="guide">
          <img :src="class_buy_guide?.image_url" alt="" />
        </div>
      </a>

      <!-- 导航 -->
      <div class="app-nav">
        <!-- 主要的导航 -->
        <div class="nav-main">
          <!-- 综合 -->
          <div @click="clickNavComprehensive" :class="'item ' + (comprehensive_active ? 'active' : '')">
            {{ comprehensive_text }}
            <i :class="
              'icon icon-down ' + (comprehensive_active ? 'active' : '')
            ">
            </i>
          </div>

          <!-- 销量 -->
          <div @click="clickNavActive" :class="'item ' + (sales_active ? 'active' : '')">
            销量
          </div>

          <!-- 价格 -->
          <div @click="clickNavPrice" :class="'item ' + (price_active ? 'active' : '')">
            价格
            <span>
              <!-- 价格上 -->
              <i :class="'icon icon-up ' + (price_up_active ? 'active' : '')" @click="clickPriceUp"></i>
              <!-- 价格下 -->
              <i :class="'icon icon-down ' + (price_bown_active ? 'active' : '')" @click="clickPriceDown"></i>
            </span>
          </div>

          <!-- 筛选 -->
          <div :class="'item ' + (isShow_active ? 'active' : '')" class="item" @click="clickNavScreen">
            筛选
          </div>
        </div>

        <!-- 综合的子项 -->
        <div class="item-child" v-if="comprehensive_popup">
          <div class="item">
            <!-- 综合排序 -->
            <div :class="'' + (sort_active ? 'active' : '')" @click="clickComprehensiveSort">
              <span>综合排序</span>
              <em v-if="sort_active"></em>
            </div>
            <!-- 新品优选 -->
            <div :class="'' + (first_active ? 'active' : '')" @click="clickComprehensivePreferred">
              新品优选
              <em v-if="first_active"></em>
            </div>
          </div>
        </div>
        <!-- 筛选的子项 -->
        <van-popup v-model="filter_popup_whether_display" position="right" :style="{ height: '100%', width: '88%' }">
          <!-- 筛选盒子 -->
          <div class="filter-box">
            <div class="filter-con">
              <!-- 主要的-->
              <div class="con filter-main">
                <!-- 主要的筛选服务 -->
                <div class="filter-child">
                  <div class="filter-head">
                    <span>服务</span>
                    <span class="address-infor">
                      <i class="icon-location"></i>
                      选择配送地址
                    </span>
                  </div>
                  <div class="filter-list">
                    <span v-for="(item, index) in filter_tags" :key="index" @click="clickService(index)" :class="
                      'filter-item ' +
                      (filter_tags_index == index ? 'active' : '')
                    ">{{ item.name }}</span>
                  </div>
                </div>

                <!-- 主要的筛选头部 -->
                <div class="filter-head">
                  <span>分类</span>
                  <span @click="isShow_whole_list = !isShow_whole_list" :class="
                    'icon ' + (isShow_whole_list ? 'icon-up' : 'icon-down')
                  " v-if="classes?.length > 3"></span>
                </div>

                <!-- 主要的筛选列表 -->
                <div class="filter-list" :class="{ hide: !isShow_whole_list }">
                  <span v-for="(item, index) in classes" :key="index" @click="clickFilter(index)" :class="{
                    'filter-item': true,
                    active: classes_index == index,
                  }">{{ item.class_name }}</span>
                </div>
              </div>

              <!-- 次要的 -->
              <div class="con" v-show="isShow_con">
                <div class="filter-child" v-for="(classType, index) in class_parameters" :key="classType.parameter_id">
                  <!-- 次要的筛选头部 -->
                  <div class="filter-head">
                    <span>{{ classType.parameter_name }}</span>
                    <span @click="clickOpen(index)" class="icon" :class="classType.isOpen ? 'icon-up' : 'icon-down'"
                      v-if="classType.rules?.length > 3"></span>
                  </div>

                  <!-- 次要的筛选列表 -->
                  <div :class="
                    'filter-list ' + (classType.isOpen ? 'show' : 'hide')
                  ">
                    <span v-for="(rule, rule_idx) in classType.rules" :key="rule_idx"
                      :class="'filter-item ' + (rule.checked ? 'active' : '')" @click="rule.checked = !rule.checked">{{
                        rule.name
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 筛选重置/确定 -->
            <div class="filter-btn">
              <span class="btn btn-white">重置</span>
              <span class="btn">确定</span>
            </div>
          </div>
        </van-popup>
      </div>

      <!-- 类的头部 -->
      <div class="app-classes-head" v-if="isShow_con">
        <!-- 规格导航 -->
        <div class="nav-specs">
          <!-- 规格导航-项 -->
          <div v-for="(item, index) in specs_nav_data.slice(0, 4)" :key="index" @click="clickDisplayNav(index)" :class="
            'item border-1px ' +
            (nav_index == index && nav_display_or_hide ? 'active' : '')
          ">
            <span>{{ item.quick_search_name }}</span>
            <div class="icon icon-down icon-up"></div>
          </div>
          <!-- 规格导航-项-子项 -->
          <div class="item-child" v-if="nav_display_or_hide">
            <div class="box bd-top-1px bd-bottom-1px">
              <div class="bd-bottom-1px" v-for="(item, index) in rules" :key="index" @click="child_index = index"
                :class="{ active: child_index == index }">
                <em></em>
                <p class="name">{{ item.name }}</p>
                <p class="desc">{{ item.desc }}</p>
              </div>
            </div>
            <div class="btn-box">
              <span class="btn btn-white">重置</span>
              <span class="btn">确定</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品 -->
    <div class="page-wrap" :style="{
      paddingTop:
        (isShow_con && isShow_guide
          ? 240
          : !isShow_con && isShow_guide
            ? 186
            : 79) + 'rem',
    }">
      <!-- 商品列表 -->
      <div class="app-goods-list">
        <!-- 商品分类 -->
        <div class="app-goods-classify">
          <div class="classify-box">
            <div v-for="(item, index) in classes" :key="index" @click="clickFilter(index, item.class_name)" :class="{
              'classify-item': true,
              active: classes_index == index,
            }">
              <span>
                <img :src="item.class_icon" alt="" />
                {{ item.class_name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品盒子 -->

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="item-box" v-for="(item, index) in list_v2" :key="index">
        <div v-if="!item?.body?.recommend_class.length > 0" class="item bd-bottom-1px" @click="
          jumpCommodityView(`/commodity/detail/${item.body.product_id}`)
        ">
          <img v-if="item.body.image" class="item-img" :src="item.body.image" alt="" />
          <div class="item-con">
            <h3 v-if="item.body.name" :class="{ mt: !item?.body?.class_parameters?.list.length > 0 }">
              {{ item.body.name }}
            </h3>
            <p v-if="item.body.desc" class="item-desc" v-html="item.body.desc"></p>

            <div class="item-specs-list" v-if="item?.body?.class_parameters?.list.length > 0">
              <div class="specs-item bd-right-1px" v-for="item_text in item.body.class_parameters.list"
                :key="item_text.parameter_id">
                <span class="name">{{ item_text.name }}</span>
                <span class="desc">{{ item_text.value }}</span>
              </div>
            </div>
            <div class="item-price" v-if="item.body.price">
              <sub>¥</sub>
              {{ item.body.price }}
              <span class="spe">起</span>
              <del v-if="item.body.price != item.body.market_price">
                <sub>¥</sub>
                {{ item.body.market_price }}
              </del>

              <span class="icon-box" v-if="item.body?.sale_label?.activity_label">
                <img v-for="(item, index) in item.body?.sale_label?.activity_label" :key="index" :src="item.img_url"
                  alt="" />
              </span>
            </div>

            <div class="item-count" v-if="item.body.comments_total">
              <span>{{ item.body.comments_total }}条评价</span>
              <span> {{ item.body.satisfy_per }}满意</span>
            </div>
          </div>
        </div>

        <div v-else class="recommend-class-box bd-bottom-1px">
          <h3>{{ item.body.recommend_title }}</h3>
          <div :class="{
            'recommend-class-list': true,
            hide: isShow_hide,
          }">
            <span v-for="(item_name, index) in item.body.recommend_class" :key="index"
              @click="jumpListViews(item_name.name, '/search/list')">
              {{ item_name.name }}
            </span>
          </div>
          <em :class="{ 'icon-down': isShow_hide, 'icon-up': !isShow_hide }" @click="isShow_hide = !isShow_hide"></em>
        </div>
      </div>
    </van-list>

    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import {
  Search,
  List,
  DropdownMenu,
  DropdownItem,
  Popup,
  Overlay,
  Button,
  Toast
} from "vant";
Vue.use(Search);
Vue.use(List);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popup);
Vue.use(Overlay);
Vue.use(Button);
Vue.use(Toast);

export default {
  name: "SearchView",
  data() {
    return {
      value: this.$route.query.key, //初始化搜索框的值
      search_key_data_list: null, //搜索关键字的数据列表
      isShow_search_key_list: false, //是否显示搜索关键字数据列表
      timer: null, //定时器

      classes: null, //类的所有数据
      classes_index: null, //类的索引
      class_parameters: [], //类的参数

      list_v2: [], //商品列表
      page_index: 2, //商品列表页面_索引
      loading: false, //触底加载更多
      finished: false, //触底加载更多

      comprehensive_text: "综合", //综合_文本
      comprehensive_popup: false, //初始化不显示综合的弹出层和遮罩层
      isShowHideDg: false, //遮罩层
      sort_text: "综合", //综合排序_文本
      newproducts_text: "新品", //新品优先_文本

      comprehensive_active: true, //综合初始化高亮
      sort_active: true, //综合排序初始化高亮
      first_active: false, //新品优先初始化不高亮

      sales_active: false, //销量初始化不高亮

      price_active: false, //价格初始化不高亮
      price_up_active: false, //价格上初始化不高亮
      price_bown_active: false, //价格上初始化不高亮
      price_switch_up_bown_activ: false, //点击价格切换上下高亮

      filter_popup_whether_display: false, //初始化不显示筛选的弹出层

      filter_tags: null, //筛选服务_数据
      filter_tags_index: null, //筛选服务_索引

      isShow_whole_list: false, //初始化不显示全部列表

      class_buy_guide: null, //选购指南数据
      isShow_guide: false, //初始化选购指南不显示

      nav_display_or_hide: false, //规格导航-项-子项
      nav_index: null, //规格导航-项-索引
      specs_nav_data: null, //规格导航数据
      rules: null, //规格导航显示板块的数据
      child_index: null, //规格导航-项-子项-索引

      isShow_con: false, //次要板块不显示

      isShow_active: false, //筛选默认不高亮

      isShow_hide: true, //全部推荐类
    };
  },

  mounted() {
  },
  computed: {},

  // 在当前路由改变，但是该组件被复用时调用
  beforeRouteUpdate(to, from, next) {
    this.onLoad();
    this.list_v2 = []
    next();
  },

  methods: {
    // 点击赋值
    onSearch(value) {
      this.value = value;
    },
    onInput() {
      clearTimeout(this.timer); //清除上一次定时器
      if (this.value == "") {
        this.isShow_search_key_list = false;
      }
      this.timer = setTimeout(() => {
        if (this.value !== "") {
          this.axios({
            method: "get",
            url: "hisearch/suggestion_v3",
            params: {
              query: this.value,
            },
          }).then((res) => {
            this.search_key_data_list = res.data.data.list;
            this.isShow_search_key_list = true;
          });
        }
      }, 1000);
    },
    // 点击跳转
    jumpListView(str, url) {
      this.value = str;
      this.isShow_search_key_list = false;
      this.$router.push({ path: url, query: { key: str } });
    },

    jumpListViews(key, url) {
      this.value = key;
      this.$router.push({ path: url, query: { key: key } });
    },
    jumpCommodityView(routing) {
      this.$router.push(routing);
    },

    // 点击返回上一级
    clickReturn() {
      this.$router.go(-1);
    },
    // 发送ajax请求
    onLoad() {
      this.page_index = this.list_v2.length / 20 + 1;
      setTimeout(() => {
        this.axios({
          method: "get",
          url: "hisearch/query_v3",
          params: {
            query: this.$route.query.key,
            page_index: this.page_index,
            page_size: 20,
          },
        }).then((res) => {
          // 加载状态结束
          this.loading = false;
          this.classes = res.data.data.classes;
          this.list_v2.push(...res.data.data.list_v2);
          this.filter_tags = res.data.data.filter_tags;
        });
      }, 500);
    },

    //点击遮罩层
    clickHideDg() {
      this.comprehensive_popup = false;
      this.nav_display_or_hide = false;
      this.isShowHideDg = false;
    },

    //点击综合
    clickNavComprehensive() {
      this.comprehensive_popup = !this.comprehensive_popup;
      this.comprehensive_active = false;

      this.isShowHideDg = !this.isShowHideDg;
    },
    //点击综合排序
    clickComprehensiveSort() {
      //防止重复点击
      if (this.sort_active) {
        return;
      }

      //判断
      this.sort_active = true;
      this.first_active = false;
      this.comprehensive_text = this.sort_text;

      this.comprehensive_popup = false;
      this.isShowHideDg = false;

      this.comprehensive_active = true;
      this.sales_active = false;
      this.price_active = false;
      this.price_up_active = false;
      this.price_bown_active = false;

      //发送axaj请求
      this.list_v2 = [];
      this.onLoad();
    },

    //点击新品优选
    clickComprehensivePreferred() {
      //防止重复点击
      if (this.first_active) {
        return;
      }

      //判断
      this.sort_active = false;
      this.first_active = true;
      this.comprehensive_text = this.newproducts_text;

      this.comprehensive_popup = false;
      this.isShowHideDg = false;

      this.comprehensive_active = true;
      this.sales_active = false;
      this.price_active = false;
      this.price_up_active = false;
      this.price_bown_active = false;

      //发送ajax请求
      this.list_v2 = [];
      this.page_index = this.list_v2.length / 20 + 1;
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.axios({
        method: "get",
        url: "hisearch/query_v3",
        params: {
          query: this.$route.query.key,
          page_index: this.page_index,
          page_size: 20,
          main_sort: 4,
        },
      }).then((res) => {
        this.list_v2 = res.data.data.list_v2;
        // 数据回来之后 取消加载
        Toast.clear();
      });
    },

    //点击销售
    clickNavActive() {
      //防止重复点击
      if (this.sales_active) {
        return;
      }

      //判断
      this.comprehensive_active = false;
      this.sort_active = false;
      this.first_active = false;
      this.sales_active = true;
      this.price_active = false;
      this.price_up_active = false;
      this.price_bown_active = false;

      //发送axaj请求
      this.list_v2 = [];
      this.onLoad();
    },

    //点击价格
    clickNavPrice() {
      this.price_switch_up_bown_activ = !this.price_switch_up_bown_activ;
      this.comprehensive_active = false;
      this.sort_active = false;
      this.first_active = false;
      this.sales_active = false;
      this.price_active = true;
      this.price_up_active = this.price_switch_up_bown_activ;
      this.price_bown_active = !this.price_switch_up_bown_activ;

      //发送ajax请求
      this.list_v2 = [];
      this.page_index = this.list_v2.length / 20 + 1;
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.axios({
        method: "get",
        url: "hisearch/query_v3",
        params: {
          query: this.$route.query.key,
          page_index: this.page_index,
          page_size: 20,
          main_sort: 2,
          sort_by: "dsc",
        },
      }).then((res) => {
        // 数据回来之后 取消加载
        Toast.clear();
        this.list_v2 = res.data.data.list_v2;
      });
    },
    //点击价格上
    clickPriceUp() {
      this.price_active = true;
      this.price_up_active = true;
      this.price_bown_active = false;
    },
    //点击价格下
    clickPriceDown() {
      this.price_active = true;
      this.price_up_active = false;
      this.price_bown_active = true;
    },

    //点击筛选
    clickNavScreen() {
      //是否显示弹出层
      this.filter_popup_whether_display = !this.filter_popup_whether_display;
    },
    //点击服务
    clickService(index) {
      this.filter_tags_index = index;
    },
    //主要的筛选列表
    clickFilter(index, class_name) {
      //点击商品分类发送ajax请求
      this.list_v2 = [];
      this.page_index = this.list_v2.length / 20 + 1;
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.axios({
        method: "get",
        url: "hisearch/query_v3",
        params: {
          query: this.$route.query.key,
          page_index: this.page_index,
          page_size: 20,
          main_sort: 0,
          class_parameters: `{"class_name":"${class_name}"}`,
        },
      }).then((res) => {
        this.list_v2 = res.data.data.list_v2;
        // 数据回来之后 取消加载
        Toast.clear();
      });

      this.classes_index = index;

      this.isShow_active = true;

      //处理数据
      this.class_parameters = this.classes[index].class_parameters;
      this.class_parameters.forEach((item) => {
        item.isOpen = false;
      });

      // 次要是否显示
      this.isShow_con = false;
      if (this.classes[index].class_parameters.length > 0) {
        this.isShow_con = true;
      }

      //选购指南
      this.class_buy_guide = this.classes[index].class_buy_guide;
      if (this.classes[index].class_buy_guide) {
        this.isShow_guide = true;
      }

      //规格导航
      this.specs_nav_data = this.class_parameters.filter((item) => {
        return item.is_quick_search == true;
      });
    },

    //点击展开
    clickOpen(a_index) {
      this.class_parameters[a_index].isOpen =
        !this.class_parameters[a_index].isOpen;
      //数据更新了，但没有重新渲染页面，手动更新渲染
      this.$forceUpdate();
    },

    //点击规格导航-项
    clickDisplayNav(index) {
      this.isShowHideDg = true;

      if (index == this.nav_index) {
        this.nav_display_or_hide = !this.nav_display_or_hide;
        this.isShowHideDg = !this.isShowHideDg;
        return;
      }
      this.nav_index = index;
      this.nav_display_or_hide = true;

      this.rules = this.specs_nav_data[index].rules;
    },
  },

  watch: {
    value() {

    },
  },
};
</script>


<style lang="scss" scoped>
.app-search-page {
  color: #3c3c3c;

  // 遮罩层
  .showbg {
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    width: 100%;
  }

  // 头部
  .app-search-head {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    background: #fafafa;

    // 搜索
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

    // 搜索关键字列表
    .search-key-list {
      text-align: left;
      position: fixed;
      top: 41.667rem;
      z-index: 1000;
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

    // 选购指南
    .guide {
      width: 100%;
      display: block;
    }

    // 导航
    .app-nav {
      width: 100%;
      position: relative;
      z-index: 88;

      // 主要的导航
      .nav-main {
        background: #fafafa;
        display: flex;
        align-items: center;
        font-size: 14.5833rem;
        line-height: 37.5rem;

        // position: relative;
        .item {
          text-align: center;
          color: rgba(0, 0, 0, 0.54);
          flex: 1;

          // position: relative;
          .icon {
            width: 0;
            height: 0;
            border-style: solid;
            display: inline-block;
            margin-left: 5.208rem;
            vertical-align: middle;
          }

          .icon-down {
            border-color: #bdbdbd transparent transparent;
            color: #bdbdbd;
            border-width: 4.164rem 4.164rem 0;
          }

          .active {
            border-color: #ff6700 transparent transparent;
            color: #ff6700;
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

              &.active {
                border-color: transparent transparent #ff6700;
              }
            }

            .icon-down {
              top: -1.039rem;
              border-width: 4.164rem 4.164rem 0;
              border-color: #bdbdbd transparent #bdbdbd;

              &.active {
                border-color: #ff6700 transparent transparent;
              }
            }
          }
        }

        .active {
          color: #ff6700;
        }
      }

      // 综合的子项
      .item-child {
        position: absolute;
        top: 37.5rem;
        left: 0;
        width: 100%;
        font-size: 14.5833rem;
        z-index: 3;

        .item {
          width: 100%;
          background: #fff;

          div {
            line-height: 50rem;
            text-align: left;
            margin: 0 16.667rem;
            color: rgba(0, 0, 0, 0.87);
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;

            em {
              width: 18.75rem;
              height: 12.5rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAAAXNSR0IArs4c6QAAAWJJREFUSA3F1r9KxEAQBvBvAmoh9wD2Vr6C+gTXWSgi2OoJNqKdwnFvYOc9wjV2YqGFnaWF7fVqKXYirt/cwZIjidlshs1A/uxmd+dHsptE0HG4AS7gcEbGM5awL1163DFGxFx5Q4bdzBcSnxQwgl/ipp2AChiQApzIDV6SP7JSjGBAzFgfUlJQHSYpKASTDBSKUZCf1O4cq1phHU0wmlvcKVbwjUeeb3GbYA2HMmSNQTTFaMoMP9jmUTEae3jDrRtieV6M38dgNFvG1K88fuZS99uiYjEzkFzjg4u/z8KXBaoNRvP79xAH2uT78p51vRzsjnNqJ3ROtcUsgLTQBmWBKYBiUVaYUlBTlCWmEhSKssb8C6pD4R2XCz9X+guR+2pr/5jwq6yqM+9CcfUJpky/nutjgtHxakHaqBSlF+ZhhtHhgkDasAJlimkEKkGZYxqDZqgjbPC+HnAOPckYD1pnGX+3u8d2kq5oywAAAABJRU5ErkJggg==) 50% 0;
              background-size: cover;
              margin-top: 15.625rem;
              display: block;
            }
          }

          .active {
            color: #ff6700;
          }
        }
      }
    }

    // 类的头部
    .app-classes-head {
      width: 100%;
      position: relative;
      z-index: 1;

      // 规格导航
      .nav-specs {
        background: #fafafa;
        height: 43.747rem;
        font-size: 12.5rem;
        padding: 10.417rem 5.208rem 0;
        position: relative;
        width: 100%;
        text-align: left;

        // 规格导航-项
        .item {
          display: inline-block;
          color: rgba(0, 0, 0, 0.54);
          width: 82.813rem;
          height: 31.25rem;
          line-height: 31.25rem;
          margin: 0 4.167rem;
          font-size: 12.5rem;
          position: relative;
          z-index: 3;

          &::before {
            border-color: rgba(0, 0, 0, 0.15);
            border-radius: 4px;
          }

          span {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 72.914rem;
            height: 31.25rem;
            text-align: center;
          }

          &.active {
            color: #ff6700;
            background: #fff;
            padding-bottom: 10.667rem;
            margin-top: 0;

            &::after {
              content: "";
              display: block;
              background: #fff;
              width: 100%;
              height: 3px;
              position: absolute;
              z-index: 3;
              bottom: -2px;
            }

            .icon-up {
              border-color: transparent transparent #ff6700;
              border-width: 0 4.164rem 4.164rem;
            }
          }
        }

        .border-1px::before {
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          content: "";
          pointer-events: none;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #999;
          transform-origin: 0 0;
          text-decoration: inherit;
          vertical-align: inherit;
        }

        .icon-down {
          border-width: 4.164rem 4.164rem 0;
          border-color: #bdbdbd transparent transparent;
        }

        .icon {
          width: 0;
          height: 0;
          border-style: solid;
          display: inline-block;
          margin-left: 5.208rem;
          vertical-align: middle;
          position: absolute;
          right: 4.167rem;
          top: 13.021rem;
        }

        // 规格导航-项-子项
        .item-child {
          position: absolute;
          top: 52.604rem;
          left: 0;
          width: 100%;
          font-size: 14.58rem;
          z-index: 2;

          .name {
            font-size: 14.58rem;
            color: rgba(0, 0, 0, 0.87);
          }

          .box {
            width: 100%;
            background: #fff;

            &::before {
              top: -2px;
            }

            &::after {
              border-color: rgba(0, 0, 0, 0.15);
            }

            &>div {
              box-sizing: border-box;
              text-align: left;
              display: block;
              margin: 0 16.667rem;
              padding: 14.063rem 0;
              color: rgba(0, 0, 0, 0.54);
              position: relative;
            }

            .active {
              em {
                display: block;
                width: 18.75rem;
                height: 12.5rem;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAAAXNSR0IArs4c6QAAAWJJREFUSA3F1r9KxEAQBvBvAmoh9wD2Vr6C+gTXWSgi2OoJNqKdwnFvYOc9wjV2YqGFnaWF7fVqKXYirt/cwZIjidlshs1A/uxmd+dHsptE0HG4AS7gcEbGM5awL1163DFGxFx5Q4bdzBcSnxQwgl/ipp2AChiQApzIDV6SP7JSjGBAzFgfUlJQHSYpKASTDBSKUZCf1O4cq1phHU0wmlvcKVbwjUeeb3GbYA2HMmSNQTTFaMoMP9jmUTEae3jDrRtieV6M38dgNFvG1K88fuZS99uiYjEzkFzjg4u/z8KXBaoNRvP79xAH2uT78p51vRzsjnNqJ3ROtcUsgLTQBmWBKYBiUVaYUlBTlCWmEhSKssb8C6pD4R2XCz9X+guR+2pr/5jwq6yqM+9CcfUJpky/nutjgtHxakHaqBSlF+ZhhtHhgkDasAJlimkEKkGZYxqDZqgjbPC+HnAOPckYD1pnGX+3u8d2kq5oywAAAABJRU5ErkJggg==) 50% 0;
                background-size: cover;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -6.25rem;
              }

              .name {
                color: #ff6700;
                font-size: 14.5833rem;
              }
            }
          }

          .btn-box {
            display: flex;
            align-items: center;

            span {
              flex: 1;
              font-size: 16.667rem;
              height: 47.477rem;
              line-height: 47.477rem;
            }

            .btn-white {
              background: #fff;
              color: rgba(0, 0, 0, 0.87);
            }
          }

          .btn {
            display: block;
            outline: 0;
            background: #ff6700;
            color: #fff;
            text-align: center;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.28rem;
          }

          .desc {
            font-size: 12.5rem;
            margin-top: 10.417rem;
          }

          .bd-top-1px::before {
            width: 200%;
            transform: scale(0.5) translateZ(0);
            border-top: 1px solid #d9d9d9;
            left: 0;
            transform-origin: 0 top;
            content: "";
            display: block;
            position: absolute;
            text-decoration: inherit;
            box-sizing: inherit;
          }

          .bd-bottom-1px::after {
            width: 200%;
            transform: scale(0.5) translateZ(0);
            border-bottom: 1px solid #d9d9d9;
            left: 0;
            bottom: 0;
            transform-origin: 0 bottom;
            content: "";
            display: block;
            position: absolute;
            text-decoration: inherit;
            box-sizing: inherit;
          }
        }
      }
    }

    // 头部共同样式
    .bd-bottom-1px,
    .bd-left-1px,
    .bd-right-1px,
    .bd-top-1px {
      position: relative;
    }

    // 修改vany默认样式
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

  // 商品
  .page-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    overflow: auto;
    height: 100%;
    background: #fafafa;

    // 商品列表
    .app-goods-list {

      // 商品分类
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

          .active {
            color: #ff6700;
          }
        }
      }
    }
  }
}

// 商品盒子
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

        .bd-right-1px {
          position: relative;
          border-right: 1px solid #d9d9d9;

          &:nth-child(3n) {
            border-right: 0;
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

  .recommend-class-box {
    background: #fff;
    padding-bottom: 15.104rem;

    h3 {
      font-size: 14.5833rem;
      color: rgba(0, 0, 0, 0.87);
      line-height: 19.786rem;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
      text-align: left;
      margin-left: 16.667rem;
      margin-bottom: 16.146rem;
      padding-top: 15.104rem;
    }

    .recommend-class-list {
      text-align: left;
      padding-left: 16.667rem;

      &.hide {
        max-height: 83.328rem;
        overflow: hidden;
      }

      span {
        display: inline-block;
        background: #f5f5f5;
        height: 34.891rem;
        line-height: 34.891rem;
        width: 79.164rem;
        margin-right: 7.813rem;
        margin-bottom: 7.813rem;
        color: rgba(0, 0, 0, 0.87);
        text-align: center;
        font-size: 12.5rem;
      }
    }

    em {
      width: 11.453rem;
      height: 6.766rem;
      display: block;
      margin: 14.583rem auto 0;
    }

    .icon-down {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAANCAYAAACtpZ5jAAAAAXNSR0IArs4c6QAAAalJREFUOBGtk89KAlEUxp0/Tha0aZEQFW2KeoKW2aYWtShchIvCGcZ/D9Fz6KgzxEQEIuRC3NkdW/YQUVHQQqdlCI72nYEropkpHbhz555zz+9+9xsNBP45DMMIElKgBxaXkiTZuq6/0HrWKJVK861WqyqK4oNYLBaXut3uRafTYZZlrc0KrdVqc67rVgRB2AWj7isuFAqrADcIKsvyXiKReJvmAChVAL1DT6TX6x1lMhnHBxMEdqwj6WB4tAHFd8pPCvIUNy5D6QH2HqfT6Tr1iLwxlUq9Qu0+1kFsYqZprvDauJkxJgN6i/ohfD3hUNrfV8ybs9nsBsANKP8KhUIRVVU/eG1wxvUlXP8GuVNAo8lksjpY7yvmSVjwrCgKKV9ot9sM/od5jc84VAT0CnMUIs6GobRvBExJTdOeoILgi57n3du2vUx5CsAE+GriNQZoDBZW/MLQY8SKwXoul9sEyAHgk24BW5qAGtijYZzDU/L3x/gVTB35fH4LH8jBaxPjEQep+DPFcf1rrMfGRDB1QuQ24AzKw7BIB9QaS5y2gI+4g19M/K993+yYr2dUlPH1AAAAAElFTkSuQmCC) 50% 0 no-repeat;
      background-size: cover;
    }

    .icon-up {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAANCAYAAACtpZ5jAAAAAXNSR0IArs4c6QAAAZxJREFUOBGdk0tLAmEUhmcqRVTcuOwfRBRRRLRpkWREmwpm4yAMlKirFkH0D1oFLUpH3QQJYrSN7i76AUGLwsJN0FKLqJWX6fkkYszLDA6cmY9z3vOcy8xIks0rmUyO5/N5p025NGBHmEqlZtHdlcvlE13XHXZyLMHpdHqm0WicG4bxDDDIM1coFIas4D3BiURiularXQC593g8c7Isr3JeLhaLWdYy2AveFcxOpwBdYg9ut3spHA5/R6PRM2AKtlKpVI7ovmu+3Kkq40/W6/VrEh/9fn9QUZQvs46drxHP4ctSTKO4YY6Lc1vFTCYzwfhXxJ6cTufif6hIikQip8BUYUyWooG2Blsc4pMi7xZ78Xq9C6qqfgpQtwu9CvSIuB6LxeJm3V/HjD+G6AYr0UnQCiogrOEY7ToW5UXvm8HNjhl/tFqtik5fXS5XQNO0D7PI6gx0A7hOU3t0viX0MuOM4ChwfvP5fPOhUOjdCtQpDicO54DYLvAdsYphqpUcDkegX6goxFoO4Wxi2+KnEj6JSi0vsens8/b7AUg/uDyrTTPLDg0AAAAASUVORK5CYII=) 50% 0 no-repeat;
      background-size: cover;
    }
  }
}

//显示筛选
.filter-box {
  overflow: hidden;
  background: #f8f8f8;

  .filter-con {
    // padding-bottom: 52.078rem;
    background: #f8f8f8;
    height: 100vh;
    overflow-y: auto;

    .con {
      background: #fff;
      margin-bottom: 4.167rem;
      padding: 16.667rem;
    }

    // 次要的
    .filter-child {
      margin-bottom: 28.125rem;

      .filter-head {
        font-size: 14.5833rem;
        height: 19.266rem;
        line-height: 19.266rem;
        color: rgba(0, 0, 0, 0.54);
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .address-infor {
          color: #ff6b00;
          font-size: 12.5rem;

          .icon-location {
            display: inline-block;
            width: 9.891rem;
            height: 12.5rem;
            margin-right: 4.688rem;
            vertical-align: middle;
            margin-top: -2.604rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAAAAXNSR0IArs4c6QAAAwhJREFUOBGNlU1IlFEUht9vmkIlyALLoiAqxBqxaBH0Y2AkLbWgH/qjkMhJI4OizEWDO8H+sXITiC4iAmsTFNQiEqtFgtHGRUQQjkTN6MLwb27Pvc43jJ9aXric77zve84999x7Zzz9Y5g6rdKk1iNZqpB+Yvu9Vv2aK8QLEiamsOKqllEN3JYAP4nfTeJb3gM9C3DAWcOc0wYS9QLdl6d+7EFmkRarABtBfQZ8TCl1mRq9Mhe1DDwzMpVBloC+ZcYJOMLKfRlV4MOcVQWaTuAhLdRO755rARDDXNESJV1FCS1SOeRwIH6Gy+JrAXtoR79WEhNTamqbSTWQtkALVDWfRDaz91Df2LZtw272csxhNDxPA5QZUgtbu25Bf3CaxRrXBfx18H1U3eLd0aDPW0uFT6mu2GtTSYhEFWB5zHZL+sPUajuJeql4LzNJwHGN6rM5r9W+xtmQi4vYwwshLAUcoKqv00STug33QYWKsKXDfG+CH+Esm6bpjN6l/dIQK65AGM8WmCd0T9oK3kljxyzHYgm0XXxus74/HC40kyq0lSUhlvuktd4hKNGblDZm42it/yMbczdBdFNKhBF0E9RIjyI8lS8ZocfFNYpxp4ao8z2aKvx98FUZjf0YcpiUo+4wm3zNIQxSy2WoU5Z3o1zNMLksdhUuF+y3fQFs63la4ZtLtiBO+bsDTFTXqGDCXQVfkrb2rXJSa4whJDCIqWQaay019QLsXYu7t/iRkzsQiJnVNW08pE/u6iSJ2WVF7gVwYiP0o565nyqPzhodBHsVAyoiQ12Qcj7ldjATdluzCtIg/A50E8yGbN3U2/SRfLfKMA1vT981n8lYdxVS6gDo4YE3Zwg+piXzmjnosE7QyTK90Y1sof12CyT1mHbk07GTtCcV1MzwebxRtmBPqTqbBL/JHGfuycb/+01AK8lGOZAyK8aedgtEVTtX8Iy74wvT/wUv8TczG9naXewjfmqiviZo50xmhaae3vxxvwoR+viCX5BK+jQRTDJvn2tQyJabqDTnf0F/AQcZ+md5uVAyAAAAAElFTkSuQmCC) 50% 0 no-repeat;
            background-size: cover;
          }
        }
      }

      .filter-list {
        text-align: left;

        .filter-item {
          display: inline-block;
          width: 90.703rem;
          text-align: center;
          height: 29.25rem;
          line-height: 29.25rem;
          background: #f5f5f5;
          color: rgba(0, 0, 0, 0.87);
          font-size: 12.5rem;
          border: 1px solid #f5f5f5;
          border-radius: 4px;
          margin-right: 8.333rem;
          margin-top: 8.333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .active {
          border: 1px solid #ff6700;
          color: #ff6700;
          background: #fde0d5;
        }
      }
    }

    // 过滤器头
    .filter-head {
      font-size: 14.5833rem;
      height: 19.266rem;
      line-height: 19.266rem;
      color: rgba(0, 0, 0, 0.54);
      text-align: left;

      display: flex;
      justify-content: space-between;

      // align-items: center;
      .icon {
        width: 11.453rem;
        height: 6.766rem;
        margin-top: 5.208rem;
      }

      .icon-down {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAANCAYAAACtpZ5jAAAAAXNSR0IArs4c6QAAAalJREFUOBGtk89KAlEUxp0/Tha0aZEQFW2KeoKW2aYWtShchIvCGcZ/D9Fz6KgzxEQEIuRC3NkdW/YQUVHQQqdlCI72nYEropkpHbhz555zz+9+9xsNBP45DMMIElKgBxaXkiTZuq6/0HrWKJVK861WqyqK4oNYLBaXut3uRafTYZZlrc0KrdVqc67rVgRB2AWj7isuFAqrADcIKsvyXiKReJvmAChVAL1DT6TX6x1lMhnHBxMEdqwj6WB4tAHFd8pPCvIUNy5D6QH2HqfT6Tr1iLwxlUq9Qu0+1kFsYqZprvDauJkxJgN6i/ohfD3hUNrfV8ybs9nsBsANKP8KhUIRVVU/eG1wxvUlXP8GuVNAo8lksjpY7yvmSVjwrCgKKV9ot9sM/od5jc84VAT0CnMUIs6GobRvBExJTdOeoILgi57n3du2vUx5CsAE+GriNQZoDBZW/MLQY8SKwXoul9sEyAHgk24BW5qAGtijYZzDU/L3x/gVTB35fH4LH8jBaxPjEQep+DPFcf1rrMfGRDB1QuQ24AzKw7BIB9QaS5y2gI+4g19M/K993+yYr2dUlPH1AAAAAElFTkSuQmCC) 50% 0 no-repeat;
        background-size: cover;
      }

      .icon-up {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAANCAYAAACtpZ5jAAAAAXNSR0IArs4c6QAAAZxJREFUOBGdk0tLAmEUhmcqRVTcuOwfRBRRRLRpkWREmwpm4yAMlKirFkH0D1oFLUpH3QQJYrSN7i76AUGLwsJN0FKLqJWX6fkkYszLDA6cmY9z3vOcy8xIks0rmUyO5/N5p025NGBHmEqlZtHdlcvlE13XHXZyLMHpdHqm0WicG4bxDDDIM1coFIas4D3BiURiularXQC593g8c7Isr3JeLhaLWdYy2AveFcxOpwBdYg9ut3spHA5/R6PRM2AKtlKpVI7ovmu+3Kkq40/W6/VrEh/9fn9QUZQvs46drxHP4ctSTKO4YY6Lc1vFTCYzwfhXxJ6cTufif6hIikQip8BUYUyWooG2Blsc4pMi7xZ78Xq9C6qqfgpQtwu9CvSIuB6LxeJm3V/HjD+G6AYr0UnQCiogrOEY7ToW5UXvm8HNjhl/tFqtik5fXS5XQNO0D7PI6gx0A7hOU3t0viX0MuOM4ChwfvP5fPOhUOjdCtQpDicO54DYLvAdsYphqpUcDkegX6goxFoO4Wxi2+KnEj6JSi0vsens8/b7AUg/uDyrTTPLDg0AAAAASUVORK5CYII=) 50% 0 no-repeat;
        background-size: cover;
      }
    }

    // 过滤器列表
    .filter-list {
      text-align: left;

      .filter-item {
        display: inline-block;
        width: 90.703rem;
        text-align: center;
        height: 29.25rem;
        line-height: 29.25rem;
        background: #f5f5f5;
        color: rgba(0, 0, 0, 0.87);
        font-size: 12.5rem;
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        margin-right: 8.333rem;
        margin-top: 8.333rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-child(3n) {
          margin-right: 0;
        }
      }

      .active {
        border: 1px solid #ff6700;
        color: #ff6700;
        background: #fde0d5;
      }
    }

    .hide {
      height: 39.578rem !important;
      overflow: hidden;
    }

    .show {
      height: 100% !important;
    }
  }

  .filter-btn {
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    // -webkit-transform: translateZ(0);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      flex: 1;
      width: 50%;
      display: block;
      outline: 0;
      background: #ff6700;
      color: #fff;
      text-align: center;
      width: 100%;
      height: 50.078rem;
      line-height: 50.078rem;
      font-size: 14.5833rem;
    }

    .btn-white {
      color: rgba(0, 0, 0, 0.87);
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      border: 1px solid transparent;
      background: transparent;
    }
  }
}
</style>