<template>
  <!-- 回答开始 -->
  <div class="answer-list" v-if="data && answer_list">
    <div class="answer-title">
      <div class="total">共 {{ data.answer_num }} 条讨论</div>
      <div class="switch">
        <div class="btn active">热门</div>
        <div class="btn">最新</div>
      </div>
    </div>
    <div class="list-container">
      <div
        class="show-answer-list"
        v-for="(item, index) in answer_list"
        :key="index"
      >
        <div class="user-info">
          <div class="user-profile">
            <img :src="item.avatar" alt="" />
          </div>
        </div>
        <div class="right-box">
          <p class="name">
            {{ item.nickname }}
            <span class="time"> {{ item.create_time }}</span>
            <span class="buy" v-if="item.is_buy">已购</span>
          </p>
          <div class="context">
            {{ item.answer_content }}
          </div>
          <div class="handler">
            <div class="handler-item">
              <span>{{ item.support }}</span>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEt0lEQVRoQ+2ZaahVVRTHfzZZaWXQYJKNhkQTRRQVEYUNGEEGDTZgYBAVFEVEBH7Jvlgg2PSlUkIqKirCSs0gspHAJhpsgiRKM5u0stIsfrGObHane86799x3z4MWXN6795yz9/rvNf3XOqMY4TJqhOvP/wASC24D7ARsC2wCfge29NvCTVlgZ+BkYH9gR2A98BXwYfztG44mAGwHXAAcCWiFQjz9n4GXgFf7ZY0mABwCXAyMSVxHKwhM+QN4DnijHyB6BeDzpwGnx+m/E4pOAI4C9oN/EsU6YAHwbdO+1CuAHYDzgGPi9BcFANfdC7gU2DuUfgF4vm0AdBuVPBj4FXgE+DhRUmAXxXetcAfwV5MgerXAOOCKOO2fgPnA6kRB0+otwOhQfHYEdmMYegWwJ3BtKPgdcC+wIdPuJmCP+O0u4MvGtI8A62U9XefKWOBr4M6STHM9sE/ccw+wqpcN82d7tcApwNmx6Arg0RLlUgvMBda0CYCnrxWUJyMDpfpJK24LemHwzoq60BiGXixgerwh3PBP4Hbgh0yzA4Cr4zdjZE5jmsdC3QIwu5wPHB7rfAA8WKLcOcGRvPQ68FQbAFi8zgBODLog63wA+CJTToJ3VVLIFgKflwDQtTZ2Cyy3wPbBafTd9Jr/q7gucTwwPjbUdV4BlgKbMyUOBS4EBFIlHsJK4OVgr65bS1Il5S8nAAcGiPSaLFMAOdt8C1gS9DkP3jMBs9RQ3NRqviySQS0QxeLyFhml+brOhtJkFX8P+K3kqMbG6UvmqkRreziFuPbjwEdVD3pdZaW9U4GT4rsK/ZJxFiuu/N7PE4BB27Xflii2L3AuMDF0eBN4OghiRxwC2AW4LPxbXyxONjXhrUmFtTD1Q8xoZjYznAnBoM9pyb/2FcBuQcjM6xIyM0peLc3xhfQLgO42Iw7UdtT+wda00gI5gPuBb7KnhgPAEWEBu7lPgIeDoo8IAHlnZw/9bElqruVCg7CA/YKd3dGh9DPAa1XuU2ShNrjQrsDlgNnIDPgQ8NlIAmACuSZmSt9HY1QZwG2yQNo7fwroxrV657I0OogYcDB2bLjMYuDFzH3U077DomuG2jqybAMAdbgZ2D2ULuubpToClDC+nc6X2gBAmnJjUAjJnJOLlAVYmY8DDHRFrrS8uKcNAGTA00K5vDGS/U4O90lJplTDe7e0AYA8zCqsSOAsYoU4jjHArROpOL53jLlm0AB0D9OnPq7b3J2M46XZjuwlm2Vij71i0ABSArc20uePEQ+HRXPVqZ6tHDQAM4t9gA3N+8Bj0SD5XVqhhTrJxkECMEDPStpOc7+9tTm+6MHTFrYMyNYgnhmNetmA1gf7Qaf17enApBh2ORizx1aGBMD+1RH5QbGQr4RMUWkuvi6BP6/CrHUuO6nwBYj53eoq/7kPMDCVIbmQ0T4FODWmDr4Syvvdooi4eC2SVYHCPQVRuIgvP5xGFPxHC9QOYveSUl8Sr4Sq/K7OCde9xx783RgU5OStdhotNhOEQ6uyuVBdhere5+RDt/FtjtlHq5dJrUKWPijq4mV1XWW6uc9Mo9J+OtHmWlSiGwWG85lKMjecynS7V0c63e2iw/ncfzY0fwNGvywUlioD+QAAAABJRU5ErkJggg=="
                alt=""
              />

              <div class="handler-box" v-if="isClick">
                <div class="handler-container">
                  <div class="hander-item">
                    <div class="item">
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEWUlEQVRoQ+2Za6iUVRSGn2NmN82CzIxM0/ohdKGIokKkqIwiMEFLKxIKooIkERGhP9kfE4LK/NONiAoLjdA0LYjoSlBYqGklFGFmWdlNTbvxyBrZZ/vN5Zz5Rr8BFwznzMw3e7/vXmuv/a61e+hy6+ly/BwmUMeDA4BjgCOAvcBfwL+d8HYnPHAsMB4YBRwN/AZsATbE31J5lE1gIDAVOBfQCzVz9f8A3gbeK9MbZRM4C5gOHJeEjl6QmLYHWAl8WBaJMgk41hXAVbH6awPoqcB5wOmwL2lsB54BfiwjlsokMAiYDFwQq788CDjHycAtwPAA/SawpmoEDBtBjgV2Ai8CmxKQErsp3uuFhcB/7ZIo0wMnAHfEav8KPA1sTQCaVucBRwXw+bGx2+JQJoFhwL0B8CdgMfB7hm4OcFJ89hjwbVvoY1O1O0bt94bOnfHmO+DRgkxzHzAinnkc+Kbdycv0wATgugD0MbCkAFzqgYeB76tEwNXXC9qyyEApPmXFgyEv3Lz3x7nQFoeyPGB6nBUh+Q/wEPBLhmw0cHd85h5Z0Bby+HEZBMwuU4CzY8z1wLMF4K4PjeRXHwCvVIGAh9fVwKUhF1SdTwFfZ+AUeHclB9lzwOYmBAyzXc1INvLAkaFpjN30Of8XuCFxMXBKTGLovAusBv7OJh4H3AhIpC/mgmwE3gkl6xy9rB4B9cslwBlBIn1OlSmBXG1+Arwe8jnfvBMBs1R/Q9aT/Y1IDL1IFA2oblFRmq9bmVCZLPDPgN0Fyzs4Vl8x1xfT8y5UzZznZeDzdJAcoLL3WuCyAC+gPzPN4omrvve1FHDTNo3VviBPnj0NmASMDDwfAa+GWNz3WE5gCHBrxLfxV1vZ1G0PJCesB1OnzexmljPbmRxMAPslSk5gaAgy87qCzIySn5bm+JodDAKG3m2Ai2tpai1hmVrogZzAk8C2bIkPNoFzwgNWdl8AL4Rc7woCeZVnPf1amqabhdCh9oC1g1Xe+QF6BfB+oyxUtRA6HpgBmI3Mhs8DX3UTAZPJPdFf+jmKpP0buCiNVs0DaR39JWBI96qjq74HbJJdGCGzCngrP3SqTEBsc4ETA3RhDV1lAkqW2aEWFHN2MZqq0SrtAdXwDbH69YqkA7RQlQioyTyFNQWch9gBVtUQUriZPpX2hs2ieq35qhJIBdwPkT53dJMHTJ3WARY064CX6hRLldwDlqrXJCWoud86u/CKqiiEbo9CvahBqxc7LafV/dOAM6PxZZPMervQcgLWr7bIx8SPvRIyhaX5d2Yy0iP1Bu7n53YtvAy5KNo06p8nABthLRGwkL4SuDy6Dl4J5fWuCrFmvYRVP0GnP3N+SdQ6Hl6E2I2oe49Q1HXwLLg5roTS1kkJ+Foewnr802gaNLwEqdc2kYRNq6K+UMso+vGgXRDDxpsds48R0NAa9X10Z+2yutk4ZX1vphG0r5aun1ppXJUFriPjHCbQkWXtw6D/A+DYBUBdXGYuAAAAAElFTkSuQmCC"
                        alt=""
                      />
                      <div>
                        <p class="text">
                          <span>{{ item.support }}</span>
                        </p>
                        <p class="text">有用</p>
                      </div>
                    </div>
                    <div class="item">
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEX0lEQVRoQ92ZaahVVRiGn2vzqEFlRVlZ/hAaQKKyiCgaxAgiqMyKBIWoQDEwIuiP9ScDQcv+ZFpERUVJNFAZRVQaQpLRbEEZmjZok5UNJk98W5bLfYbd3fd4tgsu95y919nre7/5e/cADV8DDZef3RrAHsB+gP97tbYCf8bfv90c2soCw4EzgOOBA6BnlvoD2Ah8CnwQQNriKAOg8NcAo4Bh3WhhCPZsAVYBTwNtLZED0F0uAM4L4TXn75mAByfff65ZeM/fP1Hcq8DSdiByAAcC1wKjw3xvAB8C/ySCzkg+z6sZgMKfCpwO7Bnu9ADwQ6tzcgC6z1TgCOAnYBHwTfbjOcn3W2sG4OMOAq4GTgwlPgOsrAJgGjAyACwENvQYgHE3ATg3ksfrwMuAGWqnVWaBXQ1AIU8DLgP2jmz0JGCGagwAM+D14U7fAnrCj00CYAG9GTg8Esh9wNomAVBWs+EpIfSzwNtNA3AmcHkIbSp/uGkADgVmRSaymM7O6tF/ePo1CxWy3QYcEpo3DtbkVuhnAMp6ZaRUP78EvNY0AOOASSH06kinOzR3/W4BOwLT6b7RF90P7NBA9jsAO98pwNHAZuBR4PPUjfodgK2EqVRX+ht4HljWJAAq+HzgwpgRLGYvBJi+T6OFok8Grog4+Ax4DPituNlpHngQWN/jdjrPlGljZz+0OA3kHIDDxHXAcYBzqbn3/awCWhGL3nwoBpocwElhARu8L4FHgF9aWcAxbiJwdlRpe3CjP829hwUgrzl026fkc3NZ2/J/rpl9nAuOCXlWADZ2f7UC4HVb2MnAkV3SKb8mliobOpyzrwqWowoIB3yzULE85yng43ZZqLh3FDC+BS/kyOeDU8pFl3Ju1eVypkJBLk5GxCogir0GrezEO3lD145a3CtILQVI9/lZAMaJ5JcEgEvm4q2YX83Z6RobVpB1qLKMw0+AN2OgSdmR0jRa5eHuFchFwFlBg3igmctgS5eC3xhkgdcNxC86HGaMdYytOshds4N52mzh+gh4qES4S4Fz4vpyYElVbZXtrwOAz7XpuiVcTTPLHW3KDtTlboprElV39xMAZbkBOCGEkowy4NJlLN0VbLfucUc35G0nkHVZwHMkoi6JA98Fnig53MLnqOiaW1LlO8m70/06Aah9reBaB8wvYdNmRn1xzwLgq8oSZz+oE4AVejqwT5CxDh/bS36cm1rgXuDrfgIwApCWtJKXEcNmq9sDoDFwJ2B1HdSq0wK+yZGM0pWsnI/Hm5ZCwHS+/R64p9PLi26Q1QkgnZ5stp6LTOQZWkVwpluXLy5e6UbATnvqBJBPT+8FAPsqKcJjo06ofXv67zoJ1839OgF43pjoZHUnrWBrIaNgm+7yldWLAayU7+9G6HRP3QAUVDJKjefdqgHrKyvn2lqEF0jdAHymjZs9jy6j9m2vHQXtkUop8qpaH0oLFM9W+8VL8sKVatN6LwAMRqmVfjsULlRJgMFubjyAbc3yBUBf9DqyAAAAAElFTkSuQmCC"
                        alt=""
                      />
                      <div>
                        <p class="text">
                          <span>{{ item.dislike ? item.dislike : 0 }}</span>
                        </p>
                        <p class="text">无用</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="reply-list">
            <div
              class="reply-item"
              v-for="(item, index) in item.secondary_data.answer_list"
              :key="index"
            >
              <p>
                <span class="reply-name">{{ item.nickname }}</span>
                <span class="text" v-if="item.reply_nickname"> 回复</span>
                <span class="text" v-else> :</span>
                <span v-show="item.reply_nickname" class="reply-name"
                  >{{ item.reply_nickname }} :</span
                >
                {{ item.answer_content }}
              </p>
            </div>

            <div class="reply-more">
              <span
                >展开
                {{ item.reply_num - item.secondary_data.answer_list.length }}
                条回复</span
              >
              <img
                class="icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAB9ElEQVRYR+3W28tMURzG8c/r+IokRXkdckVIyYUQcYEUfy4lXBAhF1JCXMmxKEnkfOjR2prGOzNrz8zFpL2vdtNv/fazvs+zfmvmzOAzN4OadKJqXelIdaRqCdTWdZn6r0mtxTze4nvtTofULcN6fMb7QXXDMrUKp7ECT3AbvyYQlm8dwHZ8xQV8WqzfMFGbcaYsipiHuIGfYwhbgsPYxd+r7TxetBW1FKewgLzHvvu4iy8thK3EPuxB7PuBl7hY3v9pNWokJFMHsQ3ZbbCHWK2VjWUhlBiE8lPcGjdTzQ5W4wQ2FGHZ6WNcH5GxCDqCHYV0BL3BZXwcRnoUqWZtQn8SG4uwZOwe7hR6/d8Ilf3YWzIUQa9xaVC4exvUisqaNSWsW8vOY+WDIqx3XCQ3EbS7WBayz8oh+VCTxTai0i8ZO4pNhdg3PMLNYmX6HcJOLC8ZeoVrwzLUL7StqKzPMD2LdT1W5lTGyhDKKUvfWPYO58qwrIH0p2YcUVmXjB1DZlnGRYhFQISGUCzLDLpak6FpkGp6xMoMxC2FWPN7CD0vGRp4lUzj9A3qEWKZ+o2VjWWZ1oteITUejmtfb+9k7HgRFguvtM3QNO3rFxZaEZV/ABM90yA1kYC2F/LUP1bbsCPVkaolUFvXZaojVUugtm4mM/UbU9paJoWcdaEAAAAASUVORK5CYII="
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 回答结束 -->
</template>

