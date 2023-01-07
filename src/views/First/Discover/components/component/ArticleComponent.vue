<template>
  <!-- 赞美开始 -->
  <div class="article-info" v-if="entity_circle">
    <div class="read-num"></div>
    <div class="praise">
      <img
        src="https://m.mi.com/static/img/pre-praise.db3cd290e8.png"
        alt=""
        class="praise-icon"
      />
      <span class="praise-num">{{ entity_circle.praise_num }}</span>
    </div>
  </div>
  <!-- 赞美结束 -->
</template>

<script>
export default {
  props: ["entity_circle"],
};
</script>

<style lang="scss" scoped>
// 赞美开始
.article-info {
  width: 100%;
  height: 16.664rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 20.833rem;
  line-height: 16.664rem;
  font-size: 12.5rem;
  color: rgba(0, 0, 0, 0.54);
  .praise {
    display: flex;
    align-content: center;
    .praise-icon {
      height: 12.5rem;
      width: 12.5rem;
      vertical-align: baseline;
      margin-right: 4.167rem;
    }
    .praise-num {
      line-height: 15rem;
      font-size: 12.5rem;
      color: rgba(0, 0, 0, 0.54);
    }
  }
}
// 赞美结束
</style>