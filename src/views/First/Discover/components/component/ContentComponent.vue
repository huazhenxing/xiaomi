<template>
  <!-- 内容开始 -->
  <div class="card-content" v-if="data">
    <!-- h5 -->
    <div
      class="discover-article-box"
      v-html="data.article_h5"
      v-if="data.article_h5"
    ></div>

    <div class="article-container" v-else>
      <div class="content">{{ data.content }}</div>
      <div class="images sequence" v-if="data.pic_list.length > 0">
        <div
          class="image radius"
          v-for="(item, index) in data.pic_list"
          :key="index"
        >
          <img :src="item.img" alt="" />
        </div>
      </div>
    </div>
  </div>
  <!-- 内容结束 -->
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss" scoped>
// 内容开始
.card-content {
  margin-bottom: 14.063rem;

  .discover-article-box {
    font-size: 15.2604rem;
    font-weight: 400;
    color: #000;
    & > p {
      margin: 14.583rem 0;
    }
    .ql-align-justify {
      text-align: justify;
      .unit-img {
        display: block;
        width: 100%;
        border-radius: 5rem;
      }
    }
  }

  .article-container {
    .content {
      margin-top: 9.375rem;
      font-size: 15.625rem;
      color: #333;
      line-height: 28.13rem;
      word-wrap: break-word;
    }
    .images {
      margin-top: 10.417rem;
      .image {
        float: left;
        margin-bottom: 1.042rem;

        margin-right: 0.3%;

        width: 33%;
        height: 115.102rem;
        overflow: hidden;
        &.radius {
          border-radius: 5rem;
        }
      }
    }
    .sequence {
      display: block;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
}
// 内容结束
</style>