<script>
export default {
  props: ["data", "answer_list"],
  data() {
    return {
      isClick: false, //点击显示有用、无用板块
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
// 回答开始
.answer-list {
  margin-bottom: 60.417rem;
  margin-top: 8.333rem;
  background: #fff;
  overflow: hidden;
  .answer-title {
    height: 44.828rem;
    line-height: 44.828rem;
    border-bottom: 1px solid hsla(0, 0%, 59%, 0.2);
    padding: 0 16.667rem;
    font-size: 12.5rem;
    justify-content: space-between;

    -webkit-box-align: center;
    align-items: center;

    display: flex;
    -webkit-box-flex: 1;
    flex-wrap: nowrap;
    .total {
      color: rgba(0, 0, 0, 0.4);
    }
    .switch {
      width: 82.812rem;
      height: 19.797rem;
      background: #f6f6f6;
      border-radius: 9.8985rem;
      line-height: 19.797rem;
      border: 2.602rem solid #f6f6f6;
      .btn {
        display: inline-block;
        width: 50%;
        border-radius: 9.8985rem;
        text-align: center;
      }
      .active {
        background: #fff;
        color: #ff5934;
      }
    }
  }
  .list-container {
    padding: 0 16.667rem;
    .show-answer-list {
      margin-top: 10.417rem;
      position: relative;

      display: flex;
      -webkit-box-flex: 1;
      flex-wrap: nowrap;
      // 头像
      .user-info {
        .user-profile {
          width: 27.078rem;
          height: 27.078rem;
          border-radius: 50%;
          margin-right: 10.417rem;
          overflow: hidden;
        }
      }
      .right-box {
        border-bottom: 0.516rem solid rgba(0, 0, 0, 0.1);
        text-align: left;
        width: 100%;
        .name {
          margin-bottom: 3.125rem;
          display: flex;
          align-items: center;
          font-size: 12.5rem;
          color: #999;
          .time {
            margin-left: 5.208rem;
            padding: 2.604rem;
          }
          .buy {
            border-radius: 5rem;
            display: block;
            color: #ff5934;
            font-size: 12rem;
            margin-left: 4.167rem;
            padding: 1.563rem 3.646rem;
            border: 1px solid #ff5934;
          }
        }
        .context {
          font-size: 13.5417rem;
          font-weight: 400;
          color: #333;
          margin: 3.125rem 0 10.4167rem;
        }
        .handler {
          position: absolute;
          top: 0;
          right: 0;
          .handler-item {
            text-align: center;
            display: flex;
            align-content: center;
            justify-content: space-between;

            position: relative;
            & > span {
              vertical-align: middle;
              margin-right: 2.604rem;
              line-height: 16.66rem;
            }
            & > img {
              width: 16.664rem;
              vertical-align: middle;
              margin-right: 4.167rem;

              object-fit: contain;
            }
            .handler-box {
              background: url(https://m.mi.com/static/img/box-bg.b2f17a50bc.png)
                no-repeat 0 0;
              background-size: cover;
              width: 160.938rem;
              height: 63.016rem;
              position: absolute;
              right: -13.021rem;
              top: -62.5rem;
              overflow: hidden;
              .handler-container {
                .hander-item {
                  padding: 20.833rem 10.417rem 12.5rem 20.833rem;
                  overflow: hidden;
                  .item {
                    width: 50%;
                    float: left;
                    text-align: left;
                    -webkit-box-align: center;
                    align-items: center;
                    display: flex;
                    -webkit-box-flex: 1;
                    flex-wrap: nowrap;
                    img {
                      width: 16.664rem;
                      height: 16.664rem;
                      margin-right: 5.208rem;
                      vertical-align: bottom;
                    }
                    .text {
                      height: 13.016rem;
                    }
                  }
                }
              }
            }
          }
        }
        .reply-list {
          background: #fafafa;
          border-radius: 5rem;
          padding: 10.417rem 10.417rem 0;
          margin-bottom: 14.063rem;
          font-size: 12.5rem;
          p {
            padding-bottom: 10.417rem;
            color: rgba(0, 0, 0, 0.87);
            position: relative;
            .reply-name {
              color: rgba(0, 0, 0, 0.5);
              margin-right: 5.208rem;
            }
            .text {
              margin-right: 5.208rem;
            }
          }
        }
        .reply-more {
          color: rgba(0, 0, 0, 0.5);
          padding-bottom: 10.417rem;
          display: flex;
          align-content: center;

          img {
            width: 12.5rem;
            height: 12.5rem;
            object-fit: contain;
          }
        }
      }
    }
  }
}
// 回答结束
</style>