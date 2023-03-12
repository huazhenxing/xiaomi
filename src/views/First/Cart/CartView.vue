<template>
  <div class="app-shell">
    <header class="app-shell-header">
      <div class="app-header-left" @click="clickReturn">
        <div class="app-header-item" href="">
          <i class="image-icons app-header-icon icon-back"></i>
        </div>
      </div>
      <div class="app-header-middle">
        <div class="app-header-title">购物车</div>
      </div>
      <div class="app-header-right" @click="JumpView(`/search`)">
        <div class="app-header-item" href="">
          <i class="image-icons app-header-icon icon-back"></i>
        </div>
      </div>
    </header>

    <div class="app-view app-view-with-header app-view-with-footer">
      <div class="point-box">
        <div class="point">
          <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
        </div>
        <div class="ui-line"></div>

        <div class="page-wrap">

          <div class="nologin" @click="goLoginView(`/fe/service/login/phone`)" v-if="!token">
            <div href="" class="box-flex">
              <span class="flex">登录后享受更多优惠</span>
              <em class="flex">去登录</em>
            </div>
          </div>

          <!-- 商品为空 -->
          <div class="noitems" v-if="!cartCommodityList.length > 0">
            <div class="router-link-active">
              <span>购物车还是空的</span>
              <em @click="JumpHomeView('/')">去逛逛</em>
            </div>
          </div>
          <!-- 商品不为空 -->
          <div class="cart-list">
            <ol>
              <li class="item" v-for="(item, index) in cartCommodityList" :key="index">
                <div class="ui-flex justify-center">
                  <!-- 是否选中该商品 checked选中 unchecked没选中-->
                  <div :class="['choose', item.state ? 'checked' : 'unchecked']" @click="clickIsSelect(index)"></div>
                  <div class="imgProduct" @click="JumpView(`/commodity/detail/${item.product_id}`)">
                    <img :src="item.img_url" alt="" />
                  </div>
                  <div class="info">
                    <div class="item-text ui-flex align-start">
                      <div class="name">{{ item.name }}</div>
                    </div>

                    <div class="price-without">
                      <span>售价：</span>
                      <span class="mr-10">{{ item.price }}元</span>
                    </div>

                    <div class="num">
                      <div class="xm-input-number">
                        <!-- - -->
                        <div class="input-sub" @click="clickIncrement(index)">
                          <i class="image-icons icon-line"></i>
                        </div>
                        <!-- 数量 -->
                        <div class="input-num">
                          <span>{{ item.goods_count }}</span>
                        </div>
                        <!-- + -->
                        <div class="input-sub" @click="clickDecrement(index)">
                          <i class="image-icons icon-cross"></i>
                        </div>
                      </div>
                      <!-- 删除 -->
                      <div class="delete" @click="clickDelete(index)">
                        <i class="image-icons icon-delete"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="append flex">
                  <div class="insurance">
                    <div class="i1">
                      <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1653393475.27699056.png"
                        alt="" />
                    </div>
                    <div class="i2">
                      <span>小米手环7 夜跃黑</span>
                      <em> 199元</em>
                    </div>
                    <div class="i3">
                      <span>加价购</span>
                    </div>
                  </div>
                </div> -->
                <div class="ui-line"></div>
              </li>

              <!-- <li class="item">
                <div class="batch flex">
                  <div class="batch-item">
                    <div class="batch-img">
                      <img
                        src="https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210141727_2190039c023ca0e27b8796ff0cc87a64.png"
                        alt=""
                      />
                    </div>
                    <div class="batch-name align-center">
                      <p>
                        <span class="gift-tag">赠品</span>
                        <span class="gift-name">Xiaomi Watch S1 皮质表带</span>
                        <span> x 1</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="ui-line"></div>
              </li> -->
            </ol>
          </div>

          <!-- 商品推荐 -->
          <RecommendCommodity />
        </div>

        <!-- 提交订单 -->
        <div class="bottom-submit" v-if="cartCommodityList.length > 0">
          <div class="box-flex">
            <div class="price-box">
              <div class="quantity">
                <span>共{{ quantity }}件 金额：</span>
              </div>
              <div class="amount">
                <strong>{{ amount }}</strong>
                <span>元</span>
                <div class="info">
                  <span>明细</span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAALCAYAAAByF90EAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAACwAAAAD3WUemAAAArklEQVQoFY2SURLCIAxEN71d9QTWv47HsvzpDRyPlyaBOFCgyAyFJrsPkoGYQbhjho4XvkRg2w8+lY8XXMT6Sb6ANx4jmEEWPMWzmo9wnQ4HrxCBCQ8J/60gKTFpObIPLpS1C+tAgrVEAV1BVuZIQ36TM6Fp8p5EU9HPH0hzXVg0xsY2IBoqQBrowDTlo7iJByuQJk5gTYjDmqvC+IZNJqe52QFNdaO0XGfGP1/9DjV5XZX36WcFAAAAAElFTkSuQmCC"
                    alt="" />
                </div>
              </div>
            </div>
            <div class="btn-box">
              <div class="btn disable" @click="JumpView(`/category`)">
                继续购物
              </div>
              <div class="btn" @click="getPayment(`/order/checkout`)">去结算</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import RecommendCommodity from "@/components/RecommendCommodity.vue";
