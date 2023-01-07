<template>
  <!-- 投票详情开始 -->
  <div class="app-shell">
    <!-- 头部开始 -->
    <header class="app-header-wrapper app-shell-header border">
      <div class="app-header-left" @click="returnToSuperior">
        <div class="app-header-item">
          <i class="app-header-icon"></i>
        </div>
      </div>
      <div class="app-header-middle">
        <div class="app-header-title" style="color: rgb(102, 102, 102)">
          投票详情
        </div>
      </div>
      <div class="app-header-right"></div>
    </header>
    <!-- 头部结束 -->

    <!-- 视图容器开始 -->
    <div class="app-view-wrapper">
      <div class="app-view-with-header">
        <!-- 顶部开始 -->
        <div class="top-block">
          <img
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bc75335c68978884eacc0f5a46fa7e7d.png"
            alt=""
          />
        </div>
        <!-- 顶部结束 -->

        <!-- 投票开始 -->
        <div class="vote-block">
          <div class="vote-wrap">
            <div class="vote-inner">
              <div class="vote-title">
                有奖 | 有哪些手机材质让你爱不释手呢？
              </div>
              <div class="vote-desc">
                #新品热议#
                你喜爱哪种手机材质？欢迎投票&评论区讨论，还有机会赢取「定制便携咖啡杯」哦！
              </div>
              <div class="vote-body">
                <div class="vote-status">
                  <div class="left-status">
                    <div class="vote-progress">进行中</div>
                    <div class="vote-partice">4373人参与</div>
                  </div>
                </div>

                <ul class="selecte-container">
                  <li class="selecte-item">素皮</li>
                  <li class="selecte-item">素皮</li>
                  <li class="selecte-item">素皮</li>
                  <li class="selecte-item">素皮</li>
                  <li class="selecte-item">素皮</li>
                  <li class="selecte-item">素皮</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 投票结束 -->

        <!-- 评论开始 -->
        <div class="comments comments-block">
          <div class="comments-num">共1766条评论</div>
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
            <div class="comment">
              <div class="comment-avatar">
                <img
                  src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01ZL423l0hU/oiHVMAVwl1ezv9.jpg?thumb=150x150"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="comment-content">
                <div class="comment-info">
                  <div class="comment-info-l">
                    <div class="comment-user">
                      <span class="name">刘扬辉</span>
                      <span class="time">2021年11月04日 20:51</span>
                    </div>
                    <div class="comment-text">
                      没有口袋误触就是一个致命的缺陷
                    </div>
                  </div>
                  <div class="comment-praise">
                    <span class="num">150</span>
                    <img
                      src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                      alt=""
                      class="i-praise"
                    />
                  </div>
                </div>
                <div class="comment-discuss">
                  <div class="comment-discuss-item">
                    <span class="name">Tao</span>
                    <span class="name"> : </span>
                    <span class="text">note 10pro也无</span>
                  </div>
                  <div class="comment-discuss-item">
                    <span class="name">i</span>
                    <span class="name"> : </span>
                    <span class="text">确实是这样</span>
                  </div>
                  <div class="comment-discuss-item">
                    <span class="name">i</span>
                    <span class="name"> : </span>
                    <span class="text">确实是这样</span>
                  </div>
                  <div class="comment-discuss-more">展开更多17条回复</div>
                </div>
              </div>
            </div>
            <div class="comment">
              <div class="comment-avatar">
                <img
                  src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01ZL423l0hU/oiHVMAVwl1ezv9.jpg?thumb=150x150"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="comment-content">
                <div class="comment-info">
                  <div class="comment-info-l">
                    <div class="comment-user">
                      <span class="name">刘扬辉</span>
                      <span class="time">2021年11月04日 20:51</span>
                    </div>
                    <div class="comment-text">
                      没有口袋误触就是一个致命的缺陷
                    </div>
                  </div>
                  <div class="comment-praise">
                    <span class="num">150</span>
                    <img
                      src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                      alt=""
                      class="i-praise"
                    />
                  </div>
                </div>
                <div class="comment-discuss">
                  <div class="comment-discuss-item">
                    <span class="name">Tao</span>
                    <span class="name"> : </span>
                    <span class="text">note 10pro也无</span>
                  </div>
                  <div class="comment-discuss-item">
                    <span class="name">i</span>
                    <span class="name"> : </span>
                    <span class="text">确实是这样</span>
                  </div>
                  <div class="comment-discuss-item">
                    <span class="name">i</span>
                    <span class="name"> : </span>
                    <span class="text">确实是这样</span>
                  </div>
                  <div class="comment-discuss-more">展开更多17条回复</div>
                </div>
              </div>
            </div>
            <div class="comment">
              <div class="comment-avatar">
                <img
                  src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01ZL423l0hU/oiHVMAVwl1ezv9.jpg?thumb=150x150"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="comment-content">
                <div class="comment-info">
                  <div class="comment-info-l">
                    <div class="comment-user">
                      <span class="name">刘扬辉</span>
                      <span class="time">2021年11月04日 20:51</span>
                    </div>
                    <div class="comment-text">
                      没有口袋误触就是一个致命的缺陷
                    </div>
                  </div>
                  <div class="comment-praise">
                    <span class="num">150</span>
                    <img
                      src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                      alt=""
                      class="i-praise"
                    />
                  </div>
                </div>
                <div class="comment-discuss">
                  <div class="comment-discuss-item">
                    <span class="name">Tao</span>
                    <span class="name"> : </span>
                    <span class="text">note 10pro也无</span>
                  </div>
                  <div class="comment-discuss-item">
                    <span class="name">i</span>
                    <span class="name"> : </span>
                    <span class="text">确实是这样</span>
                  </div>
                  <div class="comment-discuss-item">
                    <span class="name">i</span>
                    <span class="name"> : </span>
                    <span class="text">确实是这样</span>
                  </div>
                  <div class="comment-discuss-more">展开更多17条回复</div>
                </div>
              </div>
            </div>
          </div>
          <div class="comments-more">查看全部1766条评论</div>
        </div>
        <!-- 评论结束 -->

        <!-- 推荐开始 -->
        <div class="recommended-block">
          <div class="recomend-wrap">
            <div class="recommended-title">相关推荐</div>

            <div class="waterfall-container recomment">
              <div class="wterfall-wrap">
                <div class="left">
                  <div class="recomended-item">
                    <div class="item-block">
                      <div class="img-container">
                        <div class="img-wrap">
                          <img
                            class="img"
                            src="https://cdn.fds-ssl.api.xiaomi.com/b2c-data-mishop…2ab6315500754d3717be43f10e57098.jpg?w=1500&h=2000"
                            alt=""
                          />
                        </div>
                        <div class="img-wrap">
                          <img
                            class="img"
                            src="https://cdn.fds-ssl.api.xiaomi.com/b2c-data-mishop…2ab6315500754d3717be43f10e57098.jpg?w=1500&h=2000"
                            alt=""
                          />
                        </div>
                      </div>

                      <div class="recommend-info-container">
                        <div class="relative-tag-container">
                          <div class="relative-tag-topic-wrap">
                            <span class="relative-tag-topic"></span>
                            <span class="relative-tag-name"> 话题</span>
                          </div>
                        </div>
                        <div class="item-title">K60 狠快狠强狠旗舰</div>
                        <div class="recommend-relative-topic">
                          <div class="left-type-1">
                            <img
                              class="
                                recommend-user-icon recommend-user-icon-list
                              "
                              src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/e…083-baf5-4192-afab-dc491eaef3c8.jpg?thumb=150x150"
                              alt=""
                            />
                            <img
                              class="
                                recommend-user-icon recommend-user-icon-list
                              "
                              src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01crAZMQTy0/2OKZMgMdXKEKFI.png?thumb=150x150"
                              alt=""
                            />
                            <img
                              class="
                                recommend-user-icon recommend-user-icon-list
                              "
                              src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/1…38f-32de-4dda-b7ba-7bca01d5c800.jpg?thumb=150x150"
                              alt=""
                            />
                          </div>

                          <div class="right-type-1">
                            <div class="recommend-view-num">28人在讨论 ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 推荐结束 -->

        <!-- 底部开始 -->
        <div class="bottom-action">
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
        </div>
        <!-- 底部结束 -->
      </div>
    </div>
    <!-- 视图容器结束 -->
  </div>
  <!-- 投票详情结束 -->
