<template>
  <!-- 标签开始 -->
  <div class="moment-tags" v-if="data">
    <div class="tags-item" v-for="item in data.tag_list" :key="item.id">
      <img
        :src="
          item.img
            ? item.img
            : 'https://m.mi.com/static/img/huati.d947499711.png'
        "
        alt=""
        class="icon"
      />
      <span>{{ item.tag }}</span>
    </div>
  </div>
  <!-- 标签结束 -->
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss" scoped>
// 标签开始
.moment-tags {
  max-height: 31.25rem;
  overflow: hidden;
  .tags-item {
    float: left;
    display: flex;
    align-items: center;
    padding: 4.688rem;
    margin-right: 7.292rem;
    margin-bottom: 9.375rem;
    line-height: 12.5rem;
    background: #f6f6f6;
    border-radius: 2rem;
    font-size: 12.5rem;
    font-weight: 500;
    color: #757575;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .icon {
      float: left;
      margin-right: 3.646rem;
      width: 12.5rem;
      height: 12.5rem;
    }
  }
}
// 标签结束
</style>