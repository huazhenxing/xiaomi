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
          //米圈列表
          {
            path: "",
            name: "DiscoverView",
            component: () => import("@/views/First/Discover/DiscoverView.vue"),
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

      //我的订单
      {
        path: "order/list",
        name: "OrderListView",
        component: () => import("@/views/First/OrderList/OrderListView.vue"),
        meta: { isNeedLogin: true },
      },
    ],
  },
  //米圈详情
  {
    path: "/discover/article/:id/:content_type",
    name: "DetailView",
    component: () => import("@/views/First/Discover/DetailView.vue"),
  },
  //米圈用户
  {
    path: "/micircle/personal/:mid",
    name: "PersonalView",
    component: () => import("@/views/Personal/PersonalView"),
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

  //用户结算
  {
    path: "/order/checkout",
    name: "CheckoutView",
    component: () => import("@/views/Checkout/CheckoutView"),
    meta: { isNeedLogin: true },
  },

  //地址编辑
  {
    path: "/address/edit",
    name: "AddressEditView",
    component: () => import("@/views/AddressEdit/AddressEditView"),
  },

  //收货地址列表
  {
    path: "/address/list",
    name: "AddressListView",
    component: () => import("@/views/AddressList/AddressListView"),
  },

  //订单/付款
  {
    path: "/order/pay",
    name: "OrderPayView",
    component: () => import("@/views/OrderPay/OrderPayView"),
  },

  //登录
  {
    path: "/fe/service/login/phone",
    name: "LoginView",
    component: () => import("@/views/Login/LoginView"),
  },
  //个人中心
  {
    path: "/user/set",
    name: "UserSetView",
    component: () => import("@/views/UserSet/UserSetView"),
    meta: { isNeedLogin: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  if (to.meta.isNeedLogin && !localStorage.getItem("token")) {
    // 将用户重定向到登录页面
    router.push("/fe/service/login/phone");
  } else {
    // 用户已登录
    next();
  }
});

export default router;
