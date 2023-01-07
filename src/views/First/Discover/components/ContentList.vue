<template>
  <!-- 内容板块(文章、内容、买家秀、视频)开始 -->
  <div class="card" v-if="content">
    <!-- 用户开始 -->
    <div class="user">
      <div class="user-avatar">
        <img :src="content.icon" alt="" width="100%" height="100%" />
      </div>
      <div class="user-info">
        <div class="user-info-name">{{ content.nickname }}</div>
        <div class="user-info-other" v-if="content.dev_type">
          <span class="device">{{ content.dev_type }}</span>
        </div>
      </div>
      <div class="user-ctrl"></div>
    </div>
    <!-- 用户结束 -->

    <!-- 主要内容开始 -->
    <div class="card-content">
      <!-- 标题+内容开始 -->
      <div class="article" v-if="content.title">
        <div class="title">{{ content.title }}</div>
        <div class="content">
          {{ content.content }}
        </div>

        <div
          class="images"
          v-if="content.pic_list.length || content.video_list.length > 0"
        >
          <div
            :class="{
              image1: content.pic_list.length == 1,
              image2: content.pic_list.length == 2,
              image3: content.pic_list.length == 3,
            }"
            class="image"
            v-for="(item, index) in content.pic_list"
            :key="index"
          >
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
      <!-- 标题+内容结束 -->

      <!-- 内容开始 -->
      <div class="normal" v-else>
        <div class="content">
          {{ content.content }}
        </div>

        <div
          class="images"
          v-if="content.pic_list.length || content.video_list.length > 0"
        >
          <div
            :class="{
              image1: content.pic_list.length == 1,
              image2: content.pic_list.length == 2,
              image3: content.pic_list.length == 3,
            }"
            class="image"
            v-for="(item, index) in content.pic_list"
            :key="index"
          >
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
      <!-- 内容开始 -->

      <!-- 视频开始 -->
      <div
        class="mi-video-player user-upload-video"
        v-show="content.video_list.length >= 1"
      >
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
          <div
            class="mi-video-box"
            v-for="(item, index) in content.video_list"
            :key="index"
          >
            <img :src="item.cover" />
          </div>
        </div>
      </div>
      <!-- 视频结束 -->
    </div>
    <!-- 主要内容结束 -->

    <!-- 标签开始 -->
    <div class="moment-tags">
      <div class="tags-item" v-for="item in content.tag_list" :key="item.id">
        <img v-if="item.img" :src="item.img" alt="" class="icon i-device" />
        <img
          v-else
          src="https://m.mi.com/static/img/huati.d947499711.png"
          alt=""
          class="icon i-device"
        />
        <span>{{ item.tag }}</span>
      </div>
    </div>
    <!-- 标签结束 -->

    <!-- 评论开始 -->
    <div class="card-message" v-if="content.hot_comment">
      <div class="card-message-item">
        <span class="name">{{ content.hot_comment.name }}:</span
        >{{ content.hot_comment.comment }}
      </div>
    </div>
    <!-- 评论结束 -->

    <!-- 点赞开始 -->
    <div class="card-ctrl">
      <div class="shar-btn"></div>
      <div class="send-btn">
        <span class="name">{{ content.comment_num }}</span>
      </div>
      <div class="praise-btn">
        <span class="name">{{ content.praise_num }}</span>
      </div>
    </div>
    <!-- 点赞结束 -->
  </div>
  <!-- 内容板块(文章、内容、买家秀、视频)结束 -->
</template>

<script>
export default {
  props: ["content"],
};
</script>

