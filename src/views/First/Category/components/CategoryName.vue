<template>
  <!-- 标题 -->
  <div class="category_title" v-if="title">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.category_title {
  margin-top: 15.625rem;
  background: #fff;
  font-size: 14.5833rem;
  text-align: left;
  font-weight: 700;
  height: 32.81rem;
  line-height: 32.81rem;
  overflow: hidden;
  color: #333;
}
</style>