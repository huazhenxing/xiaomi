import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //用于存储数据
  state: {
    list: [],
    cartCommodityList:
      JSON.parse(window.localStorage.getItem("cartCommodityList")) || [], //购物车商品清单

    cartSuccessCommodityList: null, //从购物车下单成功的商品列表

    order_list: JSON.parse(window.localStorage.getItem("order_list")) || [], //我的订单_列表

    buy_now_place_an_order:
      JSON.parse(window.localStorage.getItem("buy_now_place_an_order")) || [], //立即购买下单

    all_pay_success_order_list:
      JSON.parse(window.localStorage.getItem("all_pay_success_order_list")) ||
      [], //之前所有_成功_订单列表

    ImmediatePayment: [], //立即付款

    index: null, //重新下单索引
  },

  //用于响应组件中的动作
  actions: {
    decrement(context, value) {
      if (context.state.cartCommodityList[value].goods_count < 5) {
        context.commit("DECREMENT", value);
      } else {
        return;
      }
    },

    increment(context, value) {
      if (context.state.cartCommodityList[value].goods_count > 1) {
        context.commit("INCREMENT", value);
      } else {
        return;
      }
    },
  },

  //用于操作数据(state)
  mutations: {
    // 增加商品数量
    DECREMENT(state, value) {
      state.cartCommodityList[value].goods_count += 1;
      window.localStorage.setItem(
        "cartCommodityList",
        JSON.stringify(state.cartCommodityList)
      );
    },
    // 减少商品数量
    INCREMENT(state, value) {
      state.cartCommodityList[value].goods_count -= 1;
      window.localStorage.setItem(
        "cartCommodityList",
        JSON.stringify(state.cartCommodityList)
      );
    },
    //是否选择该商品
    IS_SELECT(state, value) {
      state.cartCommodityList[value].state =
        !state.cartCommodityList[value].state;
      window.localStorage.setItem(
        "cartCommodityList",
        JSON.stringify(state.cartCommodityList)
      );
    },
    //删除该商品
    DELETE(state, value) {
      state.cartCommodityList.splice(value, 1);
      window.localStorage.setItem(
        "cartCommodityList",
        JSON.stringify(state.cartCommodityList)
      );
    },

    //加入购物车
    ADD_TO_CART(state, value) {
      //判断数组里面是否存在该商品，如果存在，则数量增加,否则添加该商品
      let idx = state.cartCommodityList.findIndex(
        (item) => item.goods_id === value.goods_id
      );
      if (idx == -1) {
        state.cartCommodityList.unshift(value);
      } else {
        //加
        value.goods_count += state.cartCommodityList[idx].goods_count;
        //删
        state.cartCommodityList.splice(idx, 1);
        //加
        state.cartCommodityList.unshift(value);
      }
      window.localStorage.setItem(
        "cartCommodityList",
        JSON.stringify(state.cartCommodityList)
      );
    },

    //过滤掉已经下单成功的商品
    FILTER(state, value) {
      if (!value) {
        // //1.购物车下单购买（合并之前已经下单成功的订单）
        state.cartSuccessCommodityList = state.cartCommodityList.filter(
          (item) => item.state
        );
        let item = state.cartSuccessCommodityList.map((o) => ({
          ...o,
          orderTime: Date.now(),
          isPayment: false,
        }));
        state.all_pay_success_order_list.unshift(...item);
      } else {
        //1.购物车下单购买（合并之前已经下单成功的订单）
        state.cartSuccessCommodityList = state.cartCommodityList.filter(
          (item) => item.state
        );
        let item = state.cartSuccessCommodityList.map((o) => ({
          ...o,
          orderTime: Date.now(),
          isPayment: true,
        }));
        state.all_pay_success_order_list.unshift(...item);
      }
      window.localStorage.setItem(
        "all_pay_success_order_list",
        JSON.stringify(state.all_pay_success_order_list)
      );

      //2.下单成功后==>删除本地存储中cartCommodityList数据里面的state==true的数据
      state.cartCommodityList = state.cartCommodityList.filter(
        (item) => !item.state
      );

      //3.把上面2筛选出来的重新存到cartCommodityList
      window.localStorage.setItem(
        "cartCommodityList",
        JSON.stringify(state.cartCommodityList)
      );
    },

    //立即购买
    BNYNOW(state, value) {
      state.buy_now_place_an_order = [value];
      window.localStorage.setItem(
        "buy_now_place_an_order",
        JSON.stringify(state.buy_now_place_an_order)
      );
    },

    //添加地址进当前下单数据里面
    APPADDRESS(state, value) {
      if (value.judge) {
        //遍历添加地址进当前下单数据里面
        let add = state.cartCommodityList.filter((item) => item.state);
        let isState = state.cartCommodityList.filter((item) => !item.state);
        add = add.map((item) => ({ ...item, ...value }));
        state.cartCommodityList = [...add, ...isState];

        window.localStorage.setItem(
          "cartCommodityList",
          JSON.stringify(state.cartCommodityList)
        );
      } else {
        //单独添加进来
        state.buy_now_place_an_order = state.buy_now_place_an_order.map(
          (item) => ({
            ...item,
            ...value,
          })
        );
        window.localStorage.setItem(
          "buy_now_place_an_order",
          JSON.stringify(state.buy_now_place_an_order)
        );
      }
    },

    // //立即下单购买（合并之前已经下单成功的订单）
    // BNYNOWBUY(state, value) {
    //   state.buy_now_place_an_order = state.buy_now_place_an_order.map((o) => ({
    //     ...o,
    //     orderTime: Date.now(),
    //   }));

    //   state.all_pay_success_order_list.unshift(...state.buy_now_place_an_order);

    //   window.localStorage.setItem(
    //     "all_pay_success_order_list",
    //     JSON.stringify(state.all_pay_success_order_list)
    //   );
    // },

    //立即下单购买（合并之前已经下单成功的订单）
    BNYNOWBUY(state, value) {
      if (!value) {
        state.buy_now_place_an_order = state.buy_now_place_an_order.map(
          (o) => ({
            ...o,
            orderTime: Date.now(),
            isPayment: false,
          })
        );
      } else {
        state.buy_now_place_an_order = state.buy_now_place_an_order.map(
          (o) => ({
            ...o,
            orderTime: Date.now(),
            isPayment: true,
          })
        );
      }
      state.all_pay_success_order_list.unshift(...state.buy_now_place_an_order);

      window.localStorage.setItem(
        "all_pay_success_order_list",
        JSON.stringify(state.all_pay_success_order_list)
      );
    },
    //取消订单
    DELETEITEM(state, value) {
      state.all_pay_success_order_list.splice(value, 1);
      window.localStorage.setItem(
        "all_pay_success_order_list",
        JSON.stringify(state.all_pay_success_order_list)
      );
    },
    //立即付款
    IMMDEIATEPAYMENT(state, value) {
      // console.log(value);
      // console.log(state.all_pay_success_order_list[value]);
      state.ImmediatePayment = [state.all_pay_success_order_list[value]];

      state.index = value;

      window.localStorage.setItem(
        "ImmediatePayment",
        JSON.stringify(state.ImmediatePayment)
      );
    },

    PAY(state, value) {
      state.all_pay_success_order_list.splice(state.index, 1);

      state.all_pay_success_order_list.unshift({
        ...state.ImmediatePayment[0],
        orderTime: Date.now(),
        isPayment: true,
      });
      window.localStorage.setItem(
        "all_pay_success_order_list",
        JSON.stringify(state.all_pay_success_order_list)
      );
    },
  },

  //用于将state中的数据进行加工(类似于computed计算属性)
  getters: {
    //购物车选中商品的数量
    quantity(state) {
      var count = 0;
      for (var i = 0; i < state.cartCommodityList.length; i++) {
        if (state.cartCommodityList[i].state) {
          count += state.cartCommodityList[i].goods_count;
        }
      }
      return count;
    },

    //购物车订单数量
    order_list_goods_count(state) {
      var order_list_goods_count = 0;
      for (var i = 0; i < state.order_list.length; i++) {
        if (state.order_list[i].state) {
          order_list_goods_count += state.order_list[i].goods_count;
        }
      }
      return order_list_goods_count;
    },

    //购物车选中商品的总金额
    amount(state) {
      var amount = 0;
      for (var i = 0; i < state.cartCommodityList.length; i++) {
        if (state.cartCommodityList[i].state) {
          amount +=
            state.cartCommodityList[i].goods_count *
            state.cartCommodityList[i].price;
        }
      }
      return amount;
    },

    //待支付
    treat_pay(state) {
      let cancelPayment = [];
      cancelPayment = state.all_pay_success_order_list.filter(
        (item) => item.isPayment == false
      );
      return cancelPayment;
    },

    //已支付
    stop_pay(state) {
      let confirmPayment = [];
      confirmPayment = state.all_pay_success_order_list.filter(
        (item) => item.isPayment !== false
      );
      return confirmPayment;
    },
  },

  modules: {},
});