<style lang="scss" scoped>
// 内容板块(文章、内容、买家秀、视频)开始
.card {
  margin-left: 12.5rem;
  margin-right: 12.5rem;
  padding-top: 15.625rem;
  text-align: left;
  &::after {
    margin-left: -12.5rem;
    margin-right: -12.5rem;
    display: block;
    content: "";
    border-bottom: 6.25rem solid #f6f6f6;
  }

  // 用户开始
  .user {
    margin-bottom: 10.417rem;
    display: flex;
    align-items: center;
    .user-avatar {
      margin-right: 8.33rem;
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
        .device {
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
    .user-ctrl {
      margin-left: 5.208rem;
      width: 20.828rem;
      height: 20.828rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAQAAAC380bCAAAFNklEQVR42u2c/0+VVRzH7xWQLwqCQeAgES8qQ4uZbkK2pEVtWlrKXFtfcOnYFEmzlpvNNQw1sqar1eZWqWT2A9pc6u5SoPO8P5/zPF3lNhFj2ZKwNCR1uBlpfLk8/aBm2uXen/t4XucveO18nuecz3Pez/F4DAaDwWAw3NW43mCcSnASVUIwzvXeFcoq4dsJ9CDN5hk8vjOhZoRoWX887uMyXqk38Yf0MT7ijVSNJ5DnjvB4hc4uj7fLsQcXMAAXLlwM4gJ9oZ8LZPrjRZY4HqINcHCe+jB0Q3mI+qxu0thmT/PHCyxpeh0tuHpD9t/jD7TxKj1VmPLRe/QCHAije330oglLVKyo4nYKsIfODKs8iEv0AU8+mCRG+MQoegxtuDassgsXh+hplS5GOZDDFfgtorCLo7SuOVeMsp5CL+N8FOU22mL75KzIBVgdVfkkvavy5azIeVRJUQqbvuMa5IlRbhyDedSBUETlRq5QWXIKO9aZjkPoHlY4RFfwqZ6pkyWty9n6FeJ/Npp3jr/oFL/WPlJUV+Uk6il4D13UH6akQ+jmWp7lymojXa8bY83HJ2jD5f+U9EnsojnOWIGdVGeCPY224DgGMIgQQghhkP6kU7RZTTs8SmS/3BATSMH9eNZ6C5/Dz9/Q1/QZ1/JieiCQ4sZI/gyUzkX0DL9EK7BML+AZwTGu7E9BBoPBYDAYDAaDwWAwGAwGg8Hw/yYYF8i0fVTo5FNG+0jhkcaGmEAK8nQxL6bltMaqssvtkmafShWsrZPtEr0ZLehEF7qpi86gBXVcKja+6hRwBe2gVvTePFynEHqplXZalXZuME5cSetkLIEfV8KcLveQ5oXHsoQpB1LsEtqBK2HDE4O4SLt5vjBl5NFmah02J9KHn1DTnC0ouhqM08VoQW/ETNA+mqNS5ZR1Ji9GZ5REEFO1yhGjbPtoObqiRN2OYyNPFKNMhXpNhAjU9Vn+nrY6ctJ9Tr5VRVFmmVr1JkmznGGX0xmK/CyDq5xsMcrtI+2SiG/sIfTTXi7jNDHKrtf2cR2dGFZ5AOe4NpguatOpUrmUdqIHg2HnuAf1/JQbI6q5cL3BOKokjYvUd4fuAHroqF4kbo/t8bheO5cX0m7r9G3K/XQW9XqRymkYKfJrCI3DAtqAL4lxHO3UCsI+ruX5x7LaJQrfpDlblVI1NtJWvYmruCyYLjrM6PF4PP54lapyeKKTzxOdbE67a37oNRgMBoPBYDAYDAaDwWAwGAwiaIjRycF0lUUZarSwQ5nwuF4n0SmwH9HzuJQnB5OE/6N+MIkK9TJsp/04YilqpP28nSq5SOxcN2Xyw7QWh+nW+WMIl3GE3qDZztgGiWcWei7tQDcGbrtDZggD1jkc4FmdCcJ0g0lUiDp0oC/M+fI1dOBtmi1MmcbRCrKGzYlcxTGsbhyjYgW9pbmIFHoiZEUGUI/parQYZU6zn6Qf0R8pEWQ10guC7vuyc7EsarovSG+qCXKe5EJ+Fb9HTfdtE5Tu48lUbUULNJ6gdyTd0JjDL1rnhr3T7bpygNbyeDHKTqJ+1DodNvN1a/jtcsqQ1DtNpV3UEeFO3Yt4PzDJSRS0FbHvxfN0kK6Gi67SEHpJYamwoIyK5TSsx8/UF/a6wrNchUnSuimvO0IV0zpqun19tgatS2jCei4StPO6hT/e9vEqay9+wK9WNy6gm37BSXzFK22fSvBIxPUG4zhNzUQFbeF62ke7UcdLuUilC4+7+VOQp4q5TM/Vj/Ms2xdMqjHXFRoMBoPB4PF4PH8DMOM6OoU7iBYAAAAASUVORK5CYII=)
        50% no-repeat;
      background-size: 100% 100%;
    }
  }
  // 用户结束

  // 主要内容开始
  .card-content {
    margin-bottom: 14.063rem;
    // 标题+内容开始
    .article {
      .title {
        font-size: 15.625rem;
        font-weight: 500;
        color: #333;
        line-height: 20.83rem;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .content {
        margin-top: 8.333rem;
        font-size: 13.5417rem;
        color: #666;
        line-height: 25rem;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }

      .images {
        display: flex;
        flex-wrap: wrap;
        border-radius: 10rem;
        overflow: hidden;
        margin-top: 10.417rem;

        .image {
          height: 115.102rem;
          overflow: hidden;
          width: 33%;
          margin-right: 1rem;
          margin-bottom: 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .image1 {
          width: 100% !important;
          height: 100% !important;
          height: 231.25rem !important;
        }
        .image2 {
          width: 49.5% !important;
          height: 10% !important;
          max-height: 113.719rem !important;
        }
        .image3 {
          width: 33% !important;
          height: 100% !important;
          height: 115.102rem !important;

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
    // 标题+内容结束

    // 内容开始
    .normal {
      .content {
        font-size: 15.625rem;
        font-weight: 500;
        color: #333;
        line-height: 20.83rem;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .images {
        display: flex;
        flex-wrap: wrap;
        border-radius: 5rem;
        overflow: hidden;
        margin-top: 10.417rem;

        .image {
          height: 115.102rem;
          overflow: hidden;
          width: 33%;
          margin-right: 1rem;
          margin-bottom: 1rem;
          .player {
            width: 100%;
            height: 100%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            &::after {
              content: "";
              width: 31.25rem;
              height: 31.25rem;
              background: url(https://m.mi.com/static/img/play.d0cae3f313.png)
                no-repeat;
              background-size: contain;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .image1 {
          width: 100% !important;
          height: 100% !important;
          height: 231.25rem;
        }
        .image2 {
          width: 49.5% !important;
          height: 100% !important;

          height: 113.719rem;
        }
        .image3 {
          width: 33% !important;
          height: 115.102rem;

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
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
  }
  // 主要内容结束

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
      max-width: 328.125rem;
      margin-bottom: 9.375rem;
      line-height: 12.5rem;
      border-radius: 5rem;
      font-size: 12.5rem;
      font-weight: 500;
      color: #757575;
      background: #f6f6f6;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .icon {
        width: auto;
        height: 12.5rem;
        float: left;
        margin-right: 3.646rem;
        width: 12.5rem;
        height: 12.5rem;
      }
      span {
        font-size: 12.5rem;
        font-weight: 500;
        color: #757575;
        line-height: 12.5rem;
      }
    }
  }
  // 标签结束

  // 评论开始
  .card-message {
    padding: 8.333rem;
    margin-bottom: 7.292rem;
    background: #f6f6f6;
    border-radius: 5rem;
    .card-message-item {
      font-size: 13.5417rem;
      font-weight: 400;
      color: #161616;
      line-height: 18.14rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      .name {
        color: #757575;
      }
    }
  }
  // 评论结束

  // 点赞开始
  .card-ctrl {
    padding-bottom: 10.417rem;
    display: flex;
    justify-content: space-around;
    .shar-btn {
      width: 20.828rem;
      height: 20.828rem;
      background: url(https://m.mi.com/static/img/m_b_share.ac01313399.png)
        no-repeat;
      background-size: contain;
    }
    .send-btn {
      width: 20.828rem;
      height: 20.828rem;
      background: url(https://m.mi.com/static/img/m_b_msg.1f9f89973f.png)
        no-repeat;
      background-size: contain;
      position: relative;
    }
    .praise-btn {
      width: 20.828rem;
      height: 20.828rem;
      background: url(https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png)
        no-repeat;
      background-size: contain;
      position: relative;
    }
    .name {
      width: 52.078rem;
      position: absolute;
      left: calc(100% + 0.03rem);
      top: 50%;
      transform: translateY(-50%);
      font-size: 12.5rem;
      font-family: DIN-Medium, DIN;
      font-weight: 500;
      color: #757575;
    }
  }
  // 点赞结束
}
// 内容板块(文章、内容、买家秀、视频)结束
</style>