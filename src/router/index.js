import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/First/Find.vue"),
    children: [
      //首页
      {
        path: "",
        name: "HomeView",
        component: () => import("@/views/First/Home/HomeView.vue"),
      },
      //分类
      {
        path: "category",
        name: "CategoryView",
        component: () => import("@/views/First/Category/CategoryView.vue"),
      },
      //米圈
      {
        path: "discover",
        component: () => import("@/views/First/Discover/Find.vue"),
        children: [
          //列表
          {
            path: "",
            name: "DiscoverView",
            component: () => import("@/views/First/Discover/DiscoverView.vue"),
          },
          //详情
          {
            path: "article/:id/:content_type",
            name: "DetailView",
            component: () => import("@/views/First/Discover/DetailView.vue"),
          },
        ],
      },
      //购物车
      {
        path: "cart",
        name: "CartView",
        component: () => import("@/views/First/Cart/CartView.vue"),
      },
      //我的
      {
        path: "user",
        name: "UserView",
        component: () => import("@/views/First/User/UserView.vue"),
      },
      //商品列表
      {
        path: "commodity/list/:id",
        name: "CommodityListView",
        component: () =>
          import("@/views/First/Commodity/CommodityListView.vue"),
      },
    ],
  },
  //搜索
  {
    path: "/search",
    component: () => import("@/views/Search/Find.vue"),
    children: [
      //搜索商品
      {
        path: "",
        name: "SearchView",
        component: () => import("@/views/Search/SearchView.vue"),
      },
      //商品列表
      {
        path: "list",
        name: "ListView",
        component: () => import("@/views/Search/ListView.vue"),
      },
    ],
  },
  //商品详情
  {
    path: "/commodity/detail/:id",
    name: "CommodityView",
    component: () => import("@/views/Commodity/CommodityView"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
