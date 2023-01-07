<template>
  <!-- 内容详情开始 -->
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
          内容详情
        </div>
      </div>
      <div class="app-header-right">
        <div class="app-header-item">
          <i class="app-header-icon"></i>
        </div>
      </div>
    </header>
    头部结束

    <!-- 视图容器开始 -->
    <div class="app-view-wrapper">
      <div class="app-view-with-header">
        <!-- 设备开始 -->
        <div
          class="device"
          v-for="item in data.products"
          :key="item.product_id"
        >
          <div class="device-img">
            <img :src="item.img" alt="" width="100%" height="100%" />
          </div>
          <div class="device-name">{{ item.name }}</div>
          <div class="device-hot">10w热度</div>
          <div class="arrow"></div>
        </div>
        <!-- 设备结束 -->

        <!-- 主要内容开始 -->
        <div class="main-content">
          <!-- 文章开始 -->
          <div class="article">
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
                    <span class="devices">{{ data.dev_type }}</span>
                  </div>
                </div>
                <div class="user-focus">关注</div>
              </div>
              <!-- 用户结束 -->

              <!-- 内容开始 -->
              <div class="card-content">
                <div class="article-container">
                  <div class="content">{{ data.content }}</div>
                  <!-- <div class="images sequence">
                    <div class="image radius">
                      <img
                        src="https://cdn.fds-ssl.api.xiaomi.com/b2c-data-mishop/66af5b1644910a7fbf793693d76bd85a.jpeg?w=2256&h=2257"
                        alt=""
                      />
                    </div>
                    <div class="image radius">
                      <img
                        src="https://cdn.fds-ssl.api.xiaomi.com/b2c-data-mishop/66af5b1644910a7fbf793693d76bd85a.jpeg?w=2256&h=2257"
                        alt=""
                      />
                    </div>
                  </div> -->
                </div>
              </div>
              <!-- 内容结束 -->

              <!-- 标签开始 -->
              <!-- <div class="moment-tags">
                <div class="tags-item">
                  <img
                    src="https://m.mi.com/static/img/huati.d947499711.png"
                    alt=""
                    class="icon"
                  />
                  <span>Note11</span>
                </div>
              </div> -->
              <!-- 标签结束 -->
            </div>
          </div>
          <!-- 文章结束 -->

          <!-- 评论开始 -->
          <div class="comments">
            <!-- 评论总数开始 -->
            <div class="comments-num">
              共{{ total.total_primary_comment_num }}条评论
            </div>
            <!-- 评论总数结束 -->

            <!-- 评论用户开始 -->
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
            <!-- 评论用户结束 -->

            <!-- 评论列表开始 -->
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
                  <!-- <div class="comment-discuss">
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
                  </div> -->
                </div>
              </div>
              <!-- <div class="comment">
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
              </div> -->
            </div>
            <!-- 评论列表结束 -->

            <!-- 没有数据开始 -->
            <div class="no-data" v-if="!comment_list.length > 0">
              暂时还没有评论哦
            </div>
            <!-- 没有数据结束 -->

            <!-- 更多的评论开始 -->
            <div class="comments-more">
              查看全部{{ total.total_primary_comment_num }}条评论
            </div>
            <!-- 更多的评论结束 -->
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
                <span>1766</span>
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
        <!-- 底部结束 -->
      </div>
    </div>
  </div>
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
// 内容详情开始
.app-shell {
  // 头部开始
  .app-header-wrapper {
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
      //设备开始
      .device {
        padding: 6.771rem 5.208rem;
        text-align: left;
        border-bottom: 3px solid #f5f5f5;
        overflow: hidden;
        display: flex;
        align-items: center;
        .device-img {
          margin-right: 8.333rem;
          width: 31.25rem;
          height: 31.25rem;
        }
        .device-name {
          flex: 1;
          font-size: 13.5417rem;
          line-height: 1;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .device-hot {
          font-size: 12.5rem;
          line-height: 12.5rem;
          color: #999;
        }
        .arrow {
          width: 20.828rem;
          height: 20.828rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAMAAAApvJHbAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMAAQIDBAUGERIXGSAhIiMkJSYnKCksNEBBQkNERQpW9+0AAACfSURBVEjH7ZVZEoMwDENZShcIodCFJnn3P2fvIH0w0+b9a6w4ttw0lUrlz2jH19jL6luB7ayqn0De1OqXDLB0onzaAdZBU/dTAfJ6UqsDsKidCzvAopoPCch30Xw7A5Somp8/AFGs3s8JKKr5LgJk2XxMQLmK6uEN8DigtvVur+fOf1uz5s25tWPB2G8vW6xc8zLVy3Pvlnh3rFKp/ABfuAgRatQVDBMAAAAASUVORK5CYII=)
            50% no-repeat;
          background-size: 100% 100%;
        }
      }
      // 设备结束

      // 主要内容开始
      .main-content {
        margin: 0 12.5rem;
        overflow: hidden;
        // 文章开始
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
                  .devices {
                    padding-left: 10.417rem;
                    position: relative;
                    &::before {
                      content: "";
                      width: 6.766rem;
                      height: 10.938rem;
                      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAABBCAYAAABMx43BAAAEBklEQVRoQ+2aS2hcVRzGv+/MnY5OtSrRYsS2YoVKUEFREfGBUAsudFnFrCQhsxHcuREka8WFASFzDcGgWGgQdOFCqkUoNLooqWmxvh+rtlqttrahmd7zyX+8E0IfuWeul7aLcyBkmPs///Pd33nMved8bLfbdUlPktwO4BEAtwC4GpehkJSkv0h+C+CDWq22a2Rk5CtOTU09nWWZidsGYCOAawHUV9HYIXlM0mEAtwO4BkAHwA8A/iSZnVtX0ro8t/2/quD+FwEcI/m1Ca3X67uYpul7AO6WdE8APJH8B8CCpL0AngGwAcAJkh9KOpQLXk7lnLPPGyU9IekOAAMB7cCoAnif5KyJ/F7SDYGVjdIRkp8A2AngZUlDJI8AeLNWq82RNKrLpdPp0Dm3BcB27/2jOf0QnSZ0j6Q5ttvtkyTXSFoTUNMbNQCHSM5L2irpZpL23eckfwFgMeeW9ZLuBbAZwI0B7fRC9pNcMJJnJRGA9Ys1sEjydB+JKgn13juStXzSNvKkB7tAVoi0709J2kfyi0pa7iNJ3ps2Xh8AMHQxkUbxuKRZADaZLnVpOuc2SXo2X2ms/fNI2qT4DcBEq9V67VIrnJiYWFev1+90zr0E4PmLkYwii3omkiwiFHo9kgwlVRQXSRYRCr0eSYaSKoqLJIsIhV6PJENJFcVFkkWEQq+HkLT3m7NX7ENvu922h117EYsii7p91e6OJIvwrbgeSfYBa9XQSDKS7G2zxCWoj7EQJ04fsOISVBWsSDKS7BGIS1BVYyGSjCRXPgXxv9PwK/eVNk3T7qlqFBkwcIu2WXokbSfD7Ak7nXPvBuStNCTLsrWSbiP53IUOQJcP0b33mfkrAPxeqYKwZHbW3SA5IOn6vMryKW2PZHf+5EJtEvVTzC9hBpIzAE7nxpCeIcT2mUKLxSYATLCV80WGZloZZxOOpLkNfgZwOLfMbJB0KwD76zpFSpZqRNpBPoAfSb4FYG+WZaeSJNki6SlJLwIwb0dZoZWJNNPIx5J2ADjQarU6MzMzA0tLS9u896/klhzzA5UplYmck/R2kiS7R0dHf+0pSdP0cQCvSroLwPoyCqsck/Mkd5D8aGxs7DsTMz4+7gYHB7eSfF3SJgDXlRVpTitzs5yQZBaXEF/QhdoyO9gBALOS9jcajb+zLNvsvTdH1Qu5wLK59znn5k3kQUk3/Y8usR+BM+a6krQA4Ghum7nP7GVlJk1urPMkd0vaYyLfkPQQgIfLdEme0NbJk2Z8yvfem7kJqax70G7ccr3THUqTk5OPOefuz22JZtdaW+D6K3Mv/dRZlPSHc+4bAJ8mSfJl99dgenp6SNKD3vsh773NRCNxuUp33XXOfdZsNn8aHh4+/i9JKNsfmC6KSgAAAABJRU5ErkJggg==)
                        50% no-repeat;
                      background-size: 100% 100%;
                      position: absolute;
                      left: 0;
                      top: 8%;
                      text-decoration: inherit;
                      vertical-align: inherit;
                      box-sizing: inherit;
                    }
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
                & > div {
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
                max-width: 55.68rem;
                margin-bottom: 9.375rem;
                line-height: 12.5rem;
                background: #f6f6f6;
                border-radius: 10rem;
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
          // 评论总数开始
          .comments-num {
            margin-bottom: 14.583rem;
            color: #333;
            font-size: 12.5rem;
          }
          // 评论总数结束

          // 评论用户开始
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
          // 评论用户结束

          // 评论列表开始
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
          // 评论列表结束

          // 没有数据开始
          .no-data {
            margin-bottom: 15.625rem;
            height: 124rem;
            line-height: 103.33rem;
            text-align: center;
            color: #999;
            border-bottom: 1px solid #f5f5f5;
          }
          // 没有数据结束

          // 更多的评论开始
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
          // 更多的评论结束
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
}
</style>