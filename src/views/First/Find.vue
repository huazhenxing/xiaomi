<template>
  <div>
    <nav class="footer-nav" v-if="RouteShow">
      <van-tabbar v-model="active">

        <van-tabbar-item to="/">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon.activehome : icon.inactivehome" />
          </template>
        </van-tabbar-item>

        <van-tabbar-item to="/category">
          <span>分类</span>
          <template #icon="props">
            <img :src="props.active ? icon.activecategory : icon.inactivecategory" />
          </template>
        </van-tabbar-item>

        <van-tabbar-item to="/discover">
          <span>米圈</span>
          <template #icon="props">
            <img :src="props.active ? icon.activediscover : icon.inactivediscover" />
          </template>
        </van-tabbar-item>

        <van-tabbar-item to="/cart" :badge="cartCommodityList.length > 0 ? cartCommodityList.length : ''"
          @click=clickNav(3) color="#ed4d41">
          <span>购物车</span>
          <template #icon="props">
            <img :src="props.active ? icon.activecart : icon.inactivecart" />
          </template>
        </van-tabbar-item>

        <van-tabbar-item to="/user">
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ? icon.activeuser : icon.inactiveuser" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      // active: Number(window.localStorage.getItem('nav_index')) || 0,
      active: 0,
      icon: {
        activehome:
          "https://m.mi.com/static/img/icon-home-selected.598ca2c8f9.png",
        inactivehome: "https://m.mi.com/static/img/icon-home.c1947eda40.png",

        activecategory:
          "https://m.mi.com/static/img/icon-category-selected.252b82a2d7.png",
        inactivecategory:
          "https://m.mi.com/static/img/icon-category.be93273636.png",

        activediscover:
          "https://m.mi.com/static/img/icon-star-selected.52a68e3664.png",
        inactivediscover:
          "https://m.mi.com/static/img/icon-star.d051789804.png",

        activecart:
          "https://m.mi.com/static/img/icon-cart-selected.0099b47830.png",
        inactivecart: "https://m.mi.com/static/img/icon-cart.585c3aa4d3.png",

        activeuser:
          "https://m.mi.com/static/img/icon-user-selected.fceea5d907.png",
        inactiveuser: "https://m.mi.com/static/img/icon-user.23496a0116.png",
      },
      RouteShow: true,
    };
  },
  methods: {
    clickNav(index) {
      if (index == 3 && this.cartCommodityList.length >= 1) {
        this.RouteShow = false;
      } else {
        this.RouteShow = true
      }
    }
  },
  mounted() {
    if (this.cartCommodityList.length >= 1 && this.$route.name == "CartView") {
      this.RouteShow = false;
    } else {
      this.RouteShow = true
    }

    // console.log('this.$route==>', this.$route.path);
    if (this.$route.path == '/') {
      this.active = 0
    } else if (this.$route.path == '/category') {
      this.active = 1
    } else if (this.$route.path == '/discover') {
      this.active = 2
    } else if (this.$route.path == '/cart') {
      this.active = 3
    } else if (this.$route.path == '/user' || this.$route.path == '/order/list') {
      this.active = 4
    }

  },
  watch: {
    $route(to) {
      if (to.path == '/') {
        this.active = 0
        this.RouteShow = true
      } else if (to.path == '/category') {
        this.active = 1
        this.RouteShow = true
      } else if (to.path == '/discover') {
        this.active = 2
        this.RouteShow = true
      } else if (to.path == '/cart') {
        this.active = 3
      } else if (to.path == '/user') {
        this.active = 4
        this.RouteShow = true
      } else if (to.path == '/order/list') {
        this.active = 4
      }
    },

    cartCommodityList: function () {
      if (this.cartCommodityList.length >= 1 && this.$route.name == "CartView") {
        this.RouteShow = false;
      } else {
        this.RouteShow = true
      }
    }
  },



  computed: {
    ...mapState(["cartCommodityList"]),
    ...mapGetters(["quantity"]),
  },
};
</script>,

<style lang="scss" scoped>
.footer-nav {
  background: #fff;
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 50rem;

  .flex {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    &.router-link-exact-active {
      color: #ff6700;
    }

    .app-img-icon {
      width: 20rem;
      height: 20rem;
    }
  }
}
</style>