<template>
  <!-- 视频详情开始 -->
  <div class="app-shell" v-if="moment_list">
    <!-- 视图容器开始 -->
    <div class="app-view-wrapper">
      <div class="article-container">
        <!-- 主要内容开始 -->
        <div class="main-content">
          <!-- 用户开始 -->
          <div class="log-block">
            <div class="share-user-info-wrap">
              <div class="shear-content-user-info">
                <div class="share-user-icon">
                  <img class="user-icon" :src="moment_list.author_img" alt="" />
                </div>
                <div class="right">
                  <span class="share-user-name">星辰</span>
                  <div class="time-info">08-19 11:08</div>
                </div>
              </div>
              <div class="follow-author">
                <div class="focus-button-container">
                  <div class="go-to-focuse">+ 关注</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 用户结束 -->

          <!-- 内容开始 -->
          <div class="content-content">
            致敬经典/继续探索，坚定前行/永不止步，永远相信美好的事情即将发生
          </div>
          <!-- 内容结束 -->

          <!-- 视频开始 -->
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
                  src="https://video.m.mi.com/3359d6e66751041610d9f7fb8240823a/1672204016/common/aeabb1fe87f4c93a4c03ef436fa312f2.mp4"
                ></video>
                <!-- autoplay loop -->
              </div>
            </div>
          </div>
          <!-- 视频结束 -->

          <!-- 文章信息开始 -->
          <div class="article-info">
            <div class="read-num"></div>
            <div class="praise">
              <img
                src="https://m.mi.com/static/img/pre-praise.db3cd290e8.png"
                alt=""
                class="praise-icon"
              />
              <span class="praise-num">8277</span>
            </div>
          </div>
          <!-- 文章信息结束 -->

          <!-- 评论开始 -->
          <div class="comments-container">
            <div class="comments-title">评论</div>
            <div class="comment-block">
              <div class="user-icon">
                <img
                  class="user-icon"
                  src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01cxGLSsRO8/3h8bUEgNPmpgbK.jpg?thumb=150x150"
                  alt=""
                />
              </div>
              <div class="comment-info">
                <div class="user-info">
                  <div>
                    <div class="nickname">sunburst</div>
                    <div class="date">1天前</div>
                  </div>
                </div>
                <div class="comment-text">买不到有什么办法</div>
                <div class="praise">
                  <img
                    class="praise-icon"
                    src="https://m.mi.com/static/img/pre-praise.db3cd290e8.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 评论结束 -->

          <!-- 底部区域开始 -->
          <div class="bottom-area">
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
          </div>
          <!-- 底部区域结束 -->
        </div>
        <!-- 主要内容结束 -->
      </div>
    </div>
    <!-- 视图容器开始 -->
  </div>
  <!-- 视频详情结束 -->
</template>

<script>
export default {
  props: ["moment_list"],
};
</script>

<style lang="scss" scoped>
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

        // 文章信息开始
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
        // 文章信息结束

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
                .praise-icon {
                  height: 12.5rem;
                  width: 12.5rem;
                  vertical-align: baseline;
                  margin-right: 4.167rem;
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