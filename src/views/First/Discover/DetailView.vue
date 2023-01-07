<template>
  <div class="app-shell">
    <!-- 内容详情 1 -->
    <template v-if="content_type == 1">
      <HeaderComponent :type="content_type" />
      <!-- 视图容器 -->
      <div class="app-view-wrapper">
        <div class="app-view-with-header">
          <!-- 设备 -->
          <DeviceComponent :entity_circle="entity_circle" />
          <!-- 主要内容 -->
          <div class="main-content">
            <div class="article">
              <div class="card">
                <!-- 用户 -->
                <UserComponent :user="data" />
                <!-- 内容 -->
                <ContentComponent :data="data" />
                <!-- 标签 -->
                <TagsComponent :data="data" />
              </div>
            </div>
            <!-- 评论 -->
            <CommentsComponent :comment_list="comment_list" :total="total" />
          </div>
        </div>
      </div>
    </template>

    <!-- 文章详情 2/3 -->
    <template v-if="content_type == 2 || content_type == 3">
      <HeaderComponent :type="content_type" />
      <!-- 视图容器 -->
      <div class="app-view-wrapper">
        <div class="app-view-with-header">
          <!-- 主要内容 -->
          <div class="main-content">
            <div class="article">
              <!-- 标题 -->
              <TitleComponent :data="data" />
              <div class="card">
                <!-- 用户 -->
                <UserComponent :user="data" />
                <!-- 内容 -->
                <ContentComponent :data="data" />
                <!-- 标签 -->
                <TagsComponent :data="data" />
              </div>
            </div>
            <!-- 评论 -->
            <CommentsComponent :comment_list="comment_list" :total="total" />
          </div>
        </div>
      </div>
    </template>

    <!-- 投票详情 5 -->
    <template v-if="content_type == 5">
      <HeaderComponent :type="content_type" />
      <!-- 视图容器 -->
      <div class="app-view-wrapper" v-if="data">
        <div class="app-view-with-header">
          <!-- 顶部 -->
          <div class="top-block">
            <img :src="data.cover_img" alt="" />
          </div>
          <!-- 投票 -->
          <div class="vote-block">
            <div class="vote-wrap">
              <div class="vote-inner">
                <div class="vote-title">
                  {{ data.title }}
                </div>
                <div class="vote-desc">
                  {{ data.description }}
                </div>
                <div class="vote-body">
                  <div class="vote-status">
                    <div class="left-status">
                      <div class="vote-progress">进行中</div>
                      <div class="vote-partice">
                        {{ data.vote_user_num }}人参与
                      </div>
                    </div>
                  </div>

                  <ul class="selecte-container">
                    <li
                      class="selecte-item"
                      v-for="(item, index) in data.vote_option_list"
                      :key="index"
                    >
                      {{ item.description }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 评论 -->
          <CommentsComponent
            :data="data"
            :comment_list="comment_list"
            class="main-content"
          />
          <!-- 底部 -->
          <!-- <div class="bottom-action">
            <div class="bottom-action-left">
              <div class="bottom-action-btn">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAC4lBMVEUAAAAAAAD///+AgICqqqqAgIC/v7+ZmZmAgICqqqqSkpK2trafn5+Ojo6qqqqZmZmioqKVlZWdnZ2SkpKZmZmPj4+cnJyZmZmXl5ebm5ufn5+ZmZmdnZ2Xl5eZmZmXl5ebm5uenp6ZmZmYmJiWlpadnZ2Tk5Obm5uYmJicnJyZmZmYmJidnZ2Xl5eZmZmdnZ2VlZWampqcnJyZmZmYmJidnZ2ampqZmZmdnZ2bm5udnZ2bm5uYmJiZmZmampqYmJiampqYmJiZmZmcnJyampqYmJiampqbm5uZmZmXl5eYmJiampqZmZmcnJyampqZmZmampqampqbm5uampqYmJiampqcnJyampqZmZmbm5uZmZmYmJiXl5eZmZmbm5uampqZmZmampqYmJiampqXl5eZmZmYmJiampqWlpaZmZmXl5eZmZmcnJyYmJiampqYmJiampqbm5uampqXl5eZmZmZmZmbm5uampqbm5uampqXl5eampqampqZmZmYmJiYmJiampqZmZmZmZmYmJiampqZmZmZmZmYmJiXl5eZmZmYmJiampqampqampqbm5uampqZmZmYmJiZmZmZmZmYmJiampqXl5eZmZmZmZmXl5eYmJiampqampqZmZmampqZmZmampqampqampqZmZmampqZmZmZmZmYmJiZmZmZmZmampqZmZmZmZmZmZmZmZmXl5eZmZmZmZmampqYmJiampqXl5aYmJiampqXl5eZmZmYmJiXl5eZmZmampqXl5eZmZmYmJiampqYmJiZmZmXl5eZmZmZmJiXl5eYmJiZmZmampqXl5eZmZmYmJibmpqZmZmZmZmZmZmZmZmWlpaampqZmZmXl5eZmZmYmJiYmZmZmZmampqZmZmXl5eYmJiZmZmampqXl5eZmZmXl5eZmZmXl5eZmZmXl5eZmZmXl5eYmJiZmZmampqWl5eXl5aXl5eYmJiYmJmYmZiYmZmZmJmZmZkNHdk+AAAA7XRSTlMAAQECAwQEBQYGBwcICQkKCwwNDg8QEhQWFxgZGhseICEiIyUnJygpKiwtLy8xMjQ1NTY3OTk6PDxAQUJFRkdISUpLS0xNTk9QUVJTVVVWWltdXmBhYmRlZmZnaGlpaWpub3Jyc3N0dHV1dnZ2d3d5eXp8fYCCgoOEiImJi4yQlZWWmZqcnZ6foKChoaapqquvsLG2uLi7u76/v7/AwcLDxMfKy8/Q0tTV1tbX2Nrb3Nzd3t/g4eHh4uLj5OTl5+fo6Onp6urr7O3t7e7u7+/w8fLz9PT19vb39/f3+Pn5+fn6+vv7/Pz9/f7+/v5H/ubaAAACk0lEQVQYGe3BZVRTARgG4Hf3bkznFAMDFLtbsRMR7O5W7O7u7u7EVuzu7u6JHeBwCOon4vtfUO+OwvEOf3mOx+fBf/8CpWi/PgUU/BG1zonQ0LMV8SfMNS9LrJBqZiSapc0tkavH5cPhWiYkkqX7DZGLpWqdlsijpZE4ybs4JPKQL9QWt0Su+KhIBPchDpGQJibA1OqKyJ4KRrhk7XX/k8ibsakAGBvfkHdbC8AVt/bPGOUQcfQ0AnDr/EBkAVzw6P+c3DnuvEh4VysA6ySRECN0eYx4Su4oYa0fLhI+2ALkXiFyXoWuYRHkjmwA/Bwioa1V75UiMgh60o+KIDeUMgAwtb4q8rjpUpEX0zNAh9fE95+5vrCCOCkDIz/KGxGZkAk6rJPtjA7ywg9ubd5JrJFW6PCcQXJ5HjjlOiDycmZa6Mg+h+SivNAo5YL5SWZkho70C+3kvHRwKrONtA9MCx2eS8iI+d7QKAV3kvcHmPF7hvzLyKjZWaAxVtlHvh6QBjpyrHrLiPHpoFED9kbzaTN3/J7BcxNpn+wBjVLy5Bfeawkdqs8mMmxiBmjM1U+RdwJTQIfPxig+H+oBjanBSfJuQyt0eB0hw4Zb4FT5JnmvBnQtJh+NSA2Npe518kxTM3StZswsd2iStb1GXqqXFPrWRLMvnBrdJi+UVeFCENkbP1gb2MiDtVW4EsToXvguVZcn5LHqJri0luyBb0yd7pL7i6lwbR05zPubdmHkrvIGGJMmkETBL9aR54KDg7dt324nd1dSkbHb6DHxjWqu4mdzY+i0JZ8CdHjNhGxF8LOcZ2wP49hsts2FEKvjW8YTQ74qjl9k9Q3w969a1c/PNw/iZBw6dVp8UwLhipKAAf/9LV8BF0VtW4T+J7kAAAAASUVORK5CYII="
                  alt=""
                  class="i-pen"
                />
                来说点什么...
              </div>
            </div>
            <div class="bottom-action-right">
              <div class="bottom-action-ctrl">
                <div class="action-icon">
                  <img
                    src="https://m.mi.com/static/img/m_b_share.ac01313399.png"
                    alt=""
                    class="icon"
                  />
                </div>
                <div class="action-icon">
                  <img
                    src="https://m.mi.com/static/img/m_b_msg.1f9f89973f.png"
                    alt=""
                    class="icon"
                  />
                  <span>1138</span>
                </div>
                <div class="action-icon">
                  <img
                    src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                    alt=""
                    class="icon"
                  />
                  <span>92043</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </template>

    <!-- 问题详情 6 -->
    <template v-if="content_type == 6">
      <HeaderComponent :type="content_type" />
      <!-- 视图容器-->
      <div class="app-view-wrapper">
        <div class="app-view-with-header" style="background: #f5f5f5">
          <!-- 产品 -->
          <ProductComponent :data="data" />
          <!-- 问题 -->
          <QuestionComponent :data="data" />
          <!-- 评论(问题+回答) -->
          <AnswerComponent :data="data" :answer_list="answer_list" />
        </div>
      </div>
    </template>

    <!-- 视频详情 99 -->
    <template v-if="content_type == 99">
      <!-- 视频详情开始 -->
      <div class="app-shell" v-if="moment_list">
        <!-- 视图容器开始 -->
        <div class="app-view-wrapper">
          <div class="article-container">
            <!-- 主要内容 -->
            <div class="main-content">
              <!-- 视频用户 -->
              <div class="log-block">
                <div class="share-user-info-wrap">
                  <div class="shear-content-user-info">
                    <div class="share-user-icon">
                      <img
                        class="user-icon"
                        :src="moment_list.author_img"
                        alt=""
                      />
                    </div>
                    <div class="right">
                      <span class="share-user-name">{{
                        moment_list.author_nickname
                      }}</span>
                      <div class="time-info">{{ moment_list.create_time }}</div>
                    </div>
                  </div>
                  <div class="follow-author">
                    <div class="focus-button-container">
                      <div class="go-to-focuse">+ 关注</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 内容 -->
              <div class="content-content">
                {{ moment_list.moment_title }}
              </div>
              <!-- 视频 -->
              <div class="mi-video-player user-upload-video">
                <div class="mi-video-wrapper">
                  <div class="mi-overlayer-play vertical-flex">
                    <button class="mi-video-play-btn">
                      <img
                        src="https://m.mi.com/static/img/play.5f8eee7206.png"
                        alt=""
                        class="mi-icon mi-icon-play-lg"
                      />
                    </button>
                  </div>
                  <div class="mi-video-box">
                    <video
                      :src="moment_list.clip_advanced_url"
                      autoplay
                      loop
                    ></video>
                  </div>
                </div>
              </div>

              <!-- 赞美 -->
              <div class="article-info">
                <div class="read-num"></div>
                <div class="praise">
                  <img
                    src="https://m.mi.com/static/img/pre-praise.db3cd290e8.png"
                    alt=""
                    class="praise-icon"
                  />
                  <span class="praise-num">{{ moment_list.praise_num }}</span>
                </div>
              </div>

              <!-- 评论 -->
              <div class="comments-container">
                <div class="comments-title">评论</div>
                <div
                  class="comment-block"
                  v-for="item in comment_list"
                  :key="item.id"
                >
                  <div class="user-icon">
                    <img class="user-icon" :src="item.img" alt="" />
                  </div>
                  <div class="comment-info">
                    <div class="user-info">
                      <div>
                        <div class="nickname">{{ item.nickname }}</div>
                        <div class="date">{{ item.create_time }}</div>
                      </div>
                    </div>
                    <div class="comment-text">{{ item.comment }}</div>
                    <div class="praise">
                      <img
                        class="praise-icon"
                        src="https://m.mi.com/static/img/pre-praise.db3cd290e8.png"
                        alt=""
                      />
                      <span class="praise-num" v-if="item.praise_num > 0">{{
                        item.praise_num
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 底部区域 -->
              <!-- <div class="bottom-area">
                <div class="bottom-area-content">
                  <div class="write-comment-enter">
                    <img
                      src="https://m.mi.com/static/img/write.325305c208.png"
                      alt=""
                      class="write-comment-icon"
                    />
                    <div class="write-comment-text">写评论</div>
                  </div>

                  <div class="shop-button">
                    ￥1
                    <span> 立即购买</span>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 买家秀详情 100 -->
    <template v-if="content_type == 100">
      <HeaderComponent :type="this.content_type" />
      <!-- 视图容器 -->
      <div class="app-view-wrapper">
        <div class="app-view-with-header">
          <!-- 设备 -->
          <DeviceComponent :entity_circle="entity_circle" />
          <!-- 主要内容 -->
          <div class="main-content">
            <div class="article">
              <div class="card">
                <!-- 用户 -->
                <UserComponent :user="data" />
                <!-- 内容 -->
                <ContentComponent :data="data" />
                <!-- 标签 -->
                <TagsComponent :data="data" />
              </div>
            </div>
            <!-- 评论 -->
            <CommentsComponent :comment_list="comment_list" :data="data" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import HeaderComponent from "@/views/First/Discover/components/component/HeaderComponent.vue"; //头部
import DeviceComponent from "@/views/First/Discover/components/component/DeviceComponent.vue"; //设备
import ProductComponent from "@/views/First/Discover/components/component/ProductComponent.vue"; //产品
import UserComponent from "@/views/First/Discover/components/component/UserComponent.vue"; //用户
import ContentComponent from "@/views/First/Discover/components/component/ContentComponent.vue"; //内容
import TagsComponent from "@/views/First/Discover/components/component/TagsComponent.vue"; //标签
import CommentsComponent from "@/views/First/Discover/components/component/CommentsComponent.vue"; //评论
import TitleComponent from "@/views/First/Discover/components/component/TitleComponent.vue"; //标题
import QuestionComponent from "@/views/First/Discover/components/component/QuestionComponent.vue"; //问题
import AnswerComponent from "@/views/First/Discover/components/component/AnswerComponent.vue"; //回答
import ArticleComponent from "@/views/First/Discover/components/component/ArticleComponent.vue"; //赞美

export default {
  components: {
    HeaderComponent,
    DeviceComponent,
    ProductComponent,
    UserComponent,
    ContentComponent,
    TagsComponent,
    CommentsComponent,
    TitleComponent,
    QuestionComponent,
    AnswerComponent,
    ArticleComponent,
  },
  name: "DetailView",

  data() {
    return {
      content_type: null, //类型

      data: null, //详情数据
      total: null, //评论总数数据
      comment_list: null, //评论数据
      entity_circle: null, //设备数据
      answer_list: null, //回复评论数据
      moment_list: null, //视频详情数据
    };
  },

  mounted() {
    // 路由参数
    this.content_type = this.$route.params.content_type;
    console.log(this.content_type);
    console.log(this.$route.params.id);
    console.log(this.$route.query.vote_id);

    // 发送请求
    if (this.content_type == 2 || this.content_type == 3) {
      // 文章详情（2/3）
      this.axios({
        method: "get",
        url: "communicate/article_detail",
        params: {
          id: this.$route.params.id,
        },
      }).then((res) => {
        console.log("文章详情（2/3）==>", res);
        this.data = res.data.data;
      });
      // 文章详情（2/3）评论列表
      this.axios({
        method: "get",
        url: "communicate/comment_display_list",
        params: {
          content_id: this.$route.params.id,
          is_feature: false,
          size: 10,
          page: 1,
          is_summary: false,
        },
      }).then((res) => {
        console.log("文章详情（2/3）评论列表==>", res);
        this.comment_list = res.data.data.comment_list;
        this.total = res.data.data;
      });
    } else if (this.content_type == 1) {
      // 内容详情（1）
      this.axios({
        method: "get",
        url: "communicate/content_detail",
        params: {
          content_id: this.$route.params.id,
        },
      }).then((res) => {
        console.log("内容详情（1）==>", res);
        this.data = res.data.data;
        this.entity_circle = res.data.data.entity_circle;
      });
      // 内容详情（1）评论列表
      this.axios({
        method: "get",
        url: "communicate/comment_display_list",
        params: {
          content_id: this.$route.params.id,
          is_feature: false,
          size: 10,
          page: 1,
          is_summary: false,
        },
      }).then((res) => {
        console.log("内容详情（1）评论列表==>", res);
        this.total = res.data.data;
        this.comment_list = res.data.data.comment_list;
      });
    } else if (this.content_type == 5) {
      // 投票详情（5）
      this.axios({
        method: "get",
        url: "communicate/vote_detail",
        params: {
          vote_id: this.$route.query.vote_id,
        },
      }).then((res) => {
        console.log("投票详情（5）==>", res);
        this.data = res.data.data;
      });
      // 投票详情（5）评论列表
      this.axios({
        method: "get",
        url: "communicate/comment_display_list",
        params: {
          content_id: this.$route.params.id,
          is_feature: false,
          size: 5,
          page: 1,
          is_summary: true,
          is_vote: true,
        },
      }).then((res) => {
        console.log("投票详情（5）评论列表==>", res);
        this.comment_list = res.data.data.comment_list;
      });
    } else if (this.content_type == 6) {
      // 问题详情（6）
      this.axios({
        method: "get",
        url: "communicate/question_detail",
        params: {
          q_id: this.$route.query.announce_id,
          product_id: this.$route.params.id,
        },
      }).then((res) => {
        console.log("问题详情（6）==>", res);
        this.data = res.data.data;
      });

      // 问题详情（6）评论列表
      this.axios({
        method: "get",
        url: "communicate/question_answer_list",
        params: {
          q_id: this.$route.query.val,
          top_answer_id: "",
          size: 10,
          page: 1,
          need_secondary: true,
          is_hot: false,
        },
      }).then((res) => {
        console.log("问题详情（6）评论列表==>", res);
      });

      // 问题详情（6）评论回复列表
      this.axios({
        method: "get",
        url: "communicate/question_answer_list",
        params: {
          q_id: this.$route.query.val,
          top_answer_id: "",
          size: 10,
          page: 1,
          need_secondary: true,
          is_hot: true,
        },
      }).then((res) => {
        console.log("问题详情（6）评论回复列表==>", res);
        this.answer_list = res.data.data.answer_list;
      });
    } else if (this.content_type == 99) {
      // 视频测评详情（99）
      this.axios({
        method: "get",
        url: "moment/get_moment_by_idlist",
        params: {
          moment_id_list: this.$route.params.id,
        },
      }).then((res) => {
        console.log("视频测评详情（99）==>", res);
        this.moment_list = res.data.data.moment_list
          ? res.data.data.moment_list[0]
          : [];
      });
      // 视频测评详情（99）评论列表
      this.axios({
        method: "get",
        url: "communicate/mizone_comment_list",
        params: {
          comment_type: "moment",
          moment_id: this.$route.params.id,
          page_size: 10,
          page_index: 1,
        },
      }).then((res) => {
        console.log("视频测评详情（99）评论列表==>", res);
        this.comment_list = res.data.data.comment_list;
      });
    } else if (this.content_type == 100) {
      // 买家秀详情（100）
      this.axios({
        method: "get",
        url: "communicate/mizone_product_comment_detail",
        params: {
          comment_id: this.$route.params.id,
        },
      }).then((res) => {
        console.log("买家秀详情（100）==>", res);
        this.data = res.data.data;
        this.entity_circle = res.data.data.entity_circle;
      });
      // 买家秀详情（100）评论列表
      this.axios({
        method: "get",
        url: "communicate/mizone_comment_list",
        params: {
          comment_type: "product_comment",
          product_comment_id: this.$route.params.id,
          page_size: 10,
          page_index: 1,
        },
      }).then((res) => {
        console.log("买家秀详情（100）评论列表==>", res);
        this.comment_list = res.data.data.comment_list;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
// 视图容器开始
.app-view-wrapper {
  .app-view-with-header {
    padding-top: 50px;
    background: #fff;
    color: #3c3c3c;
    margin: auto;
    box-sizing: border-box;
    margin-bottom: 50rem;
  }
}
// 视图容器结束

// 主要内容开始
.main-content {
  margin: 0 12.5rem;
  overflow: hidden;
  .article {
    text-align: left;
    .card {
      margin-bottom: 20.833rem;
      margin-left: 0;
      margin-right: 0;
      padding-bottom: 5.208rem;
      border-bottom: 1px solid #f5f5f5;
      padding-top: 15.625rem;
      text-align: left;
    }
  }
}
// 主要内容结束

// 内容开始
.content-content {
  margin: 14.583rem 0 0;
  font-size: 14.583rem;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  text-align: justify;
  word-break: break-all;
  color: #000;
  width: 100%;
  line-height: 29.166rem;
}
// 内容结束

// 顶部开始
.top-block {
  margin-bottom: -52.083rem;
  img {
    width: 100%;
  }
}
// 顶部结束

// 投票开始
.vote-block {
  margin-bottom: 24.635rem;
  .vote-wrap {
    position: relative;
    width: 350rem;
    background: #fff;
    border-radius: 5rem;
    margin: auto;
    text-align: left;
    white-space: normal;
    word-break: break-all;
    .vote-inner {
      text-align: left;
      padding: 24.323rem 16.667rem;
      .vote-title {
        font-size: 16.6667rem;
        font-family: MI-LANTING--GBK1-Bold, MI-LANTING--GBK1;
        font-weight: 700;
        color: #000;
        line-height: 22.547rem;
        margin-bottom: 6.25rem;
      }
      .vote-desc {
        font-size: 14.5833rem;
        font-family: MI-LANTING_GB-OUTSIDE-YS, MI-LANTING_GB-OUTSIDE;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        line-height: 21.242rem;
        margin-bottom: 12.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .vote-body {
        .vote-status {
          margin-bottom: 15.625rem;

          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          height: 13.906rem;
          line-height: 13.906rem;
          .left-status {
            display: flex;
            justify-content: left;
            align-items: center;
            flex-wrap: nowrap;
            height: 13.906rem;
            line-height: 13.906rem;
            .vote-progress {
              background: #ff754b;
              border-radius: 2rem;
              padding: 0 4.167rem;
              font-size: 12rem;
              font-family: MI-LANTING_GB-OUTSIDE-YS, MI-LANTING_GB-OUTSIDE;
              font-weight: 400;
              color: #fff;
              margin-right: 6.25rem;
            }
            .vote-partice {
              font-size: 12rem;
              font-family: MI-LANTING_GB-OUTSIDE-YS, MI-LANTING_GB-OUTSIDE;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.5);
            }
          }
        }

        .selecte-container {
          .selecte-item {
            margin-bottom: 12.5rem !important;
            box-sizing: border-box;
            width: 300.737rem;
            border-radius: 15.285rem;
            line-height: 30.57rem;
            border: 0.672rem solid rgba(0, 0, 0, 0.2);
            margin: auto;
            text-align: center;
            padding: 0 7.292rem;
            font-size: 12.5rem;
            font-family: MI-LANTING_GB-OUTSIDE-YS, MI-LANTING_GB-OUTSIDE;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
}
// 投票结束

// 评论开始
.comments {
  margin-bottom: 10.417rem;
  text-align: left;
  .comments-num {
    margin-bottom: 14.583rem;
    color: #333;
    font-size: 12.5rem;
  }
  .comments-user {
    margin-bottom: 20.833rem;
    display: flex;
    .comments-user-avatar {
      margin-right: 12.5rem;
      width: 27.078rem;
      height: 27.078rem;
      border-radius: 50%;
      overflow: hidden;
    }
    .comments-user-input {
      flex: 1;
      padding: 0 12.5rem;
      height: 27.078rem;
      line-height: 27.078rem;
      background: #f6f6f6;
      border-radius: 13.5rem;
      font-size: 12.5rem;
      color: #999;
    }
  }
  .comments-list {
    .comment {
      display: flex;
      align-items: flex-start;
      text-align: left;
      padding-bottom: 10.417rem;
      .comment-avatar {
        margin-right: 12.5rem;
        width: 27.078rem;
        height: 27.078rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .comment-content {
        padding-bottom: 7.292rem;
        border-bottom: 1px solid #f5f5f5;

        flex: 1;
        .comment-info {
          display: flex;
          align-items: flex-start;
          .comment-info-l {
            flex: 1;
            .comment-user {
              font-size: 12.5rem;
              color: #999;
              .time {
                margin-left: 5.208rem;
              }
            }
            .comment-text {
              margin-top: 3.125rem;
              font-size: 13.5417rem;
              color: #333;
              line-height: 21.656rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          .comment-praise {
            display: flex;
            align-items: flex-end;
            color: #999;
            font-size: 12rem;
            font-weight: 500;
            position: relative;
            .num {
              margin-right: 2.083rem;
              position: relative;
              top: -10%;
            }
            .i-praise {
              display: inline-block;
              width: 15.102rem;
              height: 15.102rem;
            }
          }
        }
        .comment-discuss {
          margin-top: 2.604rem;
          margin-bottom: 3.125rem;
          padding: 10.417rem;
          background: #fafafa;
          border-radius: 5rem;
          //   line-height: 94.558rem;
          font-size: 13.5417rem;
          .comment-discuss-item {
            margin-bottom: 6.25rem;
            width: 281.25rem;
            .name {
              color: #999;
            }
            .text {
              color: #333;
            }
          }
          .comment-discuss-more {
            display: flex;
            align-items: center;
            color: #999;
            &::after {
              margin-right: 3.125rem;
              content: "";
              display: inline-block;
              width: 12.5rem;
              height: 12.5rem;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAACSVBMVEUAAAAAAAD///+AgIBVVVWqqqpAQECAgIBmZmZVVVWAgIBtbW2SkpJgYGBxcXFmZmZdXV10dHRqampiYmJtbW1mZmZ3d3dpaWljY2NxcXFra2tmZmZhYWFtbW1oaGhvb29qampmZmZsbGxoaGhkZGRtbW1qampjY2NkZGRsbGxmZmZqampnZ2dra2tpaWlqampnZ2dlZWVmZmZkZGRnZ2dmZmZpaWlnZ2dqampmZmZpaWlnZ2dqamppaWloaGhmZmZqampnZ2dmZmZnZ2dqampmZmZlZWVoaGhnZ2dnZ2dmZmZqamplZWVnZ2dnZ2dqamplZWVmZmZpaWlnZ2doaGhoaGhmZmZpaWloaGhoaGhnZ2doaGhoaGhmZmZmZmZmZmZoaGhnZ2dnZ2dmZmZmZmZoaGhmZmZoaGhoaGhmZmZoaGhmZmZoaGhnZ2dmZmZmZmZoaGhnZ2dnZ2dmZmZmZmZnZ2dnZ2dmZmZmZmZnZ2dnZ2dnZ2dnZ2dnZ2dmZmZnZ2dmZmZlZWVnZ2dlZWVmZmZnZ2dmZmZnZ2dnZ2dmZmZnZ2dnZ2dmZmZnZ2dmZmZnZ2dnZ2dmZmZmZmZnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZmZmZnZ2dnZ2dmZmZnZ2dnZ2dmZmZmZmZnZ2dmZmZmZmZmZmZmZmZmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlZWVmZmZmZmZmZmZnZ2dmZmZmZmZlZWVmZmZmZmYtetiGAAAAwnRSTlMAAQECAwMEBAUGBgcHCAkKCwsMDQ4PDxESEhMUFRUWFxgZGhscHB0fISEjJCUmJykqKy0uLzIzNDU3ODk6PUBBQUVGSEhLTExNT1BSU1RXV1haWl5gYmRkZWdoaWxucHFxcnR1dnZ4eHt9fYCAgYKEhIaIjI6PkpOUlZeZnJ+goaKmqautrrGztLa3uLm6u7y/wcPExcfKzM3Oz9LT09XW2Nrb3N3e3+Dk5efo6uvs7e7v8PLz9Pb3+Pn5+vv7/P3+/nALAZAAAAISSURBVBgZ7cH5X8txHAfw9+f7ndmhRsYymtDmpi1ErFy5c4fkKvctyhGRc+7IUYam5liMUVu+tvqu7+svs0c8PHoou/rR9/kkmUwmkyWGcYz+hWcUB+1IDUf9U6VrKSamsW1aOp36ZZxbah/DUwzKsTtcjpIhPPXBFHmnfOftqRxFpRq3/1H7J0exhfrQz6p0BZsv5Y2iqDIW3vkKeBzrJ9Jf9PNOOEWITQdtFJW1zBUGIFxfq2TUG5+9z9cJSJ/rllNU+pzKlwDCnqsrM6mXoZOON/zoBnz3VlsoutTFZ993AHhXuyyT/kjN2f1UALr8d3eaVBQDV1DrkQAI1Ys4+o2ZS1oFAIHmLQaeYjLl17gBhN0X7UbqoTWVP+4IA/4n22aqGcXEdEWXPwoAXFX56RShnra5zi8hLNQfsqRQXJSFD7wApO8VuRRh2NDiBxD07jHzFB8ua8WNVgDi6zO2EYOHb7/d3gkIjeWzdYzixOuLb34LAaLz8HzrqltfAEl8cXpGGsWPG7ausQ1AqO3o3uc+AGLgWLaCEjFoysb7PqA79MrpCwJiU4VdzyghKuOuhwERv0hvLswxUKL4jK1vA+ghdVUtUDFKmMZaWu9HhOSuXjKaURJSJhx5FgwDH64UmCgpTDG5zCsANYVqjpKkyz3Q0HJtzXhGSUubevJckZkGgCmzzFqeBkSrJZlMJvu//QQhFMDXuz9zFAAAAABJRU5ErkJggg==)
                50% no-repeat;
              background-size: 100% 100%;
              text-decoration: inherit;
              vertical-align: inherit;
              box-sizing: inherit;
            }
          }
        }
      }
    }
  }
  .comments-more {
    margin: 15.625rem 0;
    color: #999;
    font-size: 12.5rem;
    text-align: center;
    &::after {
      margin-right: 3.125rem;
      content: "";
      display: inline-block;
      width: 12.5rem;
      height: 12.5rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAACSVBMVEUAAAAAAAD///+AgIBVVVWqqqpAQECAgIBmZmZVVVWAgIBtbW2SkpJgYGBxcXFmZmZdXV10dHRqampiYmJtbW1mZmZ3d3dpaWljY2NxcXFra2tmZmZhYWFtbW1oaGhvb29qampmZmZsbGxoaGhkZGRtbW1qampjY2NkZGRsbGxmZmZqampnZ2dra2tpaWlqampnZ2dlZWVmZmZkZGRnZ2dmZmZpaWlnZ2dqampmZmZpaWlnZ2dqamppaWloaGhmZmZqampnZ2dmZmZnZ2dqampmZmZlZWVoaGhnZ2dnZ2dmZmZqamplZWVnZ2dnZ2dqamplZWVmZmZpaWlnZ2doaGhoaGhmZmZpaWloaGhoaGhnZ2doaGhoaGhmZmZmZmZmZmZoaGhnZ2dnZ2dmZmZmZmZoaGhmZmZoaGhoaGhmZmZoaGhmZmZoaGhnZ2dmZmZmZmZoaGhnZ2dnZ2dmZmZmZmZnZ2dnZ2dmZmZmZmZnZ2dnZ2dnZ2dnZ2dnZ2dmZmZnZ2dmZmZlZWVnZ2dlZWVmZmZnZ2dmZmZnZ2dnZ2dmZmZnZ2dnZ2dmZmZnZ2dmZmZnZ2dnZ2dmZmZmZmZnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZmZmZnZ2dnZ2dmZmZnZ2dnZ2dmZmZmZmZnZ2dmZmZmZmZmZmZmZmZmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlZWVmZmZmZmZmZmZnZ2dmZmZmZmZlZWVmZmZmZmYtetiGAAAAwnRSTlMAAQECAwMEBAUGBgcHCAkKCwsMDQ4PDxESEhMUFRUWFxgZGhscHB0fISEjJCUmJykqKy0uLzIzNDU3ODk6PUBBQUVGSEhLTExNT1BSU1RXV1haWl5gYmRkZWdoaWxucHFxcnR1dnZ4eHt9fYCAgYKEhIaIjI6PkpOUlZeZnJ+goaKmqautrrGztLa3uLm6u7y/wcPExcfKzM3Oz9LT09XW2Nrb3N3e3+Dk5efo6uvs7e7v8PLz9Pb3+Pn5+vv7/P3+/nALAZAAAAISSURBVBgZ7cH5X8txHAfw9+f7ndmhRsYymtDmpi1ErFy5c4fkKvctyhGRc+7IUYam5liMUVu+tvqu7+svs0c8PHoou/rR9/kkmUwmkyWGcYz+hWcUB+1IDUf9U6VrKSamsW1aOp36ZZxbah/DUwzKsTtcjpIhPPXBFHmnfOftqRxFpRq3/1H7J0exhfrQz6p0BZsv5Y2iqDIW3vkKeBzrJ9Jf9PNOOEWITQdtFJW1zBUGIFxfq2TUG5+9z9cJSJ/rllNU+pzKlwDCnqsrM6mXoZOON/zoBnz3VlsoutTFZ993AHhXuyyT/kjN2f1UALr8d3eaVBQDV1DrkQAI1Ys4+o2ZS1oFAIHmLQaeYjLl17gBhN0X7UbqoTWVP+4IA/4n22aqGcXEdEWXPwoAXFX56RShnra5zi8hLNQfsqRQXJSFD7wApO8VuRRh2NDiBxD07jHzFB8ua8WNVgDi6zO2EYOHb7/d3gkIjeWzdYzixOuLb34LAaLz8HzrqltfAEl8cXpGGsWPG7ausQ1AqO3o3uc+AGLgWLaCEjFoysb7PqA79MrpCwJiU4VdzyghKuOuhwERv0hvLswxUKL4jK1vA+ghdVUtUDFKmMZaWu9HhOSuXjKaURJSJhx5FgwDH64UmCgpTDG5zCsANYVqjpKkyz3Q0HJtzXhGSUubevJckZkGgCmzzFqeBkSrJZlMJvu//QQhFMDXuz9zFAAAAABJRU5ErkJggg==)
        50% no-repeat;
      background-size: 100% 100%;
      transform: translateY(20%);
      text-decoration: inherit;
      vertical-align: inherit;
      box-sizing: inherit;
    }
  }
}
.comments-block {
  padding: 12.5rem;
  background-color: #fff;
}
// 评论结束

// 视频详情开始
.app-shell {
  // 视图容器开始
  .app-view-wrapper {
    .article-container {
      background: #fff;
      color: #3c3c3c;
      margin: auto;
      box-sizing: border-box;
      margin-bottom: 50rem;
      // 主要内容开始
      .main-content {
        margin: 0 12.5rem;
        overflow: hidden;
        // 用户开始
        .log-block {
          .share-user-info-wrap {
            margin: auto;
            text-align: left;
            margin-top: 16.667rem;
            white-space: nowrap;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .shear-content-user-info {
              display: flex;
              justify-content: flex-start;
              overflow: hidden;
              text-overflow: ellipsis;
              .share-user-icon {
                margin-right: 9.375rem;
                vertical-align: middle;
                border-radius: 38.172rem;
                width: 38.172rem;
                height: 38.172rem;

                position: relative;
                .user-icon {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  animation: opacity01 0.3s;
                }
              }
              .right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .share-user-name {
                  display: inline-block;
                  font-size: 14.5833rem;
                  color: #000;
                  vertical-align: middle;
                }
              }
            }
            .follow-author {
              .focus-button-container {
                .go-to-focuse {
                  background: #ff6700;
                  border: 0.516rem solid #ff6700;

                  color: #fff;
                  width: 65.109rem;
                  height: 23.445rem;
                  line-height: 23.445rem;
                  border-radius: 11.7rem;
                  text-align: center;
                  display: block;
                }
              }
            }
          }
        }
        // 用户结束

        // 内容开始
        .content-content {
          margin: 14.583rem 0 0;
          font-size: 14.583rem;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          text-align: justify;
          word-break: break-all;
          color: #000;
          width: 100%;
          line-height: 29.166rem;
        }
        // 内容结束

        // 视频开始
        .user-upload-video {
          margin: 10.938rem auto;
          border-radius: 5rem;
          overflow: hidden;
        }
        .mi-video-player {
          position: relative;
          width: 100%;
          background: #000;
          z-index: 0;
          .mi-video-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            color: #fff;
            user-select: none;
            -webkit-font-smoothing: antialiased;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            button {
              position: relative;
              cursor: pointer;
              border: none;
              -webkit-appearance: none;
              color: #fff;
              font-size: 0.2rem;
            }
            .mi-overlayer-play {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 4;
              .mi-video-play-btn {
                width: 68px;
                height: 68px;
                pointer-events: auto;
                background: rgba(0, 0, 0, 0.8);
                padding: 10px;
                border-radius: 200px;
                .mi-icon-play-lg {
                  width: 100%;
                  height: 100%;
                  margin-left: 5px;
                }
              }
            }
            .vertical-flex {
              display: flex;
              align-items: center;
              justify-content: center;
              -webkit-box-pack: center;
              -webkit-box-align: center;
              -webkit-box-orient: vertical;
              flex-direction: column;
            }
            .mi-video-box {
              height: 196.875rem;
            }
          }
        }
        // 视频结束

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

        // 评论开始
        .comments-container {
          position: relative;
          width: 100%;
          border-top: 0.5px solid rgba(0, 0, 0, 0.15);
          padding: 16.667rem 0;
          .comments-title {
            text-align: left;
            width: 100%;
            height: 25rem;
            font-size: 16.667rem;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.87);
            line-height: 25rem;
            margin-bottom: 16.667rem;
          }
          .comment-block {
            margin-bottom: 25rem;
            position: relative;
            width: 100%;
            text-align: left;
            min-height: 87.203rem;
            .user-icon {
              position: absolute;
              top: 0;
              left: 0;
              width: 38.172rem;
              height: 38.172rem;
              border-radius: 38.172rem;
              .user-icon {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .comment-info {
              position: relative;
              margin-left: 47.224rem;
              padding: 0 0 16.667rem 3.474rem;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
              .user-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12.5rem;
                position: relative;
                .nickname {
                  font-size: 14.5833rem;
                  color: rgba(0, 0, 0, 0.54);
                  line-height: 19.789rem;
                  margin-bottom: 2.083rem;
                }
                .date {
                  font-size: 12rem;
                  color: rgba(0, 0, 0, 0.54);
                }
              }

              .praise {
                position: absolute;
                right: 0;
                top: 12rem;

                display: flex;
                align-items: center;
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
          }
        }
        // 评论结束

        // 底部区域开始
        .bottom-area {
          position: fixed;
          width: 100%;
          height: 49.5rem;
          border-top: 0.5px solid rgba(0, 0, 0, 0.15);
          bottom: 50rem;
          left: 0;
          background-color: #fff;
          .bottom-area-content {
            width: 375rem;
            height: 100%;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            .write-comment-enter {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              flex: 1;
              margin-left: 22.552rem;
              .write-comment-icon {
                width: 25rem;
                height: 25rem;
              }
              .write-comment-text {
                font-size: 12rem;
                color: rgba(0, 0, 0, 0.72);
              }
            }
            .shop-button {
              width: 282.289rem;
              border-radius: 20.53rem;
              margin-right: 16.667rem;
              height: 41.664rem;
              line-height: 41.664rem;
              background-color: #ff6700;
              display: inline-block;
              color: #fff;
              font-size: 16.6667rem;
              outline: none;
              border: none;

              text-align: center;
            }
          }
        }
        // 底部区域结束
      }
      // 主要内容结束
    }
  }
  // 视图容器开始
}
// 视频详情结束
</style>