<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="header-left">
        <div class="avatar">
          <img src="@/assets/icon.png" alt="" />
        </div>
      </div>
      <div class="header-center">
        <div class="tab">
          <div
            class="tab-item"
            v-for="(item, idx) in arrList"
            :key="idx"
            :class="idx == index ? 'active' : ''"
            @click="son(idx)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="header-right"></div>
    </div>

    <!-- 列表 -->
    <div class="content-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="rec_list.length"
      >
        <div
          v-for="(item, index) in rec_list"
          :key="index"
          @click="
            ClickJump(
              `discover/article/${item.content.id}/${item.content.content_type}`,
              item.content.content_type,
              item.content.announce_id,
              item.content.vote_detail ? item.content.vote_detail.vote_id : ''
            )
          "
        >
          <!-- 问题板块 -->
          <QuestionList v-if="item.content.question" :content="item.content" />

          <!-- 投票板块-->
          <VoteList v-if="item.content.vote_detail" :content="item.content" />

          <!-- 内容板块(文章、内容、买家秀、视频) -->
          <ContentList
            v-if="!item.content.question && !item.content.vote_detail"
            :content="item.content"
          />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, List, Toast } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Toast);

import QuestionList from "@/views/First/Discover/components/QuestionList.vue";
import ContentList from "@/views/First/Discover/components/ContentList.vue";
import VoteList from "@/views/First/Discover/components/VoteList.vue";