import Vue from 'vue';
import { Dialog } from 'vant';
export default {
  name: "CartView",
  components: {
    RecommendCommodity
  },
  data() {
    return {
      img_url: null, //商品推荐照片
      recom_list: null, //商品推荐数据
      token: JSON.parse(window.localStorage.getItem('token')) || null
    };
  },

  created() {
    //推荐
    this.axios.get("cart_recom").then((res) => {
      this.img_url = res.data.data.header.body.items[0].img_url;
      this.recom_list = res.data.data.recom_list;
    });
  },

  mounted() { },

  methods: {
    JumpHomeView(path) {
      this.$router.push(path);
    },
    JumpView(path) {
      this.$router.push(path);
    },
    //点击返回上一级
    clickReturn() {
      this.$router.go(-1);
    },

    //点击去结算
    getPayment(path) {
      if (this.quantity > 0) {
        this.$router.push(path);
      } else {
        Dialog.alert({
          message: '请勾选需要结算的商品',
        }).then(() => {
          // on close
        });
      }
    },

    goLoginView(path) {
      this.$router.push(path);
    },

    //借助mapMutations生成对应的方法，方法中调用commit去联系mutations(对象写法)
    // ...mapMutations({yy:'XX'})
    //借助mapActions生成对应的方法，方法中调用commit去联系actions(对象写法)
    // ...mapActions({xx:'yy'})
    ...mapMutations({ clickIsSelect: "IS_SELECT", clickDelete: "DELETE" }),
    ...mapActions({ clickDecrement: "decrement", clickIncrement: "increment" }),
  },

  computed: {
    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({ y: "x" }),
    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    // ...mapState([x]),
    //借助mapGetters生成计算属性，从getters中读取数据。（对象写法）
    // ...mapGetters({ y: "x" }),
    //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
    // ...mapGetters(["x"]),

    ...mapState(["cartCommodityList"]),
    ...mapGetters(["quantity", "amount"]),
  },

  watch: {
  },
};
</script>

