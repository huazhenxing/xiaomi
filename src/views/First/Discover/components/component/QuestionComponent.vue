<template>
  <!-- 问题开始 -->
  <div class="question-list" v-if="data">
    <div class="title">{{ data.question }}</div>
    <div class="author">
      <img :src="data.avatar" alt="" class="icon" />
      <div class="tips">
        <div class="name">{{ data.nickname }}</div>
        <div class="time">提问于{{ data.create_time }}</div>
      </div>
      <div class="follow-btn">关注问题</div>
    </div>
  </div>
  <!-- 问题结束 -->
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss" scoped>
// 问题开始
.question-list {
  background: #fff;
  padding: 13.542rem 16.667rem 16.667rem;
  margin-top: 50px;
  text-align: left;
  .title {
    font-size: 16.6667rem;
    line-height: 25rem;
  }
  .author {
    margin-top: 16.667rem;

    display: flex;
    -webkit-box-flex: 1;
    flex-wrap: nowrap;

    -webkit-box-align: center;
    align-items: center;
    .icon {
      width: 25rem;
      height: 25rem;
      border-radius: 25rem;
      margin-right: 10.417rem;
    }
    .tips {
      .name {
        font-size: 12.5rem;
      }
      .time {
        font-size: 12rem;
        color: rgba(0, 0, 0, 0.3);
        padding-top: 2.604rem;
      }
    }
    .follow-btn {
      width: 66.664rem;
      height: 25rem;
      background: rgba(255, 89, 52, 0.07);
      border-radius: 12.5rem;
      font-size: 12.5rem;
      color: #ff5934;
      line-height: 25rem;
      text-align: center;
      margin: 12.5rem 0 0 auto;
      display: block;
    }
  }
}
// 问题结束
</style>