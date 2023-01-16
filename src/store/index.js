import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //用于存储数据
  state: {
    goods_info: JSON.parse(window.localStorage.getItem("goods_info")) || [], //货物_信息
  },

  //用于响应组件中的动作
  actions: {
    decrement(context, value) {
      if (context.state.goods_info[value].goods_count < 5) {
        context.commit("DECREMENT", value);
      } else {
        return;
      }
    },

    increment(context, value) {
      if (context.state.goods_info[value].goods_count > 1) {
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
      state.goods_info[value].goods_count += 1;
      window.localStorage.setItem(
        "goods_info",
        JSON.stringify(state.goods_info)
      );
    },
    // 减少商品数量
    INCREMENT(state, value) {
      state.goods_info[value].goods_count -= 1;
      window.localStorage.setItem(
        "goods_info",
        JSON.stringify(state.goods_info)
      );
    },
    //是否选择该商品
    IS_SELECT(state, value) {
      state.goods_info[value].state = !state.goods_info[value].state;
      window.localStorage.setItem(
        "goods_info",
        JSON.stringify(state.goods_info)
      );
    },
    //删除该商品
    DELETE(state, value) {
      state.goods_info.splice(value, 1);
      window.localStorage.setItem(
        "goods_info",
        JSON.stringify(state.goods_info)
      );
    },

    //加入购物车
    ADD_TO_CART(state, value) {
      //判断数组里面是否存在该商品，如果存在，则数量增加,否则添加该商品
      let idx = state.goods_info.findIndex(
        (item) => item.goods_id === value.goods_id
      );
      if (idx == -1) {
        state.goods_info.unshift(value);
      } else {
        //加
        value.goods_count += state.goods_info[idx].goods_count;
        //删
        state.goods_info.splice(idx, 1);
        //加
        state.goods_info.unshift(value);
      }

      window.localStorage.setItem(
        "goods_info",
        JSON.stringify(state.goods_info)
      );
    },
  },

  //用于将state中的数据进行加工(类似于computed计算属性)
  getters: {
    //选中商品的数量
    quantity(state) {
      var count = 0;
      for (var i = 0; i < state.goods_info.length; i++) {
        if (state.goods_info[i].state) {
          count += state.goods_info[i].goods_count;
        }
      }
      return count;
    },

    //选中商品的总金额
    amount(state) {
      var amount = 0;
      for (var i = 0; i < state.goods_info.length; i++) {
        if (state.goods_info[i].state) {
          amount += state.goods_info[i].goods_count * state.goods_info[i].price;
        }
      }
      return amount;
    },
  },

  modules: {},
});