<style lang="scss" scoped>
.app-shell {
  .app-shell-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #f2f2f2;
    color: #666;
    padding: 0;
    transition: transform 0.2s ease-out;

    position: fixed;
    z-index: 9999;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 375rem;

    .app-header-left {
      display: flex;
      align-items: center;

      .app-header-item {
        width: 31.25rem;
        margin: 0 10.417rem;

        .app-header-icon {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
          width: 26.039rem;
          height: 26.039rem;
          display: block;

          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          overflow: hidden;
        }
      }
    }

    .app-header-middle {
      flex: 1;
      font-size: 15.625rem;
      min-width: 0;

      .app-header-title {
        color: rgb(102, 102, 102);
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
      }
    }

    .app-header-right {
      display: flex;
      align-items: center;

      .app-header-item {
        width: 31.25rem;
        margin: 0 10.417rem;

        .app-header-icon {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAEx0lEQVQYGe3Bf0yUdRwH8I9GpBtZVpul0y1/ZD8sKzdXbupMh3Pq0jWtzbVs9YfL8scfLq02h1m52R3c832+z/d5HrjjAOH4KQhy4MQD4eS4gXiCePLjBIwU8VeCOAPy3dZf/mEpz56zW93rRRQVFRUVFfU/dGFM+UTHlOrXzq/yf9HwefeS0plpk4/F0b+je5x/UZXIPZV+URmRwMEhQfs940K+ry6hYTY9Wu0Tyze6yxVYwSGgQoUKFSpUCMiwwH6zPLVqZVcsPRrlSwvqVVghwMGhQYMOHTp0aNDAIcBhhQ53UcWLFH4127QrElQwqEi7keUu21W/vnl5+/y2dwKraj8p3pdZ7bzDIYNDQmqweQWFU/cTpU4GAQUMro6SbR2z6D4aFuRb0m4yqFCgDXq3U7hciynOSYQOBertgr2np9I/ODHPlSlDg4AN3m8oPKq+t0GHguSexg/ogepjPbvZkIACbci3lsx3Yr06rECGvSO4gB6SbxMb5pBhDwZeInN1vWJvY5DB+5uX0ShUfmeDAhtKCkOxZCZPogUCMo5vpFEJxRSkcKiQ0BBP5gnMSu+RIaGokEatc2ZqSEBCqasnhszi32SFgBYKLiQDqnfI0CAGz79B5uibkOOVIZCXTob0TrK3qeA4tpfM0TmPQYO427CBDHLrDAoO+H+LITM0r+VQkRy88DwZFFiXBAWOS73PkRl8WzgU5JVVjyeDQi+LPhmOW63zyAxH9yvgKE31jCGDKqZltTPYh+rXkBmKXAIyKpLIsJpn8hskpMDzJZmhKFuAoXIfGeaPO+i1IQXHtpIZPHsVyCgXZJhnUm6TBPtI3UdkBv9mDo5DOVUxZFDpjAO/yHDcCcSTGVreZxDI8F58kgxqelMe5LD3h+aQGbrnsBENYrDjbTKobnMSFLh8A7Fkhpa4Ao8MgcpdZEjTuAI3h4DnRzJLYEMiODKPX3qKDAjOF30a+N3gYjJLz+SMs0lQUL2ZDDiYqkDCQffFcWSeih8sYEht/HUqjVJgjehTIOH0CjJT99QDbRJsKCxtG0+j0PWqvUOGFYdzyGxnlyVf5ZCQ9xM9tJPP5jbaIMEZ7J5B5jv6FR/iUPsP778eRw+hc4ajhEGBs+NkPIXDmTFuRyI4FBSW9EyhB2h9N+O0AgEFR5MoXK49XilzMDBktBZ+Fnia/oZ/ev6elKscAioUOEPtCyl8POucfRwSZOTVunZWxg9MoHtcnuxek5mQE7JBhoAODQIStBttCyh8OubmHEke4LBAhXM4uykt35mWb8212bPSi7M6nX9wWCGQfL2M9U73JjBw2KBfbl1M4VPxmG9tdl76gA0WWCBBhQYNKiRY8TMYMnuzXdVL6S/H90hQwGHvObeEwiv4Vpn1UG1ea9ZV510dOhxIG8npOnykNKF5Lt2jZjeDCgXJl4PLKdx6xja+4Hm94D3Hh471rhXFi+qm0X3UfMsgwKDeOreUIoP3awYFEsTNs8soMnh3MnAw6FdallNkOLGLQUBBcl/LSooMtTtkqODQBlpWU2TwbZGhgEG5fWY1RQbfVhkcDKK/eTVFhtrtMjg49Butiygy+LfKEOAodlKkCHyq94vhUx9T5GiYXjn73FiKioqKior6z/oTCs8KMOW0P6QAAAAASUVORK5CYII=);

          width: 26.039rem;
          height: 26.039rem;
          display: block;

          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          overflow: hidden;
        }
      }
    }
  }

  .app-view {
    background: #fff;
    color: #3c3c3c;

    .point-box {
      background: #fff;

      .point {
        font-size: 12rem;
        color: #000;
        padding: 10.417rem 15.625rem;
        text-align: left;
      }
    }

    .ui-line {
      height: 10.414rem;
      background: #f5f5f5;
      overflow: hidden;
      clear: both;
    }

    .page-wrap {
      .nologin {
        .box-flex {
          height: 54.164rem;
          padding: 0 29.167rem 0 16.667rem;
          color: rgba(0, 0, 0, 0.54);
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          justify-content: space-between;

          position: relative;

          span {
            font-size: 16.6667rem;
            color: rgba(0, 0, 0, 0.87);
            display: block;
            text-align: left;
          }

          em {
            font-style: normal;
            font-size: 12.5rem;
            text-align: right;
          }

          &::after {
            content: "";
            position: absolute;
            right: 16.667rem;
            top: 50%;
            width: 8.375rem;
            height: 8.375rem;
            border-left: 1px solid currentColor;
            border-top: 1px solid currentColor;
            transform: translate3d(0, -50%, 0) rotate(135deg);
            -webkit-transform: translate3d(0, -50%, 0) rotate(135deg);
          }
        }
      }

      .noitems {
        background: #ebebeb;
        padding: 10.417rem;

        .router-link-active {
          font-size: 12.5rem;
          text-decoration: none;
          text-align: center;

          span {
            display: inline-block;
            line-height: 41.664rem;
            background: url(https://m.mi.com/static/img/cartnull.daaf7926f8.png) no-repeat 0;
            background-size: auto 100%;
            padding: 0 8.333rem 0 50rem;
            color: rgba(0, 0, 0, 0.27);
          }

          em {
            display: inline-block;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-sizing: border-box;
            height: 24.039rem;
            line-height: 24.039rem;
            padding: 0 12.5rem;
            color: rgba(0, 0, 0, 0.87);
            font-style: normal;
          }
        }
      }

      .cart-list {
        background: #fff;

        .item {
          .ui-flex {
            padding: 12.5rem 0;
            display: flex;

            .choose {
              width: 10.417rem;
              padding: 0 10.417rem;
              height: 93.75rem;
            }

            .unchecked {
              background: url(https://s1.mi.com/m/images/m/check_normal.png) 50% 50% no-repeat;
              background-size: 20.834rem 20.834rem;
            }

            .checked {
              background: url(//s1.mi.com/m/images/m/check_press.png) 50% 50% no-repeat;
              background-size: 20.834rem 20.834rem;
            }

            .imgProduct {
              display: block;
              position: relative;
              width: 91.75rem;
              height: 91.75rem;
              margin-right: 10.417rem;
              border: 1px solid #eee;
              border-radius: 2px;
              overflow: hidden;

              img {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
            }

            .info {
              width: 239.578rem;
              height: 91.75rem;
              text-align: left;
              display: flex;
              flex-direction: column;

              .item-text {
                font-size: 14.5833rem;
                line-height: 16.664rem;
                color: #666;
                margin-bottom: 6.25rem;
                margin-right: 15.625rem;
                padding: 0;

                .name {
                  width: 187.5rem;
                  white-space: "";
                }
              }

              .align-start {
                -webkit-box-align: start;
                align-items: flex-start;
              }

              .ui-flex {
                display: flex;
              }

              .price-without {
                font-size: 12.5rem;
                color: #ff5934;
                margin-bottom: 6.25rem;

                .mr-10 {
                  margin-right: 5.208rem;
                }
              }

              .num {
                .xm-input-number {
                  display: inline-block;
                  border: 1px solid #eee;

                  .input-sub {
                    display: inline-block;
                    width: 31.25rem;
                    height: 31.25rem;
                    position: relative;
                    vertical-align: middle;
                    background-color: #fafafa;
                    text-align: center;

                    .image-icons {
                      opacity: 0.3;
                      width: 31.25rem;
                      height: 31.25rem;
                      background-size: 15.625rem 15.625rem;
                      display: inline-block;

                      background-color: transparent;
                      background-repeat: no-repeat;
                      background-position: 50%;
                    }

                    .icon-line {
                      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAT0lEQVR4Ae3TgQXAAAxE0azXDpLJKx3jmoOO0IR+fA7w4ELSioAAAQIECBAgn0My8+iq01BlQwwjXswWyG3I6TGIuGz47WuAAAECBAgQIA8XIA86877kLgAAAABJRU5ErkJggg==);
                    }

                    .icon-cross {
                      opacity: 1;
                      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAc0lEQVR4AWJIS0ujBBsD8W0oNga0YwcYAMMwGIV3ve3kW88x3R3GZAlDYJTgLx4eBfVBkFT+qkKaZ1+7EvIkyK2EWA4IECA/AQECZPW6Z6J6GBYlImNmgVwB2eIhRJxhYGqAABkMCBAgLOEtQY46ZIJDzQtkpFzgLwrvWQAAAABJRU5ErkJggg==);
                    }
                  }

                  .input-num {
                    display: inline-block;
                    vertical-align: middle;
                    min-width: 18.75rem;
                    padding: 0 6.25rem;
                    line-height: 31.25rem;
                    text-align: center;
                    font-size: 16.667rem;
                  }
                }

                .delete {
                  float: right;
                  margin-right: 10.417rem;
                  display: block;

                  .image-icons {
                    display: inline-block;
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    background-size: cover;
                  }

                  .icon-delete {
                    width: 31.25rem;
                    height: 31.25rem;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAD6klEQVR4Ae2aA4xkSxSGn23bDB/DZ9u2wmcbo8bYttG2lUy717a9wbNr/5Ms7/R6t3FzJvlTubc09XXVQeoeIoTYhVi7qGQxIAbEgBgQA2JADIgBMSAWA2JADIgBMaC//vrrmGnTpn3rdrtHvV6vxufzje6J0FYbCASGUX7xyy+/HC1bQMlksq6kpESQlEqlUKlUeyRqW1xcLCoqKgQAl8sS0IwZM44fGRnZUFlZKSwWiwY7ogi7o2xPFAwGi4xGo7WsrExotdrF+DtSdoCwe04fHR3dUFNTI+bNm3fr3vZPpVJPVVVVCZ1Ot2TmzJnHyQ7QlClTTh0bG1tTXV0t5s6d++De9o/FYq9uBrQAgI+VpQ3C4lbRInFE7tzbvpMnT36ejqfJZJqbVzbI5XKdDV0AnZNOTqfzHLvdfs74+Pg1Go1mXV1dncBuetTv9x9qtVqPQJtdymazHQE7dGg4HH6jtrZWwBYtwW66FH2lc0nnvcDj8ZyRdUBDQ0OroH+gX7fTL6Qtz8PDw78ODAz83tbWJpqamkR3d/dCPCdQN3lPNDg4mECfxdSXxqCxdjUfCX3+gc1bmnVA5Hq3qLy8XJCNaWxsFPRr07O0jt5vfqZyj0Rt6XhRXxpDOi69pzm3r6OSHELWAS1atOgR6Cno8VWrVt2L7W1G3EKu3L1mzZq78f6hhQsXPozygGrzmA9hjnth22IKhUIgkBzB/3AX3j+B+qdg6x7JOqA07vinwsJCARtRlylDiiM8SnMiiPw4571YNBqtQPRL7rgzU4B6enrMarVaINb6MS8AbT5inRncQWb8KPkFyGw2TwC0cePGa2Ejbv79999PltatXbv2aNiTm1Bev379+gmpBJLU06kvxrgmjSeVByDkYrPIGyFVeExa197efgm5cZTkxs9PM+475J1wdJNyBjRzPwC9TYCQrMZlCwi52BSKVWbNmjXB/XZ2dl7c0tIiUP6FBZ+XJhd7k9IUvV4fZkAMiAExIAbEgBgQA2JADIgBMSAGxIAYUAYBrdkM6Nk0gC7fDEhgwRemAfTeZkALZAlo6tSph2Fx1bie8c+ZM+dmab++vr5zAMeCUqvRaM6Q1icSiXsbGhoCGFctL0AZEANiQAxIKr72MRqNHZkC1N/fb8qbi8NIJFJN9+S4em7IFCDclmhKSkoIUEE+AKosKCgQiHkmh8Phn0KhUAm+MVQcDNHYmK8ANmguzYlYqTjnAa1cufKx+vp6QbsI2z4jwlx0n0b3bffnLiDJJZ/dbrfg67AQSu/BFI5yyOFwGFKp1Ev8pf3+igExIAbEgBgQA2JALAbEgBgQA2JADIgBMSDWJly2untRJ8f7AAAAAElFTkSuQmCC);
                  }
                }
              }
            }
          }

          .append {
            .insurance {
              display: flex;
              align-items: center;
              -webkit-box-pack: justify;
              justify-content: space-between;
              border: 1px solid #f6f6f6;
              padding: 7.292rem 10.417rem;
              border-radius: 5rem;
              background: #f6f6f6;
              font-size: 12.5rem;
              margin: 0 10.417rem 10.417rem;

              .i1 {
                margin-right: 6.25rem;

                img {
                  width: 26.039rem;
                  height: 26.039rem;
                }
              }

              .i2 {
                -webkit-box-flex: 1;
                flex: 1;
                display: flex;
                -webkit-box-pack: justify;
                justify-content: space-between;
                align-items: center;
                padding-right: 10.417rem;

                span {
                  flex: 1;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  word-break: break-all;
                  overflow: hidden;
                  height: 26.039rem;
                  line-height: 26.039rem;
                  text-align: left;
                }

                em {
                  font-style: normal;
                  color: #ff5722;
                }
              }

              .i3 {
                display: flex;
                align-content: center;
                width: 39.063rem;
                color: #ff5722;
              }
            }
          }

          .batch {
            background: #fff;

            .batch-item {
              display: flex;
              -webkit-box-pack: justify;
              justify-content: space-between;
              padding: 6.25rem 0;

              .batch-img {
                width: 52.078rem;
                height: 52.078rem;
                margin: 0 10.417rem 0 31.25rem;
                border-radius: 10.417rem;
                background-color: #f8f8f8;
                overflow: hidden;
              }

              .batch-name {
                flex: 1;
                -webkit-flex: 1;
                display: flex;
                text-align: left;
                font-size: 12.5rem;
                color: #000;
                justify-content: space-between;
                margin-right: 10.417rem;

                p {
                  display: flex;

                  .gift-tag {
                    color: #f44a33;
                    border: 1px solid #f22a10;
                    border-radius: 6px;
                    padding: 0 2.604rem;
                    margin-right: 6.25rem;
                  }

                  .gift-name {
                    // max-width: 146.617rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: inline-block;
                    margin-right: 2.604rem;
                  }
                }
              }

              .align-center {
                -webkit-box-align: center;
                align-items: center;
              }
            }
          }

          .ui-line {
            height: 10.414rem;
            background: #f5f5f5;
            overflow: hidden;
            clear: both;
          }

          .justify-center {
            -webkit-box-pack: center;
            justify-content: center;
          }
        }
      }
    }

    .bottom-submit {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      z-index: 99;
      box-shadow: 0 3px 14px 2px rgb(0 0 0 / 12%);
      margin: 0 auto;
      max-width: 375rem;

      .box-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price-box {
          flex: 1;
          font-size: 13.54rem;
          color: #999;
          text-align: left;
          padding-top: 7.813rem;
          padding-left: 15.625rem;

          .amount {
            display: flex;
            align-items: baseline;

            strong {
              font-size: 20.8333rem;
              color: #ff5722;
              margin-right: 4.167rem;
            }

            .info {
              color: #ff5900;
              margin-left: 5.208rem;
              display: flex;
              align-items: center;

              img {
                width: 10.414rem;
                height: 6.359rem;
                margin-left: 2.604rem;
                transform: rotate(180deg);
              }
            }
          }
        }

        .btn-box {
          display: flex;

          .btn {
            width: 105.156rem;
            background: #ff6700;
            color: #fff;
            text-align: center;
            line-height: 52.078rem;
            font-size: 14.833rem;
          }

          .disable {
            color: #333;
            background: #f4f4f4;
            line-height: 50.078rem;
            border: 1px solid #f4f4f4;
          }
        }
      }
    }
  }

  .app-view-with-header {
    padding-top: 50rem;
  }

  .app-view-with-footer {
    padding-bottom: 50rem;
  }
}
</style>