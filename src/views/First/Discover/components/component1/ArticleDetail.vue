<template>
  <!-- 文章详情开始 -->
  <div class="app-shell" v-if="data && total && comment_list">
    <!-- 头部开始 -->
    <header class="app-header-wrapper app-shell-header border">
      <div class="app-header-left">
        <div class="app-header-item" @click="returnToSuperior">
          <i class="app-header-icon"></i>
        </div>
      </div>
      <div class="app-header-middle">
        <div class="app-header-title" style="color: rgb(102, 102, 102)">
          文章详情
        </div>
      </div>
      <div class="app-header-right">
        <div class="app-header-item">
          <i class="app-header-icon"></i>
        </div>
      </div>
    </header>
    <!-- 头部结束 -->

    <!-- 视图容器开始 -->
    <div class="app-view-wrapper">
      <div class="app-view-with-header">
        <!-- 主要内容开始 -->
        <div class="main-content">
          <!-- 文章开始 -->
          <div class="article">
            <!-- 标题开始 -->
            <div class="title">{{ data.title }}</div>
            <!-- 标题结束 -->

            <div class="card">
              <!-- 用户开始 -->
              <div class="user">
                <div class="user-avatar">
                  <img :src="data.icon" alt="" width="100%" height="100%" />
                </div>
                <div class="user-info">
                  <div class="user-info-name">{{ data.nickname }}</div>
                  <div class="user-info-other">
                    <span class="time">{{ data.create_time }}</span>
                  </div>
                </div>
                <div class="user-focus">关注</div>
              </div>
              <!-- 用户结束 -->

              <!-- 内容开始 -->
              <div class="card-content">
                <div
                  class="discover-article-box"
                  v-html="data.article_h5"
                ></div>
              </div>
              <!-- 内容结束 -->

              <!-- 标签开始 -->
              <div class="moment-tags">
                <div
                  class="tags-item"
                  v-for="item in data.tag_list"
                  :key="item.id"
                >
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
            </div>
          </div>
          <!-- 文章结束 -->

          <!-- 评论开始 -->
          <div class="comments">
            <div class="comments-num">
              共{{ total.total_primary_comment_num }}条评论
            </div>
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
                        <span class="time">2021年11月04日 20:51</span>
                      </div>
                      <div class="comment-text">
                        {{ item.comment }}
                      </div>
                    </div>
                    <div class="comment-praise">
                      <span class="num">{{ item.praise_num }}</span>
                      <img
                        src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                        alt=""
                        class="i-praise"
                      />
                    </div>
                  </div>
                  <div class="comment-discuss">
                    <div
                      class="comment-discuss-item"
                      v-for="item in item.second_comment_list"
                      :key="item.id"
                    >
                      <span class="name">{{ item.nickname }}</span>
                      <span class="reply" v-if="item.reply_nickname">
                        <span
                          style="margin: 0px 2.604rem; color: rgb(51, 51, 51)"
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
                      展开更多回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="comments-more">
              查看全部{{ total.total_primary_comment_num }}条评论
            </div>
          </div>
          <!-- 评论结束 -->
        </div>
        <!-- 主要内容结束 -->

        <!-- 底部开始 -->
        <div class="bottom-action">
          <div class="bottom-action-left">
            <div class="bottom-action-btn buy-btn">
              ￥1599起 立即购买
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAnFBMVEUAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////v///////////////////////v/////////////////////////////////+///////+///////////////+/v/+/////v////+kjwqbAAAAMHRSTlMAAQIDBgkOEhQuLzY6PURGSEtMTU5PV1leX42urrfJ1drb297g4eLj5Ofo6Onp/f73eMRnAAAAtklEQVQoz6WTaRKCMBSDKVURlEVBXBHcniAq1Nz/bl7ARmd8f9PXzJemjvPzjDSVx7s1O+AVuC+UXQ9LQFLXqutEgGZlt1C+GDRL+w0qOnSmnhGL9ATUud1CTy9AyzAnZ6DN7JjuvAKuGbGIBbgRCxUI0OYEM64MGOZg8wT2Q7IPsq8CeRF/HQuL6Bs/z+9L/jo9obe/n4qOHQPzBaQ/OhHD+heW6Fl/vQIP1n9nvF3rf/7f53kDDgwVMThwprwAAAAASUVORK5CYII="
                alt=""
                class="i-arrow"
              />
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
                <span>{{ total.total_primary_comment_num }}</span>
              </div>
              <div class="action-icon">
                <img
                  src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                  alt=""
                  class="icon"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 底部开始 -->
      </div>
    </div>
    <!-- 视图容器结束 -->
  </div>
  <!-- 文章详情结束 -->
</template>