</template>

<script>
export default {
  methods: {
    //点击返回上一级
    returnToSuperior() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
// 投票详情开始
.app-shell {
  // 头部开始
  .app-shell-header {
    background-color: rgb(242, 242, 242);
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
      background: #f5f5f5 !important;
      min-height: 100vh;
      color: #3c3c3c;
      margin: auto;
      box-sizing: border-box;
      margin-bottom: 50rem;
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

      // 推荐开始
      .recommended-block {
        max-width: 375rem;
        margin: auto;
        .recomend-wrap {
          .recommended-title {
            text-align: left;
            width: 100%;
            padding-left: 16.667rem;
            height: 25rem;
            font-size: 16.667rem;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.87);
            line-height: 25rem;
            margin-bottom: 16.667rem;
            .waterfall-container {
              width: 375rem;
              .wterfall-wrap {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                width: 350rem;
                margin: auto;
                .left {
                  width: 170.828rem;
                  .recomended-item {
                    break-inside: avoid;
                    margin-bottom: 8.333rem;
                    background-color: #fff;
                    border-radius: 8.333rem;
                    overflow: hidden;
                    .item-block {
                      .img-container {
                        height: 89.945rem;
                        width: 145.828rem;
                        margin: auto;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        overflow: hidden;
                        .img-wrap {
                          display: flex;
                          justify-content: space-between;
                          align-content: center;
                          border-radius: 5rem;

                          width: 70.828rem;
                          height: 70.828rem;
                          .img {
                            width: 100%;
                            height: 100%;
                          }
                        }
                      }

                      .recommend-info-container {
                        padding: 0 0 12.5rem;
                        width: 145.828rem;
                        margin: auto;
                        text-align: left;
                        .relative-tag-container {
                          display: flex;
                          justify-content: flex-start;
                          margin: 8.333rem 0;
                          .relative-tag-topic-wrap {
                            background: linear-gradient(
                              270deg,
                              #feb861,
                              #ffc15c
                            );
                            height: 17.344rem;
                            border-radius: 13.172rem;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            padding: 0 5.208rem;
                            .relative-tag-topic {
                              display: inline-block;
                              height: 13.172rem;
                              line-height: 13.172rem;
                              width: 13.172rem;
                              text-align: center;
                              background-color: #fff;
                              border-radius: 13.172rem;
                              font-size: 12rem;
                              font-family: PingFangSC;
                              font-weight: 400;
                              color: #fba76d;
                            }
                            .relative-tag-name {
                              color: #fff;
                            }
                          }
                        }
                        .item-title {
                          font-size: 14.5833rem;
                          width: 100%;
                          font-family: MI-LANTING_GB-OUTSIDE;
                          font-weight: 400;
                          color: #333;
                          line-height: 20.828rem;
                          text-align: left;
                          margin-bottom: 8.333rem;
                          margin-top: 8.333rem;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 2;
                        }

                        .recommend-relative-topic {
                          position: relative;
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          border-radius: 0.44rem;
                          .left-type-1 {
                            max-width: 40.617rem;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .recommend-user-icon {
                              display: block;
                              width: 23.953rem;
                              height: 23.953rem;
                              border-radius: 10rem;
                              flex: 1;
                              flex-basis: 23.953rem;
                            }
                            .recommend-user-icon-list {
                              margin-right: -10.417rem;
                            }
                          }
                          .right-type-1 {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .recommend-view-num {
                              font-size: 12rem;
                              font-family: FZLTZHUNHK--GBK1;
                              font-weight: 400;
                              color: rgba(0, 0, 0, 0.5);
                              line-height: 12.133rem;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            .recomment {
              background: transparent;
            }
          }
        }
      }
      // 推荐结束

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
            padding: 0 8.333rem;
            background: #f6f6f6;
            color: #999;
            text-align: left;

            .i-pen {
              display: inline-block;
              margin-right: 4.688rem;
              width: 17.703rem;
              height: 17.703rem;
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
// 投票详情结束
</style>