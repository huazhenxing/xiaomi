<template>
  <!-- 评论开始 -->
  <div v-if="comment_list || total || data">
    <!-- 评论1开始 -->
    <div class="comments" v-if="comment_list">
      <div class="comments-num" v-if="total">共{{ total.total }}条评论</div>
      <div class="comments-num" v-else>共{{ data.comment_num }}条评论</div>
      <div class="comments-user">
        <div class="comments-user-avatar">
          <img
            src="https://i8.mifile.cn/b2c-mimall-media/fa83661ee38a1495b26a59e73ae15eb3.png"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <div class="comments-user-input">来说点什么...</div>
      </div>

      <div class="comments-list">
        <div class="comment" v-for="item in comment_list" :key="item.id">
          <div class="comment-avatar">
            <img :src="item.img" alt="" width="100%" height="100%" />
          </div>
          <div class="comment-content">
            <div class="comment-info">
              <div class="comment-info-l">
                <div class="comment-user">
                  <span class="name">{{ item.nickname }}</span>
                  <span class="time">{{ item.create_time }}</span>
                </div>
                <div class="comment-text">
                  {{ item.comment }}
                </div>
              </div>

              <div class="comment-praise" v-if="total">
                <span class="num">{{ item.praise_num }}</span>
                <img
                  src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                  alt=""
                  class="i-praise"
                />
              </div>
            </div>

            <div
              class="comment-discuss"
              v-if="item.second_comment_list.length >= 1"
            >
              <div
                class="comment-discuss-item"
                v-for="item in item.second_comment_list"
                :key="item.id"
              >
                <span class="name">{{ item.nickname }}</span>
                <span class="reply" v-if="item.reply_nickname">
                  <span style="margin: 0px 2.604rem; color: rgb(51, 51, 51)"
                    >回复</span
                  >
                </span>
                <span class="name">{{ item.reply_nickname }} : </span>
                <span class="text">{{ item.comment }}</span>
              </div>
              <div
                class="comment-discuss-more"
                v-if="item.second_comment_list.length > 2"
              >
                展开更多{{
                  item.comment_num - item.second_comment_list.length
                }}条回复
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comments-more" v-if="total">
        查看全部{{ total.total }}条评论
      </div>
      <div class="comments-more" v-else>
        查看全部{{ data.comment_num }}条评论
      </div>
    </div>
    <!-- 评论1结束 -->

    <!-- 评论2开始 -->
    <!-- <div class="comments-container">
      <div class="comments-title">评论</div>
      <div class="comment-block">
        <div class="user-icon">
          <img class="user-icon" :src="comments.img" alt="" />
        </div>
        <div class="comment-info">
          <div class="user-info">
            <div>
              <div class="nickname">{{ comments.nickname }}</div>
              <div class="date">{{ comments.create_time }}</div>
            </div>
          </div>
          <div class="comment-text">{{ comments.comment }}</div>
          <div class="praise">
            <img
              class="praise-icon"
              src="https://m.mi.com/static/img/pre-praise.db3cd290e8.png"
              alt=""
            />
            <span class="praise-num" v-if="comments.praise_num">{{
              comments.praise_num
            }}</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 评论2结束 -->
  </div>
  <!-- 评论结束 -->
</template>

<script>
export default {
  props: ["comment_list", "total", "data"],
};
</script>

<style lang="scss" scoped>
// 评论1开始
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
// 评论1结束

// 评论2开始
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
        .praise-icon {
          height: 12.5rem;
          width: 12.5rem;
          vertical-align: baseline;
          margin-right: 4.167rem;
        }
        .praise-num {
          font-size: 12.5rem;
          color: rgba(0, 0, 0, 0.54);
        }
      }
    }
  }
}
// 评论2结束
</style>