<script>
export default {
  props: ["data", "total", "comment_list"],

  methods: {
    //点击返回上一级
    returnToSuperior() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
// 文章详情开始
.app-shell {
  // 头部开始
  .app-shell-header {
    background-color: rgb(255, 255, 255);
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 50%;
    width: 375rem;
    transform: translateX(-50%);
    & > div {
      display: flex;
      align-items: center;
    }
    .app-header-item {
      display: block;
      width: 31.25rem;
      margin: 0 10.417rem;
      .app-header-icon {
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        display: block;
        overflow: hidden;
      }
    }
    .app-header-left {
      .app-header-icon {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
        width: 26.039rem;
        height: 26.039rem;
      }
    }
    .app-header-middle {
      flex: 1;
      font-size: 15.625rem;
      .app-header-title {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
      }
    }
    .app-header-right {
      min-width: 52.078rem;
      .app-header-icon {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAABDlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgAAAAAAAAAAAAAAAAACAAIAAAAAAAACAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAEAAQABAAABAQABAQH5nwh2AAAAWnRSTlMAAQMEBQYICQoLDQ4PEBITFBUZHCUqKywtMzQ5Ojs+QEFMVVhZXl9gYmRrbnBxcnZ3eXp7fH6Pj5CRkpSUlaGhpqiqq623wMXR1tfc3+Dh4uPk5OXm5ubm5uZI4vvLAAABJUlEQVQYGe3BSyMCURgG4G9yiRKli0oikluoiOSeSzSlYd6m/P8/Ypo2Z7KxOAuL93mEiIiIiIiIiIiIiIiI6G9mC+cna/JLrlLNB2RaslwvLIgWRuoZQL8WEZ/4LUb4aK6KT+S0B3w9JESH5ZYNV/dIVOGGBWBoXwVEMV+1MPYSFQ2KFlwOOkFRZE14+nlRpNrAAK5j0eAGDjw5UezBgacqiq0eXCOgJRo0MTFcF0UJYwOgIorNLiYeRYNtTHSCosia8Dg5UaTa3wBGcMqiwdKTDQfoHYoqdPkJOLCuRTVz1ofLfl0UDYzMveXgvRYTn8SFCZiNuPjE6m9A9y4tWhjRjf1iMihTQtndUiYsU+bSOwf5FUOIiIiIiIiIiIiIiIiI/rUfLiVAIk2yGYMAAAAASUVORK5CYII=);
        background-size: 31.25rem 31.25rem;
        width: 31.25rem;
        height: 31.25rem;
      }
    }
  }
  .app-shell-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: rgb(255, 255, 255);
    color: #666;
    padding: 0;
    transition: transform 0.2s ease-out;
  }
  .border {
    border-bottom: 1px solid #f5f5f5;
  }
  // 头部结束

  // 视图容器开始
  .app-view-wrapper {
    .app-view-with-header {
      padding-top: 50px;
      background: #fff;
      color: #3c3c3c;
      margin: auto;
      box-sizing: border-box;
      margin-bottom: 50rem;
      // 主要内容开始
      .main-content {
        margin: 0 12.5rem;
        overflow: hidden;
        // 文章开始
        .article {
          text-align: left;
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

          .card {
            margin-bottom: 20.833rem;
            margin-left: 0;
            margin-right: 0;
            padding-bottom: 5.208rem;
            border-bottom: 1px solid #f5f5f5;
            padding-top: 15.625rem;
            text-align: left;
            // 用户开始
            .user {
              margin-bottom: 10.417rem;
              display: flex;
              align-items: center;
              .user-avatar {
                margin-right: 8.333rem;
                width: 27.078rem;
                height: 27.078rem;
                border-radius: 27.078rem;
                overflow: hidden;
              }
              .user-info {
                flex: 1;
                .user-info-name {
                  font-size: 12.5rem;
                  font-weight: 500;
                  color: #161616;
                  line-height: 17.5rem;
                }
                .user-info-other {
                  font-size: 12rem;
                  font-weight: 500;
                  color: #757575;
                  .time {
                    margin-right: 6.25rem;
                  }
                }
              }
              .user-focus {
                padding: 0 17.188rem;
                height: 23rem;
                line-height: 23rem;
                background: #fff;
                border-radius: 12.5rem;
                border: 1px solid #ff5528;
                font-size: 12.5rem;
                font-weight: 500;
                text-align: center;
                color: #ff5528;
              }
            }
            // 用户结束

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
              }
            }
            // 内容结束

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
          }
        }
        // 文章结束

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
        // 评论结束
      }
      // 主要内容结束

      // 底部开始
      .bottom-action {
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 50rem;
        left: 0;
        right: 0;
        padding: 7.813rem 0 7.813rem 12.5rem;
        background-color: #fff;
        border-top: 1px solid #f5f5f5;
        z-index: 999;
        .bottom-action-left {
          flex: 1;
          .bottom-action-btn {
            height: 34.375rem;
            line-height: 34.375rem;
            border-radius: 34.375rem;
            font-weight: 500;
            font-size: 13.5417rem;
            display: flex;
            align-items: center;
            &.buy-btn {
              padding: 0;
              justify-content: center;
              background: #ff5528;
              color: #fff;
              text-align: center;
            }
            .i-arrow {
              display: inline-block;
              width: 10.414rem;
              height: 10.414rem;
            }
          }
        }
        .bottom-action-right {
          .bottom-action-ctrl {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .action-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13.5417rem;
              color: #666;
              font-weight: 500;
              width: 75rem;
              .icon {
                width: 20.828rem;
                height: 20.828rem;
              }
            }
          }
        }
      }
      // 底部结束
    }
  }
  // 视图容器结束
}
// 文章详情结束
</style>