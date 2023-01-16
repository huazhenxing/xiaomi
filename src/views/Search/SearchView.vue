<template>
  <div class="app-search-page app-view">
    <div class="app-search-head">
      <!-- 搜索 -->
      <div class="app-search">
        <!-- 点击返回 -->
        <div class="header-btn-left" @click="clickReturn">
          <i class="image-icons"></i>
        </div>
        <!-- 搜索框 -->
        <van-search
          v-model="value"
          show-action
          placeholder="搜索商品名称"
          left-icon=""
          @search="onSearch(value)"
        >
          <!-- 搜索按钮 -->
          <template #action>
            <div class="header-btn-right" @click="onSearch(value)">
              <i class="image-icons"></i>
            </div>
          </template>
        </van-search>
      </div>
      <!-- 搜索列表 -->
      <ul class="search-key-list" v-if="isShow">
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="commodityList(item.title, '/search/list')"
        >
          <div class="item">
            <span class="txt">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="content">
      <!-- 搜索历史 -->
      <div
        class="history"
        style="margin-bottom: 31.25rem"
        v-if="historicalRecord.length > 0"
      >
        <div class="title">
          <span>搜索历史</span>
          <i @click="Dialog">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAADgUlEQVRYR+3Z28vmUxQH8M/MMA6JGIfEpEmOMykXoygkh2JqmpLzTLlQuGBC0cwfQAqFCy7mQjlOQtTQDBKKIik5S3LKMRrCOM3oO+1Hr6fn9z6//Zv3974unlW/notn77W+e+21117ru+epl3k4CMeVb48KFb/jvfJ9hx0Vc8VwrZyMm3Ea5tdOxna8hPV4tWZ+LdiD8QjOqDHSMPYFXIxv2+qqBXsqHsLh+Akv4oe2xnAATse++AKX4uW282vBnoIHcQQexVX4sa0x7I97cQE+xWV4pe38WrB7YwWW4im8WXlIYu9ErMQ72IRf+wIbvTGYLwelq+RgJhN0ygbZ1htwQlfrPc57C7cnbAZhcAXuxp49Gu2qehuuwYYB2HNwHw7tqrHHeV/hcmyZesCORL7/m3yMfJ1usDlbTFPqWoz98PYcIFuGrfh82PYosCeVWyohsRZ3zSLga3Fn2fbcbq9NtT0K7CV4oBQpz+C8WQT7NM4tOXw1Hh4HNoPuL4Oew9mzCPZZnFXsrSlO+9f8KM9OwLbcnd49uwS/4esxgBZhn3LKm+qKXsFeVLLFZ6VcfKMB8LHYjL9xPZ5sKGJ6BbsRFxYQqW03NIBNkXRb+S+p6Ub8MWJsr2CfwKpi9OpSWI/Cu670bfnvHlyHNI/DMgE78MjEs31dChPP9uXZtqkruTV9VGTOUlf6/hhP7XnlcEk3JS+l/c7C9ipp6/GG7rjX1LVbYVdyM/08TXueginFfH4z7q+Gy6NXsC3rk9bDJmBbu6pyYLVnc2jSKSS+ni+dQhXNUwlwMDz2AvbMUpGlUwgJOG2ncH5pJ8LOhI5MT/RLRwA101LrpgcLrRoWJh3LY+PAZmVZ0SGFTg89GcavbwkzGRo19P83hQ7Nzk7r2bTg6SqXlzIuCT2c6q6whuMWGlYx9fAdyBvF60iXvZOJmRonw4p2x62FM4iS94uisNx9SdjwOCQdRZySi+Ym/DkObP4/qhyuMDORD0vRHI9ni2ZKEmrxYAr3o4vS3IYJxY+GjTTRRwOGOgcsbHckqwwln/jNe8CuhEV2LO8SidNQ99nNSFjwHLCRjPo4mj6U/C04Hgtmyp0j9OS6fhdpf0Ldj5RxYAMwbHiegJLCjsHCGQSdpvEDhKbKk1VY7gDvBHYwKSf0QByG8AR5D+vyYDfQlxDK+9cn+BLfNzSQ/wH9D912ATugfSf4AAAAAElFTkSuQmCC"
              alt=""
            />
          </i>
        </div>
        <div class="buttons_out scroll">
          <div class="buttons_in">
            <span
              v-for="(item, index) in historicalRecord"
              :key="index"
              @click="commodityList(item.texts, '/search/list')"
              >{{ item.texts }}</span
            >
          </div>
        </div>
      </div>
      <!-- 搜索发现 -->
      <div class="tabs">
        <ul class="tab">
          <li>搜索发现</li>
        </ul>
      </div>
      <div class="discovery">
        <div v-for="item in discover_list" :key="item.id">
          <span @click="commodityList(item.desc, '/search/list')">{{
            item.desc
          }}</span>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Dialog } from "vant";
