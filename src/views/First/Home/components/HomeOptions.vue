<template>
  <!-- 选项卡 -->
  <div class="items">
    <div
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
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
.items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>