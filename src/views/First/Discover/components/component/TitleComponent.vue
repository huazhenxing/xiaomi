<template>
  <!-- 标题开始 -->
  <div class="title" v-if="data">{{ data.title }}</div>
  <!-- 标题结束 -->
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss" scoped>
// 标题开始
.title {
  display: block;
  padding-top: 15.625rem;
  color: #333;
  font-size: 20.8333rem;
  text-align: left;
  font-weight: 600;
  line-height: 33.336rem;
}
// 标题结束
</style>