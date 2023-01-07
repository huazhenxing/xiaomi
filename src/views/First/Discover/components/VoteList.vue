<template>
  <!-- 投票板块 -->
  <div class="card" v-if="content">
    <!-- 用户开始 -->
    <div class="user">
      <div class="user-avatar">
        <img :src="content.icon" alt="" />
      </div>
      <div class="user-info">
        <div class="user-info-name">{{ content.nickname }}</div>
      </div>
      <div class="user-ctrl"></div>
    </div>
    <!-- 用户结束 -->

    <!-- 投票开始 -->
    <div class="card-content">
      <!-- <a href="http://192.168.1.103:8080/#/discover/article/1203529/5"></a> -->
      <div class="title">{{ content.title }}</div>
      <div class="vote-box">
        <div class="vote-status layout align-center active">
          <span class="i active">进行中</span
          >{{ content.vote_detail.vote_user_num }}人参与
        </div>
        <div class="vote-list active">
          <div
            class="vote-list-item"
            v-for="item in content.vote_detail.vote_option_list"
            :key="item.vote_option_id"
          >
            <div class="select">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 投票结束 -->

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
</template>

<script>
export default {
  props: ["content"],
  mounted() {
    console.log("vote", this.content);
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-left: 12.5rem;
  margin-right: 12.5rem;
  padding-top: 15.625rem;
  text-align: left;
  background: #fff;
  color: #3c3c3c;
  &::after {
    margin-left: -12.5rem;
    margin-right: -12.5rem;
    display: block;
    content: "";
    border-bottom: 6.25rem solid #f6f6f6;
  }

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
  .card-content {
    margin-bottom: 14.063rem;
    .title {
      font-size: 15.625rem;
      font-weight: 500;
      color: #333;
      line-height: 20.83rem;
    }
    .vote-box {
      margin-top: 10.417rem;
      padding: 11.979rem 19.792rem;
      background: #f9f9f9;
      border-radius: 5rem;
      border: 1px solid #eee;
      .vote-status {
        height: 13.539rem;
        font-size: 12rem;
        color: #999;
        line-height: 13.539rem;
        .i {
          padding: 2.083rem 3.125rem;
          margin-right: 8.333rem;
          background: #999;
          border-radius: 4px;
          color: #fff;
          font-size: 12rem;
        }
        .i.active {
          background: #ff4528;
        }
      }
      .vote-list-item {
        color: #333;

        margin-top: 10.417rem;
        background-color: #fff;
        border-radius: 5rem;
        font-size: 13.5417rem;
        height: 32.891rem;
        line-height: 32.891rem;
        color: #999;
        overflow: hidden;
        border: 1px solid #eee;
        .select {
          text-align: center;
        }
      }
    }
  }

  .card-message {
    padding: 8.333rem;
    margin-bottom: 7.292rem;
    background: #f6f6f6;
    border-radius: 2rem;
    .card-message-item {
      font-size: 13.5417rem;
      font-weight: 400;
      color: #161616;
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
}

.align-center {
  -webkit-box-align: center;
  align-items: center;
}
.layout {
  display: -webkit-box;
  display: flex;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  flex-wrap: nowrap;
}
</style>