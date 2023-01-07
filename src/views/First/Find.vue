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
            <img
              :src="props.active ? icon.activecategory : icon.inactivecategory"
            />
          </template>
        </van-tabbar-item>

        <van-tabbar-item to="/discover">
          <span>米圈</span>
          <template #icon="props">
            <img
              :src="props.active ? icon.activediscover : icon.inactivediscover"
            />
          </template>
        </van-tabbar-item>

        <van-tabbar-item to="/cart" badge="5">
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
import Vue from "vue";
import { CellGroup, Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
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
  mounted() {
    if (this.$route.name == "DetailView") {
      this.RouteShow = false;
    } else {
      this.RouteShow = true;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name == "DetailView") {
      this.RouteShow = false;
    } else {
      this.RouteShow = true;
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.footer-nav {
  background: #fff;
  position: fixed;
  z-index: 9999;
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