Vue.use(Search);
Vue.use(Dialog);

export default {
  name: "SearchView",
  data() {
    return {
      discover_list: null, //搜索发现数据
      list: null, //搜索列表数据
      value: "", //输入值
      isShow: false, //是否显示搜索列表
      timer: null, //定时器
      historicalRecord:
        JSON.parse(window.localStorage.getItem("historicalRecord")) || [], //历史记录
    };
  },

  created() {
    this.axios({
      method: "get",
      url: "hisearch/se_default",
    }).then((res) => {
      this.discover_list = res ? res.data.data.discover_list : [];
    });
  },

  watch: {
    value() {
      clearTimeout(this.timer); //清除上一次定时器
      if (this.value == "") {
        this.isShow = false;
      }
      this.timer = setTimeout(() => {
        if (this.value !== "") {
          this.isShow = true;
          this.axios({
            method: "get",
            url: "hisearch/suggestion_v3",
            params: {
              query: this.value,
            },
          }).then((res) => {
            this.list = res.data.data.list;
          });
        }
      }, 500);
    },
    //本地存储
    historicalRecord: function (newValue) {
      window.localStorage.setItem("historicalRecord", JSON.stringify(newValue));
    },
  },

  methods: {
    Dialog() {
      Dialog.confirm({
        title: "是否删除所有历史记录？",
      })
        .then(() => {
          // on confirm
          this.historicalRecord = [];
        })
        .catch(() => {
          // on cancel
        });
    },

    onSearch(value) {
      //回车内容为空
      if (value == "") {
        return;
      }
      this.value = value;

      let texts = this.value;
      //过滤重复
      this.historicalRecord = this.historicalRecord.filter(
        (m) => m.texts !== texts
      );
      //本地存储
      this.historicalRecord.unshift({
        id: Date.now(),
        texts: texts,
      });
    },

    commodityList(str, url) {
      this.value = str;
      this.isShow = true;
      this.$router.push({ path: url, query: { key: str } });
    },

    clickReturn() {
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="scss" scoped>
.app-search-page {
  background: #fff;
  color: #3c3c3c;
  .app-search-head {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    background: #f2f2f2;
    .app-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 41.667rem;
      width: 100%;
      .header-btn-left {
        display: block;
        margin: 0 8rem;
        color: #666;
        .image-icons {
          width: 26.039rem;
          height: 26.039rem;
          display: block;

          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
        }
      }
      .search-item {
        background: #fff;
        flex: 1;
        border: 1px solid #e5e5e5;

        input {
          border-radius: 2rem;
          padding: 0rem 0rem 0rem 10.417rem;
          outline: 0;
          font-size: 15.5rem;
          font-weight: 400;
          height: 24.039rem;
          line-height: normal;
        }
      }
      .header-btn-right {
        display: block;
        color: #666;
        .image-icons {
          display: block;
          width: 31.25rem;
          height: 31.25rem;
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAEx0lEQVQYGe3Bf0yUdRwH8I9GpBtZVpul0y1/ZD8sKzdXbupMh3Pq0jWtzbVs9YfL8scfLq02h1m52R3c832+z/d5HrjjAOH4KQhy4MQD4eS4gXiCePLjBIwU8VeCOAPy3dZf/mEpz56zW93rRRQVFRUVFfU/dGFM+UTHlOrXzq/yf9HwefeS0plpk4/F0b+je5x/UZXIPZV+URmRwMEhQfs940K+ry6hYTY9Wu0Tyze6yxVYwSGgQoUKFSpUCMiwwH6zPLVqZVcsPRrlSwvqVVghwMGhQYMOHTp0aNDAIcBhhQ53UcWLFH4127QrElQwqEi7keUu21W/vnl5+/y2dwKraj8p3pdZ7bzDIYNDQmqweQWFU/cTpU4GAQUMro6SbR2z6D4aFuRb0m4yqFCgDXq3U7hciynOSYQOBertgr2np9I/ODHPlSlDg4AN3m8oPKq+t0GHguSexg/ogepjPbvZkIACbci3lsx3Yr06rECGvSO4gB6SbxMb5pBhDwZeInN1vWJvY5DB+5uX0ShUfmeDAhtKCkOxZCZPogUCMo5vpFEJxRSkcKiQ0BBP5gnMSu+RIaGokEatc2ZqSEBCqasnhszi32SFgBYKLiQDqnfI0CAGz79B5uibkOOVIZCXTob0TrK3qeA4tpfM0TmPQYO427CBDHLrDAoO+H+LITM0r+VQkRy88DwZFFiXBAWOS73PkRl8WzgU5JVVjyeDQi+LPhmOW63zyAxH9yvgKE31jCGDKqZltTPYh+rXkBmKXAIyKpLIsJpn8hskpMDzJZmhKFuAoXIfGeaPO+i1IQXHtpIZPHsVyCgXZJhnUm6TBPtI3UdkBv9mDo5DOVUxZFDpjAO/yHDcCcSTGVreZxDI8F58kgxqelMe5LD3h+aQGbrnsBENYrDjbTKobnMSFLh8A7Fkhpa4Ao8MgcpdZEjTuAI3h4DnRzJLYEMiODKPX3qKDAjOF30a+N3gYjJLz+SMs0lQUL2ZDDiYqkDCQffFcWSeih8sYEht/HUqjVJgjehTIOH0CjJT99QDbRJsKCxtG0+j0PWqvUOGFYdzyGxnlyVf5ZCQ9xM9tJPP5jbaIMEZ7J5B5jv6FR/iUPsP778eRw+hc4ajhEGBs+NkPIXDmTFuRyI4FBSW9EyhB2h9N+O0AgEFR5MoXK49XilzMDBktBZ+Fnia/oZ/ev6elKscAioUOEPtCyl8POucfRwSZOTVunZWxg9MoHtcnuxek5mQE7JBhoAODQIStBttCyh8OubmHEke4LBAhXM4uykt35mWb8212bPSi7M6nX9wWCGQfL2M9U73JjBw2KBfbl1M4VPxmG9tdl76gA0WWCBBhQYNKiRY8TMYMnuzXdVL6S/H90hQwGHvObeEwiv4Vpn1UG1ea9ZV510dOhxIG8npOnykNKF5Lt2jZjeDCgXJl4PLKdx6xja+4Hm94D3Hh471rhXFi+qm0X3UfMsgwKDeOreUIoP3awYFEsTNs8soMnh3MnAw6FdallNkOLGLQUBBcl/LSooMtTtkqODQBlpWU2TwbZGhgEG5fWY1RQbfVhkcDKK/eTVFhtrtMjg49Butiygy+LfKEOAodlKkCHyq94vhUx9T5GiYXjn73FiKioqKior6z/oTCs8KMOW0P6QAAAAASUVORK5CYII=);
        }
      }
    }
  }
  .search-key-list {
    text-align: left;
    position: fixed;
    top: 41.66rem;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    li {
      background: #fff;
      list-style: none;
      .item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        margin: 0 16.667rem;
        display: flex;
        height: 48.477rem;
        .txt {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          height: 49.477rem;
          font-size: 14.5833rem;
          line-height: 49.477rem;
          white-space: nowrap;
          color: #333;
        }
      }
    }
  }
  .content {
    padding: 20.833rem 16.667rem;
    text-align: left;
    .history {
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14.5833rem;
        font-weight: 700;
        i {
          display: inline-block;
          img {
            width: 14.578rem;
            height: 14.578rem;
          }
        }
      }
      .scroll {
        max-height: 42.5rem;
      }
      .buttons_out {
        margin-top: 4.167rem;
        margin-right: -12.5rem;
        overflow: hidden;
        .buttons_in {
          span {
            vertical-align: bottom;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 375rem;
            margin-top: 12.5rem;
            margin-right: 12.5rem;
            display: inline-block;
            padding: 7.813rem 12.5rem;
            background: rgba(0, 0, 0, 0.04);
            font-size: 12.5rem;
            border-radius: 15rem;
          }
        }
      }
    }
    .tabs {
      font-size: 14.5833rem;
      line-height: 14.5833rem;
      font-weight: 700;
      margin-bottom: 16.667rem;
      .tab {
        vertical-align: text-top;
        display: inline-block;
        text-align: center;
        margin-right: 31.25rem;
        border: none;
      }
    }
    .discovery {
      padding-left: 12.5rem;
      div {
        display: inline-flex;
        align-items: center;
        width: 50%;
        margin-bottom: 18.229rem;
        font-size: 12.5rem;
        span {
          display: inline-block;
          // max-width: 150rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  ::v-deep .van-search--show-action {
    flex: 1;
    padding: 0;
    background: 0;
  }
  ::v-deep .van-search__content {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    height: 24.039rem;
    display: flex;
    align-items: center;
  }
}
.app-view {
  padding-top: 41.667rem;
}
</style>