export default {
  name: "DiscoverView",
  components: {
    QuestionList,
    ContentList,
    VoteList,
  },
  data() {
    return {
      tab_list: null,
      content: null,
      arrList: ["关注", "推荐", "雷军年度演讲", "小米发布"], //头部数据
      rec_list: [], //数据列表
      index: 1, //默认选中

      list: [],
      loading: false,
      finished: false,
      page: 2,
    };
  },
  created() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0,
    });

    this.axios.get("communicate/home_conf").then((res) => {
      this.tab_list = res.data.data.tab_list ? res.data.data.tab_list : [];
    });

    this.axios
      .get("https://apis.netstart.cn/xmsc/communicate/home_rec?after=1?size=10")
      .then((res) => {
        Toast.clear();
        this.rec_list = res.data.data.rec_list;
        console.log("rec_list==>", this.rec_list);
      });
  },

  methods: {
    son(idx) {
      this.index = idx;
      if (idx == 2) {
        window.location.href = this.tab_list[0].h5_url;
      }
      if (idx == 3) {
        window.location.href = this.tab_list[1].h5_url;
      }
    },

    path() {
      window.location.href = this.rec_list[0].poster.action.path;
    },

    onLoad() {
      this.page = this.rec_list.length / 10 + 1;
      setTimeout(() => {
        this.axios({
          method: "get",
          url: "communicate/home_rec",
          params: {
            after: this.page,
            size: 10,
          },
        }).then((res) => {
          if (this.rec_list) {
            // 加载状态结束
            this.loading = false;
          }
          this.rec_list.push(...res.data.data.rec_list);
          Toast.clear();
        });

        // // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },

    ClickJump(url, type, announce_id, vote_id) {
      if (type == 6) {
        this.$router.push({ path: url, query: { announce_id } });
      } else if (type == 5) {
        this.$router.push({ path: url, query: { vote_id } });
      } else {
        this.$router.push(url);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -0.24rem;
    right: -0.24rem;
    border-bottom: 1px solid #f8f8f8;
  }
  .header-left {
    width: 40.625rem;
    height: 40.625rem;
    position: relative;
    .avatar {
      width: 27.078rem;
      height: 27.078rem;
      border-radius: 27.078rem;
      overflow: hidden;
      background-color: #f2f2f2;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .header-center {
    flex: 1;
    overflow-x: hidden;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      width: 18.75rem;
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);

      left: 0;
      transform: rotate(180deg);
      text-decoration: inherit;
      vertical-align: inherit;

      box-sizing: inherit;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      width: 18.75rem;
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);

      right: 0;

      text-decoration: inherit;
      vertical-align: inherit;

      box-sizing: inherit;
    }
    .tab {
      display: flex;
      width: 100%;
      overflow-x: auto;
      --webkit-overflow-scrolling: touch;

      .tab-item {
        padding: 0 16.6667rem;
        font-size: 16.6667rem;
        font-weight: 700;
        line-height: 40.625rem;
        color: #999;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .active {
        color: #333;
        position: relative;
        &::after {
          display: block;
          content: "";
          width: 8.328rem;
          height: 2.602rem;
          background: #333;
          border-radius: 2rem;
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }
      }
    }
  }
  .header-right {
    width: 40.625rem;
    height: 40.625rem;
    background: url(https://m.mi.com/static/img/small_bell.88e26cc7bc.png) 50%
      no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
}
.content-list {
  padding: 40.625rem 0;
}
// .content-list {
//   .poster {
//     margin: 20.833rem 12.5rem 0rem;
//     overflow: hidden;
//     border-radius: 8rem;
//   }
// }
// .card {
//   margin-left: 12.5rem;
//   margin-right: 12.5rem;
//   padding-top: 15.625rem;
//   text-align: left;
//   .card-content {
//     margin-bottom: 14.063rem;
//     .normal {
//       .content {
//         font-size: 15.625rem;
//         font-weight: 500;
//         color: #161616;
//         line-height: 30rem;
//         word-wrap: break-word;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         display: -webkit-box;
//         -webkit-box-orient: vertical;
//         -webkit-line-clamp: 2;
//       }
//       .images {
//         display: flex;
//         justify-content: space-between;
//         flex-wrap: wrap;
//         border-radius: 0.14rem;
//         height: 115.102rem;
//         overflow: hidden;
//         position: relative;
//         margin-top: 10.417rem;
//         .image {
//           width: 33%;
//           height: 115.102rem;
//           overflow: hidden;
//           img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }
//         }
//       }
//     }
//     .question {
//       font-size: 15.625rem;
//       color: #333;
//       position: relative;
//       .user-ctrl {
//         width: 20.828rem;
//         height: 20.828rem;
//         background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAQAAAC380bCAAAFNklEQVR42u2c/0+VVRzH7xWQLwqCQeAgES8qQ4uZbkK2pEVtWlrKXFtfcOnYFEmzlpvNNQw1sqar1eZWqWT2A9pc6u5SoPO8P5/zPF3lNhFj2ZKwNCR1uBlpfLk8/aBm2uXen/t4XucveO18nuecz3Pez/F4DAaDwWAw3NW43mCcSnASVUIwzvXeFcoq4dsJ9CDN5hk8vjOhZoRoWX887uMyXqk38Yf0MT7ijVSNJ5DnjvB4hc4uj7fLsQcXMAAXLlwM4gJ9oZ8LZPrjRZY4HqINcHCe+jB0Q3mI+qxu0thmT/PHCyxpeh0tuHpD9t/jD7TxKj1VmPLRe/QCHAije330oglLVKyo4nYKsIfODKs8iEv0AU8+mCRG+MQoegxtuDassgsXh+hplS5GOZDDFfgtorCLo7SuOVeMsp5CL+N8FOU22mL75KzIBVgdVfkkvavy5azIeVRJUQqbvuMa5IlRbhyDedSBUETlRq5QWXIKO9aZjkPoHlY4RFfwqZ6pkyWty9n6FeJ/Npp3jr/oFL/WPlJUV+Uk6il4D13UH6akQ+jmWp7lymojXa8bY83HJ2jD5f+U9EnsojnOWIGdVGeCPY224DgGMIgQQghhkP6kU7RZTTs8SmS/3BATSMH9eNZ6C5/Dz9/Q1/QZ1/JieiCQ4sZI/gyUzkX0DL9EK7BML+AZwTGu7E9BBoPBYDAYDAaDwWAwGAwGg8Hw/yYYF8i0fVTo5FNG+0jhkcaGmEAK8nQxL6bltMaqssvtkmafShWsrZPtEr0ZLehEF7qpi86gBXVcKja+6hRwBe2gVvTePFynEHqplXZalXZuME5cSetkLIEfV8KcLveQ5oXHsoQpB1LsEtqBK2HDE4O4SLt5vjBl5NFmah02J9KHn1DTnC0ouhqM08VoQW/ETNA+mqNS5ZR1Ji9GZ5REEFO1yhGjbPtoObqiRN2OYyNPFKNMhXpNhAjU9Vn+nrY6ctJ9Tr5VRVFmmVr1JkmznGGX0xmK/CyDq5xsMcrtI+2SiG/sIfTTXi7jNDHKrtf2cR2dGFZ5AOe4NpguatOpUrmUdqIHg2HnuAf1/JQbI6q5cL3BOKokjYvUd4fuAHroqF4kbo/t8bheO5cX0m7r9G3K/XQW9XqRymkYKfJrCI3DAtqAL4lxHO3UCsI+ruX5x7LaJQrfpDlblVI1NtJWvYmruCyYLjrM6PF4PP54lapyeKKTzxOdbE67a37oNRgMBoPBYDAYDAaDwWAwGAwiaIjRycF0lUUZarSwQ5nwuF4n0SmwH9HzuJQnB5OE/6N+MIkK9TJsp/04YilqpP28nSq5SOxcN2Xyw7QWh+nW+WMIl3GE3qDZztgGiWcWei7tQDcGbrtDZggD1jkc4FmdCcJ0g0lUiDp0oC/M+fI1dOBtmi1MmcbRCrKGzYlcxTGsbhyjYgW9pbmIFHoiZEUGUI/parQYZU6zn6Qf0R8pEWQ10guC7vuyc7EsarovSG+qCXKe5EJ+Fb9HTfdtE5Tu48lUbUULNJ6gdyTd0JjDL1rnhr3T7bpygNbyeDHKTqJ+1DodNvN1a/jtcsqQ1DtNpV3UEeFO3Yt4PzDJSRS0FbHvxfN0kK6Gi67SEHpJYamwoIyK5TSsx8/UF/a6wrNchUnSuimvO0IV0zpqun19tgatS2jCei4StPO6hT/e9vEqay9+wK9WNy6gm37BSXzFK22fSvBIxPUG4zhNzUQFbeF62ke7UcdLuUilC4+7+VOQp4q5TM/Vj/Ms2xdMqjHXFRoMBoPB4PF4PH8DMOM6OoU7iBYAAAAASUVORK5CYII=)
//           50% no-repeat;
//         background-size: 100% 100%;
//         position: absolute;
//         top: 0;
//         right: 0;
//       }
//       .title {
//         margin-bottom: 6.25rem;
//         max-width: 328.125rem;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         display: -webkit-box;
//         -webkit-box-orient: vertical;
//         -webkit-line-clamp: 2;
//         font-weight: 500;
//         color: #161616;
//         .question-i {
//           display: inline-block;
//           margin-right: 4.167rem;
//           width: 15.102rem;
//           height: 15.102rem;
//           background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAABdFBMVEUAAAD/AAD/////gAD/gID/VVX/gED/ZjP/SST/VTn/VSr/WyT/Wzf/ZjP/YDD/Wi3/USj/Xij/WSb/Zib/VTH/YST/XS7/WSz/VSr/YCr/XCn/WCf/VSb/WyT/WCP/VSL/VSr/Win/WCj/VSf/XSf/WiX/VyT/VSP/VSv/Uyn/VSf/VyX/Vyb/VSr/Vyn/Vyb/Vyn/WCj/Vin/WCb/Vin/Vyj/Vin/VSn/Vij/VSn/Vyn/WCj/VCf/Vir/VSb/Vyn/VSj/Vif/VSn/Uyj/Vij/Vyj/VSf/Vin/Vib/VCn/VSj/Vib/Vij/Vif/Vif/VSn/Vij/Vyj/Vin/VSf/VSj/Vij/VSf/Vin/VSj/VCn/Vij/VCj/Vif/Vij/Vij/VSf/VSn/VSj/VSj/VSn/VSn/Vin/VCj/VSj/VSf/VSj/VSj/VSj/VSn/VSj/VSj+VCj/VSj/VSj/VSj/VSj/VSj/VSj/VSj/VSj/VSj/VSj+VCj/VSh+rrY9AAAAenRSTlMAAQECAgMEBQcJDA4ODxARExMUFBUVFhcYGBkaGxwdHh4fICEhIiMkJCUnKS8wMjU4Oj5DREZKS01RWFpbXF1eYGJjZWVmaXFzdnh5eXyChIWHiZaZoaKjpaamp6m3uLy8xsjI1tbX2Nzg6+3v8PHy8vP09vf4+fr9/jKoXmsAAAGOSURBVEjH1dVpVwFRGMDxa2coe5ibSkUqlRZp31Mq7aQ9bdJeCN0v30Uxcw7mmZf93805v/OcmTGeixBNotJaWVw/h4lRStBvqmYHFsqmk5exugUDYs2K0mQQphnpdEkzEGOWoaMdUI0tCqTF8NTIKkLrECtC6xHnYvAy0FgbODpwRx7Gndi/tsFvqKYOJkn+ehgvPRN+czW1c/mD5BMuoMZ4J0ueQv71TU7J+rrtILHYyn+wq3o6HIl4fU4M1O+EFO+ek7Be3a8U9grq8+rLuPVBdCZNyxSAen6KNvsJ1N3FK9fLP9PfImfvbdN2M0At7tcRpycC5UY6BPVWPN4O/2I7PR7u931DyEwDXfmXut3uLs9YiqQna+o3nh6InhxFz+7zJDUKmN3zWH4x+dPemvq1UODe8UUul/vKpo/7uLuqupAPYzGuDoRWFqaD/fw9aBKxNRnEwDGrQkobWBtlSKKDbnC7hp5pcjNQN0mLR6DCCJluL2M6nbEIPqBRI/07upFCrdMb6qdnVLKS+wFqZEJxW6nLUgAAAABJRU5ErkJggg==)
//             no-repeat;
//           background-size: contain;
//           transform: translateY(0.04rem);
//         }
//       }
//       .moment-tags {
//         max-height: 33.328rem;
//         overflow: hidden;
//         .tags-item {
//           margin: 0rem 7.292rem 9.375rem 0rem;
//           padding: 4.688rem;

//           display: flex;
//           align-items: center;

//           max-width: 328.125rem;
//           font-weight: 500;
//           color: #757575;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;

//           .icon {
//             width: 14.578rem;
//             height: 14.578rem;
//             margin-right: 3.646rem;
//           }
//           span {
//             font-weight: 500;
//             color: #757575;
//             font-size: 14.5833rem;
//           }
//         }
//       }
//       .line {
//         margin-bottom: 11.979rem;
//         display: block;
//         height: 0;
//         border-bottom: 1px solid hsla(0, 0%, 92%, 0.6);
//       }
//       .answers {
//         .answers-item {
//           display: flex;
//           margin-bottom: 10.417rem;
//           line-height: 16.66rem;
//           font-size: 14.5833rem;
//           color: #000;
//           .icon {
//             margin-right: 8.333rem;
//             width: 16.664rem;
//             height: 16.664rem;
//             border-radius: 50%;
//             overflow: hidden;
//           }
//           p {
//             max-width: 302.078rem;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             display: -webkit-box;
//             -webkit-box-orient: vertical;
//             -webkit-line-clamp: 1;
//           }
//         }
//       }
//     }
//   }
//   .card-ctrl {
//     padding-bottom: 10.417rem;
//     display: flex;
//     justify-content: space-around;
//     .shar-btn {
//       width: 20.828rem;
//       height: 20.828rem;
//       background: url(https://m.mi.com/static/img/m_b_share.ac01313399.png)
//         no-repeat;
//       background-size: contain;
//     }
//     .send-btn {
//       width: 20.828rem;
//       height: 20.828rem;
//       background: url(https://m.mi.com/static/img/m_b_msg.1f9f89973f.png)
//         no-repeat;
//       background-size: contain;
//       position: relative;
//     }
//     .praise-btn {
//       width: 20.828rem;
//       height: 20.828rem;
//       background: url(https://m.mi.com/static/img/m_b_msg.1f9f89973f.png)
//         no-repeat;
//       background-size: contain;
//       position: relative;
//     }
//     .name {
//       width: 52.078rem;
//       position: absolute;
//       left: calc(100% + 0.03rem);
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 12.5rem;
//       font-family: DIN-Medium, DIN;
//       font-weight: 500;
//       color: #757575;
//     }
//   }
//   .user {
//     margin-bottom: 10.417rem;
//     display: flex;
//     align-items: center;
//     .user-avatar {
//       margin-right: 8.33rem;
//       width: 27.078rem;
//       height: 27.078rem;
//       border-radius: 27.078rem;
//       overflow: hidden;
//     }
//     .user-info {
//       flex: 1;
//       .user-info-name {
//         font-size: 12.5rem;
//         font-weight: 500;
//         color: #161616;
//         line-height: 17.5rem;
//       }
//     }
//     .user-ctrl {
//       margin-left: 5.208rem;
//       width: 20.828rem;
//       height: 20.828rem;
//       background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAQAAAC380bCAAAFNklEQVR42u2c/0+VVRzH7xWQLwqCQeAgES8qQ4uZbkK2pEVtWlrKXFtfcOnYFEmzlpvNNQw1sqar1eZWqWT2A9pc6u5SoPO8P5/zPF3lNhFj2ZKwNCR1uBlpfLk8/aBm2uXen/t4XucveO18nuecz3Pez/F4DAaDwWAw3NW43mCcSnASVUIwzvXeFcoq4dsJ9CDN5hk8vjOhZoRoWX887uMyXqk38Yf0MT7ijVSNJ5DnjvB4hc4uj7fLsQcXMAAXLlwM4gJ9oZ8LZPrjRZY4HqINcHCe+jB0Q3mI+qxu0thmT/PHCyxpeh0tuHpD9t/jD7TxKj1VmPLRe/QCHAije330oglLVKyo4nYKsIfODKs8iEv0AU8+mCRG+MQoegxtuDassgsXh+hplS5GOZDDFfgtorCLo7SuOVeMsp5CL+N8FOU22mL75KzIBVgdVfkkvavy5azIeVRJUQqbvuMa5IlRbhyDedSBUETlRq5QWXIKO9aZjkPoHlY4RFfwqZ6pkyWty9n6FeJ/Npp3jr/oFL/WPlJUV+Uk6il4D13UH6akQ+jmWp7lymojXa8bY83HJ2jD5f+U9EnsojnOWIGdVGeCPY224DgGMIgQQghhkP6kU7RZTTs8SmS/3BATSMH9eNZ6C5/Dz9/Q1/QZ1/JieiCQ4sZI/gyUzkX0DL9EK7BML+AZwTGu7E9BBoPBYDAYDAaDwWAwGAwGg8Hw/yYYF8i0fVTo5FNG+0jhkcaGmEAK8nQxL6bltMaqssvtkmafShWsrZPtEr0ZLehEF7qpi86gBXVcKja+6hRwBe2gVvTePFynEHqplXZalXZuME5cSetkLIEfV8KcLveQ5oXHsoQpB1LsEtqBK2HDE4O4SLt5vjBl5NFmah02J9KHn1DTnC0ouhqM08VoQW/ETNA+mqNS5ZR1Ji9GZ5REEFO1yhGjbPtoObqiRN2OYyNPFKNMhXpNhAjU9Vn+nrY6ctJ9Tr5VRVFmmVr1JkmznGGX0xmK/CyDq5xsMcrtI+2SiG/sIfTTXi7jNDHKrtf2cR2dGFZ5AOe4NpguatOpUrmUdqIHg2HnuAf1/JQbI6q5cL3BOKokjYvUd4fuAHroqF4kbo/t8bheO5cX0m7r9G3K/XQW9XqRymkYKfJrCI3DAtqAL4lxHO3UCsI+ruX5x7LaJQrfpDlblVI1NtJWvYmruCyYLjrM6PF4PP54lapyeKKTzxOdbE67a37oNRgMBoPBYDAYDAaDwWAwGAwiaIjRycF0lUUZarSwQ5nwuF4n0SmwH9HzuJQnB5OE/6N+MIkK9TJsp/04YilqpP28nSq5SOxcN2Xyw7QWh+nW+WMIl3GE3qDZztgGiWcWei7tQDcGbrtDZggD1jkc4FmdCcJ0g0lUiDp0oC/M+fI1dOBtmi1MmcbRCrKGzYlcxTGsbhyjYgW9pbmIFHoiZEUGUI/parQYZU6zn6Qf0R8pEWQ10guC7vuyc7EsarovSG+qCXKe5EJ+Fb9HTfdtE5Tu48lUbUULNJ6gdyTd0JjDL1rnhr3T7bpygNbyeDHKTqJ+1DodNvN1a/jtcsqQ1DtNpV3UEeFO3Yt4PzDJSRS0FbHvxfN0kK6Gi67SEHpJYamwoIyK5TSsx8/UF/a6wrNchUnSuimvO0IV0zpqun19tgatS2jCei4StPO6hT/e9vEqay9+wK9WNy6gm37BSXzFK22fSvBIxPUG4zhNzUQFbeF62ke7UcdLuUilC4+7+VOQp4q5TM/Vj/Ms2xdMqjHXFRoMBoPB4PF4PH8DMOM6OoU7iBYAAAAASUVORK5CYII=)
//         50% no-repeat;
//       background-size: 100% 100%;
//     }
//   }
//   .moment-tags {
//     max-height: 31.25rem;
//     overflow: hidden;
//     .tags-item {
//       float: left;
//       display: flex;
//       align-items: center;
//       padding: 4.688rem;
//       margin-right: 7.292rem;
//       max-width: 157.469rem;
//       margin-bottom: 9.375rem;
//       line-height: 12.5rem;
//       // background: #f6f6f6;
//       border-radius: 5rem;
//       font-size: 12.5rem;
//       font-weight: 500;
//       color: #757575;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       .icon {
//         width: auto;
//         height: 12.5rem;
//         float: left;
//         margin-right: 3.646rem;
//         width: 12.5rem;
//         height: 12.5rem;
//       }
//       span {
//         font-size: 12.5rem;
//         font-weight: 500;
//         color: #757575;
//         line-height: 12.5rem;
//       }
//     }
//   }
//   .card-message {
//     padding: 8.333rem;
//     margin-bottom: 7.292rem;
//     background: #f6f6f6;
//     border-radius: 5rem;
//     .card-message-item {
//       font-size: 13.5417rem;
//       font-weight: 400;
//       color: #161616;
//       line-height: 18.14rem;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       display: -webkit-box;
//       -webkit-box-orient: vertical;
//       -webkit-line-clamp: 3;
//       .name {
//         color: #757575;
//       }
//     }
//   }
//   &::after {
//     margin-left: -12.5rem;
//     margin-right: -12.5rem;
//     display: block;
//     content: "";
//     border-bottom: 6.25rem solid #f6f6f6;
//   }
// }
</style>