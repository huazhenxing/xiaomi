<template>
  <!-- 轮播图 -->
  <div class="swipe">
    <van-swipe
      v-if="items"
      ref="swipe"
      :autoplay="4000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(item, index) in items"
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
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  props: ["items"],
  watch: {
    items: function () {
      setTimeout(() => {
        this.$refs.swipe.resize();
      }, 500);
    },
  },
  methods: {
    clickJump(type, routing, path, spm_stat) {
      if (type == "product") {
        //商品详情
        this.$router.push(routing);
      } else if (type == "url" || "activity") {
        //链接
        window.location.href = path;
      } else if (type == "first_channel") {
        //链接拼接
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
</style>