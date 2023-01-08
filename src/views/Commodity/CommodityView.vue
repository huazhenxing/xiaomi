<template>
  <div class="app-view">
    <div class="app-product-container" v-if="data">
      <!-- 顶部 -->
      <header>
        <div class="fill-height">
          <!-- 点击返回 -->
          <div class="header-btn" @click="clickReturn">
            <i class="image-icons icon-back-left"></i>
          </div>
          <!-- 商品导航 -->
          <div class="placeholder">
            <span class="current">商品</span>
            <span>评价</span>
            <span>详情</span>
            <span>推荐</span>
          </div>
          <!-- 点击分享 -->
          <div class="header-btn" @click="isClick = true">
            <i class="image-icons icon-back-right"></i>
          </div>
          <van-share-sheet
            v-model="isClick"
            title="分享"
            :options="options"
            @select="onSelect"
          />
        </div>
      </header>

      <!-- 头部商品轮播图 -->
      <div class="section">
        <div class="product_info_product_gallery">
          <div class="gallery-view">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
              @change="onChange"
            >
              <van-swipe-item
                v-for="(item, index) in goods_info[change_index].gallery_v3"
                :key="index"
              >
                <img :src="item.img_url" alt="" />
              </van-swipe-item>
              <template #indicator>
                <div class="custom-indicator">
                  {{ current + 1 }}/{{
                    goods_info[change_index].gallery_v3.length
                  }}
                </div>
              </template>
            </van-swipe>
          </div>
        </div>
      </div>

      <!-- 商品价格 -->
      <div class="section">
        <div class="product_info_product_price">
          <div class="layout">
            <div class="price cur-price">
              <span>￥</span>{{ goods_info[change_index].price }}
            </div>
            <div class="price origin-price">
              <span>￥</span>{{ goods_info[change_index].market_price }}
            </div>
          </div>
          <div class="coupon-active">
            <div class="overview-promotion">
              <div class="overview-promotion-left">
                <div class="cur-active">
                  <div class="act-desc">券</div>
                  <div class="act-title">30元立减券</div>
                </div>
                <div class="cur-active">
                  <div class="act-title">预计得240米金</div>
                </div>
              </div>
              <div class="overview-promotion-right">领取</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品名称 -->
      <div class="section">
        <div class="product_info_product_name">
          <div class="overview">
            <div class="goods-name">{{ product_info.name }}</div>
          </div>
        </div>
      </div>

      <!-- 商品介绍 -->
      <div class="section" v-if="product_info.product_desc_ext">
        <div class="product_info_product_desc">
          <div class="overview overview-goods-brief">
            <div class="goods-brief fz-xs">
              {{ product_info.product_desc_ext }}
            </div>
          </div>
          <div class="overview overview-sell-point">
            <div
              class="sell_point_desc fz-xs"
              v-for="(item, index) in product_info.sell_point_desc"
              :key="index"
            >
              <span
                class="img"
                :class="{
                  img1: index == 0,
                  img2: index == 1,
                  img3: index == 2,
                }"
              ></span
              ><span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品活动 -->
      <div class="section" v-if="welfare">
        <a :href="welfare.action.path">
          <div class="overview overview-flow-distribution">
            <span>
              <p>{{ welfare.text }}</p>
            </span>
          </div>
        </a>
      </div>

      <!-- 商品关键参数 -->
      <div
        class="section"
        v-if="goods_info[change_index].class_parameters.list"
      >
        <div class="product_info_class_parameters">
          <div class="classic-param">
            <div
              class="classic-param-item"
              v-for="(item, index) in goods_info[change_index].class_parameters
                .list"
              :key="index"
              v-show="item.icon"
            >
              <img :src="item.icon" alt="" v-if="item.icon" />
              <div class="classic-param-item-name fz-xs">
                {{ item.top_title }}
              </div>
              <div class="classic-param-item-value fz-xxs">
                {{ item.bottom_title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品排行榜 -->
      <div class="section" v-if="list">
        <div class="rank-info">
          <div class="info-left">
            <img :src="list.icon" alt="" />
          </div>
          <div class="info-right">
            <div class="right-text">{{ list.name }}</div>
            <div class="right-icon"></div>
          </div>
        </div>
      </div>

      <!-- background: rgb(246, 246, 246) -->
      <div class="section">
        <div
          class="blank_line offset-top-1px"
          style="height: 10.414rem; background: rgb(246, 246, 246)"
        ></div>
      </div>

      <!-- 商品版本 -->
      <div class="section">
        <div class="product_info_choose_version">
          <div class="card-box">
            <div class="product-section-box">
              <div
                class="product-section padding-26-0-0-32"
                @click="clickChoose"
              >
                <div class="ui-flex">
                  <div class="title fz-xs">已选</div>
                  <div class="flex fz-xs">
                    <div class="info">
                      <div class="display-flex">
                        <div class="pro-name">
                          {{ goods_info[change_index].name }}
                        </div>
                        <div>x {{ value }}</div>
                        <div class="right-icon"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <van-action-sheet v-model="choose" title=" ">
                <div class="pop">
                  <div
                    class="
                      pro-info
                      layout
                      row
                      align-center
                      justify-space-around
                    "
                  >
                    <div class="product-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/55098d0d1d85c73c6bfc07e88fb9a3a3.png"
                        alt=""
                      />
                    </div>

                    <div class="product-desc flex layout column justify-start">
                      <div class="product-price">
                        <div class="cur-price">￥2499</div>
                        <div class="origin-price">￥2799</div>
                      </div>
                      <div class="name">Redmi K50 12GB+256GB 墨羽</div>
                    </div>
                  </div>

                  <div class="max5">
                    <div
                      class="mt2x"
                      v-for="item in buy_option"
                      :key="item.prop_cfg_id"
                      v-show="item.list"
                    >
                      <div class="option-title">
                        {{ item.name
                        }}<span style="display: none"
                          >请选择： {{ item.name }}</span
                        >
                      </div>
                      <div
                        class="
                          options-group
                          align-center
                          justify-start
                          layout
                          wrap
                        "
                      >
                        <div
                          class="
                            option-item
                            align-center
                            justify-center
                            ui-flex
                          "
                          v-for="item in item.list"
                          :key="item.prop_value_id"
                          @click="clickVersion(item.prop_value_id, item.list)"
                          :class="{ on: item.prop_value_id == change_id }"
                        >
                          <!-- on -->
                          <p>{{ item.name }}</p>
                        </div>
                      </div>
                    </div>

                    <div class="layout align-center justify-space-between">
                      <div class="option-title tit-sub">购买数量</div>
                      <van-stepper v-model="value" />
                    </div>

                    <div class="ywb">
                      <div class="option-title">小米服务</div>
                      <div class="ywb-row">
                        <div class="option-title-sub">
                          <img
                            src="https://m.mi.com/static/img/icon-accident.77f043afba.png"
                            alt=""
                            class="service-icon"
                          />
                          <div class="tit">意外保护</div>
                          <a
                            href="https://api.jr.mi.com/activity/accidentIns/?from=mishop&insuranceSku=41506"
                            class="service-url"
                          >
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                            />
                            <span>服务介绍</span>
                          </a>
                        </div>
                        <div class="options-group">
                          <div class="layout wrap align-center justify-start">
                            <div
                              class="
                                option-item
                                w49
                                ui-flex
                                justify-space-between
                              "
                            >
                              <div class="addition-tips">意外损免费修</div>
                              <p>意外保障服务</p>
                              <p>299元</p>
                            </div>
                            <div
                              class="
                                option-item
                                w49
                                ui-flex
                                justify-space-between
                              "
                            >
                              <div class="addition-tips">已省54元</div>
                              <p>碎屏保障服务</p>
                              <p>125元</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="ywb-row">
                        <div class="option-title-sub">
                          <img
                            src="https://m.mi.com/static/img/icon-extend.a8e55bfef6.png"
                            alt=""
                            class="service-icon"
                          />
                          <div class="tit">延长保修</div>
                          <a
                            href="https://api.jr.mi.com/activity/accidentIns/index.html?from=local&insuranceSku=41508"
                            class="service-url"
                          >
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                            />
                            <span>服务介绍</span>
                          </a>
                        </div>
                        <div class="options-group">
                          <div class="layout wrap align-center justify-start">
                            <div
                              class="
                                option-item
                                w49
                                ui-flex
                                justify-space-between
                              "
                            >
                              <div class="addition-tips">已省30元</div>
                              <p>延长保修服务</p>
                              <p>69元</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="ywb-row">
                        <div class="option-title-sub">
                          <img
                            src="https://m.mi.com/static/img/icon-cloud.e8449c43c3.png"
                            alt=""
                            class="service-icon"
                          />
                          <div class="tit">云空间服务</div>
                          <a
                            href="https://api.jr.mi.com/activity/accidentIns/?from=mishop&insuranceSku=41506"
                            class="service-url"
                          >
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                            />
                            <span>服务介绍</span>
                          </a>
                        </div>
                        <div class="options-group">
                          <div class="layout wrap align-center justify-start">
                            <div
                              class="
                                option-item
                                w49
                                ui-flex
                                justify-space-between
                              "
                            >
                              <div class="addition-tips" v-if="false">
                                意外损免费修
                              </div>
                              <p>云空间年卡200G</p>
                              <p>208元</p>
                            </div>
                            <div
                              class="
                                option-item
                                w49
                                ui-flex
                                justify-space-between
                              "
                            >
                              <div class="addition-tips" v-if="false">
                                已省54元
                              </div>
                              <p>云空间年卡 50G</p>
                              <p>58元</p>
                            </div>
                            <div
                              class="
                                option-item
                                w49
                                ui-flex
                                justify-space-between
                              "
                            >
                              <div class="addition-tips" v-if="false">
                                已省54元
                              </div>
                              <p>云空间月卡200G</p>
                              <p>21元</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <van-goods-action>
                    <van-goods-action-button type="warning" text="加入购物车" />
                    <van-goods-action-button type="danger" text="立即购买" />
                  </van-goods-action>
                </div>
              </van-action-sheet>

              <div class="product-section padding-26-0-0-32">
                <div class="ui-flex">
                  <div class="title fz-xs">送至</div>
                  <div class="sendto flex fz-xs">
                    <div class="info">
                      <div class="display-flex">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABgFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAURmmrAAAAf3RSTlMAAQIDBAUKCwwOEBESExQVFhcYGRobHB0eHyAkJSYoKSotMDE2ODk/Qk5PUlpbXF1eX2FjaWprbG1ydnl6fX6AgYOEhYaHiIuUlZqcnZ6foKKsr7K1t7i5ur2+v8DFxsfIycrLzNLU1dbX2Nna2+Du7/Dx8/T19vf4+fr7/P3+i5i9oQAAAkFJREFUGBntwfs322AABuA3ilRpY2PTDnOpXSmbbXazVS90G6pKu0vZlRnGJpqWNMn7ry9fj+MgbXV+9jy4dCGujqFwdkNVN7LhoasunEfqnvyW55H818luCbU92NJ5gr45hlpa4ySLO6nh/paW/uHUTpFk1IOqWmcPaX6euC6hTOp6+sXkwTsPqpk5ZGk+IOGYFEiWeBBDZdI4WXrTjFOa35bIhxIq6d2mMduMM5rnDG71oILG1yWu+uEQWKX+qhFOHT9YeCxBUEKf9tRcSIEgPSnwewecbhe43QkhmLFoszJBCNd+U7sFpyg5J8GmZE2WmRkFNilJRuD0gbwHYdSiOh3oiqm0QhDuk+/htEnehJAjY01AU5zMQegjf8Fpn3RDUEk/bH5SheAm9+H0h/RAUEk/bF2kCsFD/oXTOjkAIUfGm4CmGLkCYYBch9MyOQIhZFGN+W9Mq7TGIIySy3B6QS42wKZkTJaZWQW2hkXyOZwGVe72QAhmLNqsTBBC7y73BuHUvkL9pQuCEsqpex9HfBBckzpzCpwanhX5sw8O/RssTkiooHONzLTjjCtZcq0TFd09pJVuwyltaYsHd1DFozyNWS9O8M4ZzI+jGjlaoD7vxTHvvM5CVEZV7gRppL044k0bZMKNWhIajaQPZb6kQS2B2txxjfqCDzbfgk4t7sY53DOksaQAypJBzrhxvmmNZkpRUia1adRDjmgspVIlahEZdZGjpGmSURn1imikFkH95Kl8fkrGf5DDYRmXLuwfIPyv3DLCuHAAAAAASUVORK5CYII="
                          alt=""
                          class="location-icon"
                        />
                        <span class="mr1x">北京市 东城区</span>
                        <span class="on"> 该地区暂时缺货</span>
                        <div class="right-icon"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="product-section padding-16-32 sevice-section more"
              @click="clickView"
            >
              <div class="ui-flex">
                <div class="flex service-policy-item">
                  <img
                    class="mr1x img-icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAq1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NbREAAAAOXRSTlMAAQIDBAUGBwgJCgsMDg8REhMUFRcYGRobHSAhIyUqLC0uLzAxNDY3ODk6PD5AQkNERUZHSUpLTE2r4yhyAAABn0lEQVQ4y42U0XaaUBBFB0okoNRCqFERk5QaCha9Ilz2/39ZH1QUJV2cx7vOmpk7s2dErjJtL05V1VQqjT3blD4Z/nqruUhv177xaJokiq5UMrkPFJZAU2dR4FpuEGV1A5RhJ9xoVYHOl0774ixzDdVqdGN601AsnE54Z1GAfmttxkpDPn4odZyDXl2ShhV8Oj3fdj6hCs+/KyF3ervj5FBORESMBIqx9GtcQGKIiK/QC/lKC43yRcz1V/mmr+4p59oUe0uz7DP9LKqPJ5Flw9YWT1P3hfqh4M+ziFOjPYkh6zPt4PBqiEgGsaQQ9aRTcJwZIiIRpKIgeDC97OF4JicAJRW4pzk9tdxNd6Bm59G4UEkDloiIzDfxebLhHo7zy/wsaNpY1l/qj9ZUXkF1oWrrMjbAr28i0z0cwmuNAajrH+1NA+/PLzs4zG8YjSC96Zf9u6FO1T3IGcS3vR+lABz9Djw12uvM0U4bUPPOSpzm2GFilOjDzLjncG3e8WV9d4w+vgayOoz7gTs0cB+H7fbAOzHw5gy8X0Nv4X/v6j/fPVqVkOu9NwAAAABJRU5ErkJggg=="
                    alt=""
                  />
                  <span class="fsc1">小米自营</span>
                </div>
                <div class="flex service-policy-item">
                  <img
                    class="mr1x img-icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAq1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NbREAAAAOXRSTlMAAQIDBAUGBwgJCgsMDg8REhMUFRcYGRobHSAhIyUqLC0uLzAxNDY3ODk6PD5AQkNERUZHSUpLTE2r4yhyAAABn0lEQVQ4y42U0XaaUBBFB0okoNRCqFERk5QaCha9Ilz2/39ZH1QUJV2cx7vOmpk7s2dErjJtL05V1VQqjT3blD4Z/nqruUhv177xaJokiq5UMrkPFJZAU2dR4FpuEGV1A5RhJ9xoVYHOl0774ixzDdVqdGN601AsnE54Z1GAfmttxkpDPn4odZyDXl2ShhV8Oj3fdj6hCs+/KyF3ervj5FBORESMBIqx9GtcQGKIiK/QC/lKC43yRcz1V/mmr+4p59oUe0uz7DP9LKqPJ5Flw9YWT1P3hfqh4M+ziFOjPYkh6zPt4PBqiEgGsaQQ9aRTcJwZIiIRpKIgeDC97OF4JicAJRW4pzk9tdxNd6Bm59G4UEkDloiIzDfxebLhHo7zy/wsaNpY1l/qj9ZUXkF1oWrrMjbAr28i0z0cwmuNAajrH+1NA+/PLzs4zG8YjSC96Zf9u6FO1T3IGcS3vR+lABz9Djw12uvM0U4bUPPOSpzm2GFilOjDzLjncG3e8WV9d4w+vgayOoz7gTs0cB+H7fbAOzHw5gy8X0Nv4X/v6j/fPVqVkOu9NwAAAABJRU5ErkJggg=="
                    alt=""
                  />
                  <span class="fsc1">小米发货</span>
                </div>
                <div class="flex service-policy-item">
                  <img
                    class="mr1x img-icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAq1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NbREAAAAOXRSTlMAAQIDBAUGBwgJCgsMDg8REhMUFRcYGRobHSAhIyUqLC0uLzAxNDY3ODk6PD5AQkNERUZHSUpLTE2r4yhyAAABn0lEQVQ4y42U0XaaUBBFB0okoNRCqFERk5QaCha9Ilz2/39ZH1QUJV2cx7vOmpk7s2dErjJtL05V1VQqjT3blD4Z/nqruUhv177xaJokiq5UMrkPFJZAU2dR4FpuEGV1A5RhJ9xoVYHOl0774ixzDdVqdGN601AsnE54Z1GAfmttxkpDPn4odZyDXl2ShhV8Oj3fdj6hCs+/KyF3ervj5FBORESMBIqx9GtcQGKIiK/QC/lKC43yRcz1V/mmr+4p59oUe0uz7DP9LKqPJ5Flw9YWT1P3hfqh4M+ziFOjPYkh6zPt4PBqiEgGsaQQ9aRTcJwZIiIRpKIgeDC97OF4JicAJRW4pzk9tdxNd6Bm59G4UEkDloiIzDfxebLhHo7zy/wsaNpY1l/qj9ZUXkF1oWrrMjbAr28i0z0cwmuNAajrH+1NA+/PLzs4zG8YjSC96Zf9u6FO1T3IGcS3vR+lABz9Djw12uvM0U4bUPPOSpzm2GFilOjDzLjncG3e8WV9d4w+vgayOoz7gTs0cB+H7fbAOzHw5gy8X0Nv4X/v6j/fPVqVkOu9NwAAAABJRU5ErkJggg=="
                    alt=""
                  />
                  <span class="fsc1"
                    >7天无理由退货（到店自取拆封后不支持）</span
                  >
                </div>
              </div>
            </div>
            <van-action-sheet v-model="view" title="服务说明">
              <div class="pop">
                <div
                  class="service-item layout"
                  v-for="(item, index) in goods_info[change_index]
                    .service_refound_policy_list.list_new"
                  :key="index"
                >
                  <img
                    class="service-icon"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <div class="service-text flex">
                    <div class="service-title">{{ item.title }}</div>
                    <div class="service-desc" v-if="item.desc">
                      {{ item.desc }}
                      <!-- item.desc要进行处理 -->
                    </div>
                  </div>
                </div>
                <div class="service-item layout">
                  <img
                    class="service-icon"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <div class="service-text flex">
                    <div class="service-title">运费说明</div>
                    <div class="service-desc">
                      由小米发货商品(不含有品),单笔满69元免运费;<br />由小米有品发货的商品,免运费;<br />由第三方商家发货的商品，运费以实际结算金额为准;<br />特殊商品需要单独收取运费,具体以实际结算金额为准;优惠券等不能抵扣运费金额;如需无理由退货,用户将承担该商品的退货物流费用;<br />使用门店闪送服务，需单独支付10元运费。
                    </div>
                  </div>
                </div>
              </div>
              <van-goods-action>
                <van-goods-action-button
                  type="danger"
                  text="确定"
                  @click="onClickButton"
                />
              </van-goods-action>
            </van-action-sheet>
          </div>
          <div
            class="blank_line offset-top-1px"
            style="height: 10.414rem; background: rgb(246, 246, 246)"
          ></div>
        </div>
      </div>

      <!-- 用户评论 -->
      <div class="section" v-if="comments">
        <div class="product_info_comment">
          <div class="comments-gallery">
            <div class="comments-title">
              <div class="comments-title-left">用户评价</div>
              <div class="comments-title-right">
                <span>{{ comments.detail.satisfy_per }}</span>
              </div>
            </div>
            <div class="comments-tags">
              <div
                class="comments-tags-text"
                v-for="item in comments.detail.comment_tags"
                :key="item.tag_id"
              >
                {{ item.tag_name }}
              </div>
            </div>

            <div class="swiper-wrapper">
              <div
                class="swiper-slide swiper-slide-active"
                v-for="item in comments.list"
                :key="item.user_id"
              >
                <div class="swiper-box">
                  <div class="comment-header layout align-center">
                    <div class="avatar-img-box">
                      <img :src="item.user_avatar" alt="" />
                    </div>
                    <div class="user-info flex">
                      <div class="name fz-xs">{{ item.user_name }}</div>
                      <div class="comment-date fz-xxs">{{ item.add_time }}</div>
                    </div>
                  </div>
                  <div class="comment-content">
                    <div class="text fz-xs">
                      {{ item.comment_content }}
                    </div>
                    <div class="photos">
                      <div
                        class="img"
                        v-for="(item, index) in item.image_infos"
                        :key="index"
                      >
                        <img class="lazy" :src="item.img_url" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide view-all">
                <div class="view-all-text">
                  查看全部
                  <img
                    src="https://m.mi.com/static/img/icon-view-all.a3001be51b.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="blank_line offset-top-1px"
            style="height: 10.414rem; background: rgb(246, 246, 246)"
          ></div>
        </div>
      </div>

      <!-- 米粉点评团 -->
      <div class="section" v-if="topic">
        <div class="product_info_content">
          <div class="topic-header ui-flex align-center justify-space-between">
            <div class="topic-title">米粉点评团</div>
            <div class="topic-more"></div>
          </div>

          <div class="topic-body ui-flex align-center topic-scroll">
            <div
              class="topic-item border-1px"
              v-for="item in topic"
              :key="item.id"
            >
              <div class="article-imgs">
                <div
                  class="img-count ui-flex align-center"
                  v-if="item.img_url_list.length > 1"
                >
                  {{ item.img_url_list.length }}
                </div>

                <div class="img-box">
                  <img class="blur-bg" :src="item?.img_url_list[0]" alt="" />
                  <img class="real-img" :src="item?.img_url_list[0]" alt="" />
                </div>
              </div>
              <div class="article-text">{{ item.name }}</div>
              <div
                class="
                  article-addition
                  ui-flex
                  align-center
                  justify-space-between
                "
              >
                <div class="article-author ui-flex align-center">
                  <div class="article-author-avatar">
                    <img :src="item.icon" alt="" />
                  </div>
                  <p>{{ item.nickname }}</p>
                </div>
                <div class="article-info ui-flex align-center">
                  <div class="article-nums view-num">{{ item.view_num }}</div>
                </div>
              </div>
            </div>
            <div
              v-if="topic.length > 2"
              class="topic-more layout column align-center justify-center"
            >
              查看更多
              <img
                src="https://m.mi.com/static/img/icon-arrow-right.5d0f572caf.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 商品轮播图 -->
      <div class="section" v-if="swiper">
        <div class="product_info_comment">
          <div class="swiper-container swiper-ads swiper-container-horizontal">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              :show-indicators="false"
            >
              <van-swipe-item v-for="item in swiper" :key="item.material_id">
                <img :src="item.img_url" alt="" />
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>

      <!-- 商品推荐+爆款推荐 -->
      <div class="section">
        <div class="product_info_rank">
          <div class="card-box">
            <div class="tab-header">
              <van-tabs v-model="active">
                <van-tab title="商品推荐" v-if="recommend_goods">
                  <van-swipe
                    class="my-swipe"
                    indicator-color="white"
                    :show-indicators="false"
                    :loop="false"
                  >
                    <van-swipe-item
                      v-for="(item, index) in recommend_goods_arr"
                      :key="index"
                    >
                      <div class="product-tab" style="width: 342px">
                        <CommodityDox
                          v-for="item in item"
                          :key="item.product_id"
                          :item="item"
                        />
                      </div>
                    </van-swipe-item>
                  </van-swipe>
                </van-tab>

                <van-tab title="爆款推荐" v-if="hot_recommend">
                  <van-swipe
                    class="my-swipe"
                    indicator-color="white"
                    :show-indicators="false"
                    :loop="false"
                  >
                    <van-swipe-item
                      v-for="(item, index) in hot_recommend_arr"
                      :key="index"
                    >
                      <div class="product-tab" style="width: 342px">
                        <CommodityDox
                          v-for="item in item"
                          :key="item.product_id"
                          :item="item"
                        />
                      </div>
                    </van-swipe-item>
                  </van-swipe>
                </van-tab>
              </van-tabs>
            </div>
          </div>
        </div>
        <div
          class="blank_line offset-top-1px"
          style="
            height: 10.414rem;
            background: rgb(246, 246, 246);
            margin-top: 379.14rem;
          "
        ></div>
      </div>

      <!-- 商品描述 -->
      <div class="section" v-if="description">
        <div class="description-view">
          <div class="tab-header border-bottom-1px">
            <!-- <span class="flex on">商品介绍</span> -->
            <span
              @click="clickDescription(index)"
              class="flex"
              v-for="(item, index) in description"
              :key="index"
              :class="{ on: index == description_index }"
              >{{ item.tab_name }}</span
            >
          </div>
        </div>
        <div class="tab-view">
          <div
            class="image_w_1080"
            v-for="item in description[description_index].page_info"
            :key="item.block_id"
          >
            <img :src="item.body.img_url" alt="" />
          </div>
        </div>
      </div>

      <!-- 商品推荐 -->
      <div class="section" v-if="recommend_goods">
        <div class="product_info_recommend">
          <div class="recommend-box">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-list">
              <RecommendGoodsItem
                v-for="item in recommend_goods"
                :key="item.product_id"
                :item="item"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <div class="no-data" v-else>
      <img
        src="https://m.mi.com/static/img/empty.37c0abdde7.png"
        alt=""
        class="empty"
      />
      <div class="desc">商品不存在或未上架</div>
      <div class="buttons">
        <div class="button router-link-active" @click="clickHomePage(`/`)">
          去首页
        </div>
        <div class="button" @click="clickReturnPreviousPage">返回上一页</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  ShareSheet,
  Toast,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
  Tab,
  Tabs,
  ActionSheet,
  Stepper,
} from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(ShareSheet);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(ActionSheet);
Vue.use(Stepper);

import CommodityDox from "@/views/Commodity/components/CommodityDox.vue";
import RecommendGoodsItem from "@/views/Commodity/components/RecommendGoodsItem.vue";
export default {
  name: "CommodityView",
  components: { CommodityDox, RecommendGoodsItem },
  data() {
    return {
      isClick: false, //点击分享
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ], //分享选择

      current: 0,
      active: 0, //默认选中状态

      // idx: 0, //选中状态

      data: null, //商品全部数据
      goods_info: null, //商品信息
      product_info: null, //产品信息
      comments: null, //评论

      sections: null, //米粉点评团+轮播图+描述
      topic: null, //米粉点评团
      swiper: null, //轮播图
      description: null, //描述
      description_index: 0, //描述索引
      list: null, // 排行榜
      welfare: null, //优选福利

      hot_recommend: null, //爆款推荐
      hot_recommend_arr: [], //爆款推荐数组
      hot_recommend_index: 0, //爆款推荐索引

      recommend_goods: null, //推荐商品
      recommend_goods_arr: [], //推荐商品数组
      recommend_goods_index: 0, //推荐商品索引

      choose: false, //点击选择产品
      view: false, //点击查看服务说明
      value: 1, //选中几件
      buy_option: null, //商品购买选择

      change_index: 0, //变化的index
      match_choose_arr: [],
      buy_option_color: [],

      change_id: null, //变化的id
      // produce_detail: [
      //   {
      //     name: "k40",
      //     version: [
      //       {
      //         version_name: "8+128",
      //         color: ["黑", "白", "红", "蓝"],
      //       },
      //       {
      //         version_name: "8+256",
      //         color: ["黑", "白", "红", "蓝"],
      //       },
      //       {
      //         version_name: "12+128",
      //         color: ["黑", "白", "红"],
      //       },
      //     ],
      //   },

      //   {
      //     name: "k40pro",
      //     version: [
      //       {
      //         version_name: "6+128",
      //         color: ["黑", "白", "红", "蓝"],
      //       },
      //       {
      //         version_name: "6+256",
      //         color: ["黑", "白", "红", "蓝"],
      //       },
      //       {
      //         version_name: "8+128",
      //         color: ["黑", "白", "红"],
      //       },
      //     ],
      //   },
      // ],
    };
  },

  mounted() {
    // 路由参数
    console.log(this.$route.params.id);

    // 发送请求
    this.axios({
      method: "get",
      url: "miproduct/view",
      params: {
        commodity_id: this.$route.params.id,
        pid: this.$route.params.id,
      },
    }).then((res) => {
      console.log("数据==>", res);

      //华振锋写的
      // let produceOption = res.data.data.buy_option;
      // for (var i = 0; i < produceOption.length; i++) {
      //   //如果有不同产品，添加不同产品的名称
      //   if (produceOption[i].name == "产品") {
      //     for (var j = 0; j < produceOption[i].list.length; j++) {
      //       this.produce_detail[j].name = produceOption[i].list[j].name;
      //     }
      //   }else if(produceOption[i].name == "版本"){
      //     // 获取不同版本
      //     for(var k = 0; k < produceOption[i].list.length; k++){

      //     }
      //   }
      // }

      if (res.data.data == null) {
        return;
      }
      this.data = res.data.data;
      this.goods_info = res.data.data.goods_info;
      this.product_info = res.data.data.product_info;
      this.comments = res.data.data.goods_share_datas.comments;
      this.sections =
        res.data.data.goods_tpl_datas[this.product_info.page_id].sections;
      this.related_recommend = res.data.data.related_recommend.data;
      if (res.data.data.hot_parts) {
        this.hot_recommend = res.data.data.hot_parts.parts;
      }
      this.buy_option = res.data.data.buy_option;

      // this.buy_option_version = this.buy_option[0].list;
      // console.log("version", this.buy_option_version);
      // this.buy_option_color = this.buy_option[1].list;
      // console.log("color", this.buy_option_color);

      //过滤数据
      for (var i = 0; i < this.sections.length; i++) {
        if (this.sections[i].body.title == "米粉点评团") {
          this.topic = this.sections[i].body.items;
        } else if (this.sections[i].body.w == 720) {
          this.swiper = this.sections[i].body.items;
        } else if (
          this.sections[i].body.items &&
          !this.sections[i].body.title
        ) {
          this.description = this.sections[i].body.items;
        } else if (this.sections[i].body.home_action) {
          this.list = this.sections[i].body;
        } else if (this.sections[i].components_name == "产品流量分发组件") {
          this.welfare = this.sections[i].body;
        }
      }

      if (res.data.data.hot_parts) {
        while (this.hot_recommend_index < this.hot_recommend.length) {
          this.hot_recommend_arr.push(
            this.hot_recommend.slice(
              this.hot_recommend_index,
              (this.hot_recommend_index += 6)
            )
          );
        }
      }
    });

    this.axios({
      method: "get",
      url: "miproduct/recom",
      params: {
        product_id: this.$route.params.id,
      },
    }).then((res) => {
      this.recommend_goods = res.data.data.related_recommend.data;

      //处理数据
      while (this.recommend_goods_index < this.recommend_goods.length) {
        this.recommend_goods_arr.push(
          this.recommend_goods.slice(
            this.recommend_goods_index,
            (this.recommend_goods_index += 6)
          )
        );
      }
    });
  },

  methods: {
    onChange(index) {
      this.current = index;
    },

    // 点击分享
    onSelect(option) {
      Toast(option.name);
      this.isClick = false;
    },

    //点击返回
    clickReturn() {
      this.$router.back();
    },

    //点击描述
    clickDescription(index) {
      this.description_index = index;
    },

    //点击选择产品
    clickChoose() {
      this.choose = true;
    },

    //点击查看服务说明
    clickView() {
      this.view = true;
    },
    //点击取消查看服务说明
    onClickButton() {
      this.view = false;
    },

    //点击选择版本
    clickVersion(version) {
      console.log(version);

      this.change_id = version;
      this.match_choose_arr = [];
      this.buy_option_color = [];

      for (var i = 0; i < this.goods_info.length; i++) {
        if (version == this.goods_info[i].prop_list[0].prop_value_id) {
          this.match_choose_arr.push(this.goods_info[i]);
        }
      }
      console.log(this.match_choose_arr);

      for (var i = 0; i < this.match_choose_arr.length; i++) {
        for (var k = 0; k < this.buy_option[1].list.length; k++) {
          if (
            this.match_choose_arr[i].prop_list[1].prop_value_id ==
            this.buy_option[1].list[k].prop_value_id
          ) {
            this.buy_option_color.push(this.buy_option[1].list[k]);
          }
        }
      }
    },
    //点击选择颜色
    clickColor(color) {
      console.log(color);
    },

    //点击返回首页
    clickHomePage(url) {
      this.$router.push(url);
    },
    //点击返回上一页
    clickReturnPreviousPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
// 选择商品类型开始
.pop {
  padding: 0px 16.667px 66.146px;
  width: 341.667rem;
  background-color: #fff;
  color: #000;
  height: 450.518rem;
  text-align: left;
  margin: 0 auto;
  .pro-info {
    padding: 16.667rem 0 10.417rem;
    .product-img {
      width: 86.977rem;
      height: 86.977rem;
      text-align: center;
      background: #fff;
      overflow: hidden;
      border-radius: 5rem;
      background: rgba(0, 0, 0, 0.04);
      img {
        width: 73.438rem;
        height: 73.438rem;
        margin: 6.771rem auto;
      }
    }
    .product-desc {
      width: 238.031rem;
      height: 86.977rem;
      margin: 0 0 0 16.667rem;
      text-align: left;
      .product-price {
        display: flex;
        align-items: baseline;
        margin-top: 19.271rem;
        .cur-price {
          color: #ff5934;
          font-size: 18.75rem;
          font-weight: 900;
        }
        .origin-price {
          margin-left: 5.729rem;
          color: rgba(0, 0, 0, 0.3);
          text-decoration: line-through;
          font-size: 12rem;
        }
      }
      .name {
        height: 33.328rem;
        line-height: 16.664rem;
        font-size: 12rem;
        color: #000;
        margin-top: 12.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .max5 {
    max-height: 343.75rem;
    padding-bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;

    .option-title.tit-sub {
      margin-bottom: 20.833rem;
    }

    .ywb {
      .option-title {
        margin-bottom: 20.833rem;
      }
      .ywb-row {
        padding-bottom: 5.208rem;
        .option-title-sub {
          margin-top: 12.5rem;
          .service-icon {
            width: 12.5rem;
            height: 12.5rem;
            margin-right: 4.167rem;
            position: relative;
            top: -1.042rem;
          }
          .tit {
            font-weight: 400;
            margin-right: 7.813rem;
          }
          .service-url {
            display: flex;
            position: absolute;
            right: 0;
            top: 0;
            width: 61.453rem;
            height: 12.5rem;
            justify-content: space-between;
            img {
              width: 12.5rem;
              height: 11.977rem;
            }
            span {
              color: rgba(0, 0, 0, 0.3);
              font-size: 12rem;
              font-weight: 400;
            }
          }
        }

        .options-group {
          .option-item {
            text-align: left;
            position: relative;
            .addition-tips {
              position: absolute;
              top: 0;
              right: 12.641rem;
              height: 14.063rem;
              line-height: 14.063rem;
              margin-top: -0.5em;
              color: #ff5934;
              background: #ffe4d1;
              font-size: 12rem;
              &::before {
                position: absolute;
                content: "";
                left: -6.25rem;
                top: 0;
                width: 6.766rem;
                height: 14.063rem;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAABQCAYAAACETVz/AAAFC0lEQVRo3s3abWjVZRjH8bNNm5qi2Uq0F4VaWIhI6DsDsyCDIKFILFEoMOpVFAhlhSQFWUJJRPaioHycBJFED/hA9qDp2M51/XfW1slN97/u+2w7y5ypqem+vfifcsM193R27gPn3Xnx4b7/97mv/++6UqlR/gDlkK3ER3fidRlO1+KizZh8htOfMG3E1GFyEtMjONkxGqgK/qibQq72LmJZipOnMFmHk3dxsh1Lf4vJYZxmMG3FJI/T0zg5h0kdTnYWC1ZGNluJ/XwjcWY2JksweQ4vn2CaxukZTC5hwjW+EabVxUKOxdJ34NJPYvopTmoxOY5JHpOzmFzGtHvUkUAZp/QGrG4+PlqJk404+RqTE5heGACoeEigAl8zgdbaGeSixXh5CSffY3JqgKs1CsiuzFRy9Qvx0euY7MfkBE67sPSlYQKHjwTKadeZWPQYlt6CSV2yesOGjQySlpZx5BumY7IKk92FVeseYeDQkUA5lpmP6cs4+a5wYosBHDwSqCDfOAmT+zDdgNPDya1QFNwQkSePTaYjMx+nH2KaLTJu8EignFy0GEt/hEkTJueCQpLNVuKjBZhuwORY4cYgGCQ1NWNprZ2RHBI9NIq4QSDbo1mYrMbJQeJ0V1BIoIJc7U04WUGsn2PSUQLgtZDxeHx6EV63FPGPeuhIoIz25mm4aGPyo5IB+0H6piraMksw2Z8UCiUD9o0EyvDRApysx0lLiYFXI4GypKKW1Tg5isnp8JAtLeNoa5iL6aYRrAdHGOlrqsjJMzjZGwDuaiRQQUdmNk53YerDRPqaKnz9A5jUYnIxTGQczUuShCBO9P8gLXoIr9WYdAaJhOoKvK7BtAFLnwsUGY/HpV/F9HyJr8B+kMkrwXtJ9BEUsAfSRcsx3RUgsAfS9BVM9oWO/ADTI4Ej5QtMGsNGOj2KiQt9u3/D5PfQV7INp3+GjuzC5HzoyPOBFLj9nu6LOAkc6eRsYDVkn9vdWYAGjWwtQtY94sgGXMmyngEifbQfJ82hr+Q2TCVwZPQWJj+E/hf0LCZ7Qt/u+zH9OGzk8YbpOH0Tp93hImkZh0UvYJHH5EK44UCsj+P0YAChaX9ZkNyDRe8EWKH3RDbcio9WYtIU2LPZK1WbgK9dgJN9gSS8feaTZXQ23YKXt3FSHyQylUqlyDdOwstSnGwrFMHd4SE5MCbpgulaTOJA3nv6bJGUk9MHMdmBSXuQyKTpqTPJ1a/CqWDyd5hIspV4nYPTXTjNBYosTErFugan3wSJTKCZ6/A6B5MXidMZTM4Eh7zSZ8wswulmTH4lLknxMYDJgY6OicSN8zDZWaIm1ACQUM7JY5MxeRSnW5NtH9VIZoDTLFBOnJlKrn4VJocKMeHloJCpVCpFdXUFrdEsYn0imbuVv4JDplKpFG1yfTLlp0/jZTdO8qNQyQ9+oA4opzmaRlu0HCd7iKW5yNNWQ5z6O3BgDL6pinzD3fjo/cJYWFjIHv3xieTq78XJekx/xLQzKGSv7W+VucS6Fidf4bSl8DJ3MRjkldkNuRmfXlTomX+PpfNBIf+7QlvqpiTNfVmByRuYfInTeJjt6SIOw8d1txNHK3G6vdDMMuL0qcL93x0GMputTG6pX27D6zK8vlZ4Zk/gBlVIFw/ZC3y8YTqtdQvx9Y9g6efxuinJRGUvJoKJw+lpTC4RlwjZ+9n1E2iPZtGmD+NlHV63Jo+D/ptDdfeF/Aep+yJiGL+uowAAAABJRU5ErkJggg==)
                  no-repeat;
                background-size: 100% 100%;
                text-decoration: inherit;
                vertical-align: inherit;
                box-sizing: inherit;
              }
              &::after {
                position: absolute;
                content: "";
                right: -13.021rem;
                top: 0;
                width: 13.016rem;
                height: 20.828rem;
                background: url(https://m.mi.com/static/img/right.d1c4eafa4c.png)
                  no-repeat;
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
    .option-title,
    .option-title-sub {
      display: flex;
      position: relative;
      margin-top: 20.833rem;
      margin-bottom: 12.5rem;
      line-height: 12.5rem;
      font-size: 12.5rem;
      color: #000;
      font-weight: 700;
    }
  }

  .options-group {
    .option-item {
      font-size: 12px;
      min-width: 65.102rem;
      box-sizing: border-box;
      padding: 7.813rem 12.5rem;
      text-align: center;
      margin: 0 12.5rem 12.5rem 0;
      overflow: visible;
      border-radius: 20.422rem;
      border: 1.039rem solid transparent;
      background: rgba(0, 0, 0, 0.04);
      &.on {
        color: #f56600;
        border: 1.039rem solid #ff5934;
        border-radius: 20.422rem;
        background: rgba(255, 89, 52, 0.08);
      }
    }
  }

  .service-item {
    margin: 22.917rem 0;
    position: relative;
    .service-icon {
      width: 12.5rem;
      height: 12.5rem;
      margin-right: 8.333rem;
    }
    .service-text {
      .service-title {
        font-size: 12.5rem;
        line-height: 12.5rem;
      }
      .service-desc {
        margin-top: 8.333rem;
        color: rgba(0, 0, 0, 0.5);
        font-size: 12rem;
      }
    }
  }
}
// 选择商品类型结束

// 服务说明开始

// 服务说明开始
.app-view {
  background: #fff;
  color: #3c3c3c;
}
.no-data {
  .empty {
    display: block;
    margin: 142.188rem auto 31.25rem;
    width: 166.664rem;
    height: 135.414rem;
  }
  .desc {
    font-size: 14.5833rem;
    color: #737373;
    text-align: center;
  }
  .buttons {
    margin: 25rem auto 0;
    width: 210.938rem;
    display: flex;
    justify-content: space-between;
    .button {
      width: 96.438rem;
      line-height: 29.164rem;
      font-size: 14.0625rem;
      text-align: center;
      border-radius: 28px;
      border: 1px solid #bababa;
      color: #7a7a7a;
    }
  }
}
.app-product-container {
  position: relative;
  padding-bottom: 62.5rem;
  // 顶部开始
  header {
    height: 46.875rem;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.5);
    // background: transparent; //透明
    .fill-height {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-btn {
        margin: 0 10.417rem;
        .image-icons {
          display: inline-block;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
          // background-color: transparent; //透明
        }
        .icon-back-left {
          width: 41.977rem;
          height: 41.977rem;
          background-image: url(https://m.mi.com/static/img/icon-back3.cee4a42398.png);
        }
        .icon-back-right {
          width: 41.664rem;
          height: 41.664rem;
          background-image: url(https://m.mi.com/static/img/icon-share-white.10afb8d45d.png);
        }
      }
      .placeholder {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin: 0 8.333rem;
          font-size: 13.1771rem;
          padding-bottom: 6px;
          position: relative;
        }
        .current {
          color: #ff5934;
          font-weight: 700;
          font-size: 13.1771rem;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 13.539rem;
            height: 2.602rem;
            margin-left: -6.771rem;
            background-color: #ff5934;
            border-radius: 2.602rem;
            overflow: hidden;
          }
        }
      }
    }
  }
  // 顶部结束

  // 头部商品轮播图开始
  .product_info_product_gallery {
    margin-top: -50px;
    .gallery-view {
      height: 412.5rem;
      width: 100%;
      background: #333;
    }
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 412.5rem;
    text-align: center;
    background-color: #39a9ed;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 5.208px 7.813px;
    font-size: 12px;
    color: #fff;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  //头部商品轮播图结束

  // 商品价格开始
  .product_info_product_price {
    margin-top: 11.458rem;
    .layout {
      display: flex;
      align-items: baseline;
      justify-content: flex-start;
      .price {
        padding-left: 10.417rem;
        span {
          font-size: 12.5rem;
        }
      }
      .cur-price {
        color: #ff6700;
        font-size: 25rem;
        font-weight: 700;
      }
      .origin-price {
        color: rgba(0, 0, 0, 0.54);
        font-size: 12.5rem;
        text-decoration: line-through;
      }
    }
    .coupon-active {
      text-align: left;
      .overview-promotion {
        background-color: #fff2ef;
        padding: 6.25rem 6.25rem 1.042rem;
        border-radius: 2rem;
        margin: 8.333rem 16.667rem;
        font-size: 12rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .overview-promotion-left {
          max-width: 270.828rem;
          max-height: 43px;
          overflow: hidden;
          .cur-active {
            display: inline-flex;
            color: #ff6900;
            font-size: 12rem;
            border: 1px solid #ff6900;
            margin-left: 5.208rem;
            margin-bottom: 5.208rem;
            align-items: center;
            border-radius: 2rem;
            height: 17px;
            .act-desc {
              color: #fff;
              padding: 0 2.604rem;
              background-color: #ff6900;
              white-space: nowrap;
              height: 17px;
              display: inline-flex;
              align-items: center;
              margin-left: -1px;
              border-top-left-radius: 2rem;
              border-bottom-left-radius: 2rem;
            }
            .act-title {
              padding: 0 2.604rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .overview-promotion-right {
          width: 41.664rem;
          color: #fff;
          margin-bottom: 4.167rem;
          font-size: 12rem;
          line-height: 18.75rem;
          background: #ff6900;
          border-radius: 2rem;
          text-align: center;
        }
      }
    }
  }
  // 商品价格结束

  // 商品名称开始
  .product_info_product_name {
    .overview {
      .goods-name {
        line-height: 25rem;
        color: #000;
        font-weight: 700;
        font-size: 16.667rem;
        margin-top: 8.333rem;
        margin-bottom: 8.333rem;
      }
    }
  }
  // 商品名称结束

  // 商品介绍开始
  .product_info_product_desc {
    .overview-goods-brief {
      line-height: 18.75em;
      color: rgba(0, 0, 0, 0.54);
      display: flex;
      word-break: break-all; //在合适的点换行
      overflow: hidden; //超出部分隐藏
      text-overflow: ellipsis; //设置或检索是否使用一个省略标记（...）标示对象内文本的溢出
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .overview-sell-point {
      margin-top: 6.25rem;
      margin-bottom: 14.583rem;
      .sell_point_desc {
        text-align: left;
        color: #000;
        margin-bottom: 8.333rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        .img {
          display: inline-block;
          width: 12.5rem;
          height: 12.5rem;
          margin-right: 5.208rem;
        }
        .img1 {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAxlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADa+ousAAAAQXRSTlMAAQIDBAcREhQXGBkaHR4hIiktNDY/QkpSVFpjaGtydnd4iIuQkpecnaaqra6ytLa9wMXIzM7S09nd3+Lt9Pf7/eNQAgYAAAFFSURBVDjLjZTZWoMwEEYHTFqouABhU0QWKwiCiqACWuv7v5QXVkkgn2TumJxkFv4ZgNGwaoR52w1dm4eGioFnyIqLKvE9m9ien1RFbKEZI+lpExHt9wBpJGpSXWIh2emz1eTiKusdmXYoQe3O30duHSgUtC1NmZOqbJbbP0wOyjXwbV0Gh+uSU5t0HO2M+jJr56cEvXepcMfXj890ULfXAQBQmo2J44vX3deeKSFLEQBYzdiCk/vPj7f3PduQxgLAcTR67nZPl8YLS0EUY1ALMjpurk6l8ylFChWMSmOdM0qrDAgTtEChJITchwUK/Bxab5HyWujsRcruYCCLFBkE3xLLS6xGsX6J9Z75j1yKFCqrCS4VxZjVF49aNdZUq3PqoNWJ7mFz+8DR/XSGjpQNb4bE5lFwtgX3hODOEdxfgrvw/736DUsmLY4YpirTAAAAAElFTkSuQmCC)
            no-repeat;
          background-size: 100% auto;
        }
        .img2 {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAADwUlEQVRYR83YWajuUxgG8N8xi0yJwoUxhAi5MXYkQ8a44EaU8cgUGYvMFDJPJzIWOjJmng65ERIZyhBC6GTIUDiGHr3f59ufvb//+s7Zaf9v9vBf71rPetfzPO+7/rOM9yyLVbAG9sI22BArY2n8jh/wIV7H4/gG3+PX1qVmNQ5cCttjT2yEgHsPH2EBvsVPWBGrYXVsgE0LzAd4Aq9gYdeaXaDyfhOcgq0wD8/j88rAqAWykWR0HczGQXgTV+B9/DUVuFGglsAeuL6AnIrvunY54v2quLwAHocn8edk46cClfQfigNrZ4+0pL0BcLK3b2X+AdxZxz8hdDJQAXQO1sX5eGOqHTWAmGxITmDrWuOTWiO87D/DoBJwEnbBYUXgRVy7MyyCuB0v4qrBjQ+Cyu9R19k4Ea91TvvvgBWwTE0cFf7RGLstrsZFpc5/yD8IKvKNr0RpDzUcWfixJXbFxmUH8ako81m83OBNOZn9i7fxvdhMH1QWuKn+PrqB1NnMMTgNa5dx9pITRX2Nu3Bm4+ZuLovInAt7mdq50O7WIPvExHPurUy8iwfLxePsO2IfrFQkvqDhOGMXz9Qpzc8CcefzqhRc2sCF9UqRye61uAQ/DsQtWaDjSTHP3YvMXVOfUSXs3IBaEzfgMrzaFYmTcSXm42B8NUnMcgX4CNyG/JzSwSt+O5yOOQG1Re32KHzZAOpuHFJOf8KI8XNwHV6o4/ylY+61cEt4GFBBF8MMKTuLJfbD+lVcR2X2cNxaoOLiP3eACh1ChQUBdX/Vtqhvup4sEENMtqLCGHHX8WXtqG92QKWMXFwdwHSBin/dg83Khx5unDiqPiug0hMdWdlqjB05LD1VlBeOPo29G2mRSdPizA2oz0rCLcrrAp1ji6GmVKVnOqDm74rrvY8C501nplIyYhfxvFT9VIanWtHUuH6mpoNTMcx41jVVctIQzm0k9yDuPqemQ30ppgEUI76wSlaLvQwnsq++cX1qeKIdcAdifqlzIflvYx5bhk/wqXEdfXC9zfFcmW98LiTvMsmp8E5w9HFrX2/S9F83Yic8hmPxxSJkaFB5/do3bpeQSdJq5MjCpZeq4H68GIASOqFLyD/G6aeWx6PVx79VXvTpYgL6Tz/VI1lr5xmVHV9yfxtdGYpnpQ6+MwXwEHzSzjPjW3v0+6ovb01OeJbCnCv78DOyR8/g1ttMvhGk7W19Yg+53+WWM/x03mYSMOPufb1dzLgb8iCwGfUtoQdsxn116QGbcd+nBpUyo77kDUv4f/nm+TftVA9F6RcZzAAAAABJRU5ErkJggg==)
            no-repeat;
          background-size: 100% auto;
        }
        .img3 {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAD5klEQVRYR83YaajtUxgG8N+VIfM8k7kMkZAyhSsylKuo++USHwxdY5kJUWZChowlIXQJH1BKfOCDzIRCmaduhihE6Dnes9vn2Pv813bP1V51ap/+a3jWs973eZ+15hitrYA1sB4Oxa7YGqtjOfyOH/EhXsVT+BY/4LfWpeY0dlwWe+EQbIOAew8fYTG+w89YBWthHWyF7QrMB3gaL+KPrjW7QOX7tjgTO2MRnsPnxcBMC2QjYXQTzMVReAPX4338NQzcTKCWwcG4tYCche+7djnD9zVxXQE8Gc/gz0H9h4EK/cfgyNrZky20NwAOe4cX84/ivjr+KUMHgQqgi7E5LsNrw3bUAGJQl5zALrXGx7VG4rLXpoPKgDOwH46tAP6Pa3cOS0Lci+dxY//G+0Hld7LrQpyOVzqn/adDNrIScjS/1l/jULvhJlxe2TkR/P2gkr7RlWTa4w1HthoOqqPYoIBFj97GE5WhXeCyoSMqbqN7kZkeqOzy9vr/xIag3rCCNOIZMe3f3C94Cxfh2S5UxfAdJREnZe3JyfYttAc2pP3GFQeb4U1kwtdLzaPu2dTeFY974rMGYJGLbCCn9EJARZ0vrVJwVccEK+K2SoKHa5Ivpo3JfOfj7BLLAxrj7Lxi/ZKAWr8Wuhovd4CKTFxRJWRh1bdBQ3bCg9i+6mOY7Gq741wsDKgdcSVOwJddIxu/J+YeqWNMAKfudbWNcGdYDqigi2CG8s5i2TVzfU+dDFPJ6LCWjOxqSbaQszigsqMU2WTfbLRMHp1LnH7ChBYlI1tasm9uQKWMJE7iAJa0rVzMn4rlkWx+aYRJ4yQuCKh4ouOLrRHGT3QNC9eUj4peRSYCJgwlHB6ayaIMWCwW566A+rS8TlfmDQK8Rx17zF0UPvUscybbAjahMdQ3DZgwGbhoSZlKzUvWpFyEoU0R37V/iWeK+/0j0N9jajZjKutHPBOjpxVrWzSqesb2Ymq2sy+Tx59HEnIc5+DaRrZ62bc0dCphcTNie3N8RzeAmqJTS0PRgyHFNQzFix/WEPBTFH2U2rc24ihiTXK3G9bC1C2pY+Uuj2tgakrta3UJybD5dSzv1O9vhiwWC/NAxVQ08O4GUFNcQvq3+qnUsghijjwu9RTE/Pe3iOgNWICvsAN+6gD1Lz+V/qM4z9jXBHHMXm7Gj5WNzZGFoXlYt8Cm77sdgLL2QOeZcaN49FyRwtI+2LLEM3PkcpkSk3viPQ3uYEaPnglHvc2sWlfysJLMyQPH14gTTenK20JX67zNZIKxu/dN7mrsbsj9wMbqLWES2Ni9ukwCG7v3qf7MGauXvOkp/b+8ef4NSw8NRWUUUyUAAAAASUVORK5CYII=)
            no-repeat;
          background-size: 100% auto;
        }
      }
    }
  }
  // 商品介绍结束

  // 商品关键参数开始
  .product_info_class_parameters {
    .classic-param {
      padding: 0;
      text-align: center;
      color: #000;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      margin-top: 14.583rem;
      overflow-x: auto;
      overflow-y: hidden;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: start;
      justify-content: flex-start;
      .classic-param-item {
        min-width: 79.172rem;
        padding: 16.667rem 4.167rem;
        border: none;
        img {
          display: block;
          margin: 0 auto;
          width: 15.625rem;
          height: 15.625rem;
          margin-bottom: 2.083rem;
        }
        .classic-param-item-name {
          padding: 4.167rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .classic-param-item-value {
          padding: 4.167rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  // 商品关键参数结束

  // 商品排行榜开始
  .rank-info {
    display: flex;
    padding: 14.583rem 10.417rem 14.583rem 15.625rem;
    height: 16.661rem;
    background: url(https://m.mi.com/static/img/rank-list-bg.6cc4bce178.png)
      no-repeat;
    background-size: 100% 100%;
    .info-left {
      margin-right: 12.5rem;
      width: 65.102rem;
      height: 16.141rem;
    }
    .info-right {
      display: flex;
      flex: 1;
      align-items: center;
      .right-text {
        flex: 1;
        font-size: 12.5rem;
        line-height: 12.5rem;
        color: #000;
        text-align: left;
      }
      .right-icon {
        margin-left: auto;
        display: block;
        width: 18.75rem;
        height: 18.75rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAABrklEQVRoQ+2ZyUpEMRBFTzt8gK4UnHUjCOL/f4RLN46tGxf6Ac5cMBKCkLeoSqeLBBqaziOvTu6tVJKeEbjNArMx4JZV3aHcUK7DGRi27FCUSSEN5SZNU4cPDeU6FGVSSNbKrQDbwCbwCjwDH5MicXjIGm4LOIO/PesjcAu8OcReHdIa7hTYyd76BTwB18BnNRrjB6zhZMcLQPbM2z1wAwi2WbOG03h7wCGwXlDMgbuWFrWGE88qsAucZLmn35NFpWCTRcYDLgl28A+g+mRR5eC3tz894RS7APUpLSpAfd49Ab3hZNGUg/qemiyayoSbRb3hBKN3JIvmQsmWyaIuAraAS4EfAfvAWkGiFVSQ5gq2hJMtBScVc4tKwQePHGwJJ8FU3FUDpWLelIMCVJkwW0VbwyWg418VSwUvgRerBFwUnErDObBRgGgferXscCGVC5tzoVfLkHUu7A4l9N4y7KlAOxEt+WUtXerzXNiTeOg7lNC3X6HvLUPfOIf+r8DqtGIyzqLOcybB1wYZcLUZ6rV/KNerMrW4hnK1Geq1fyjXqzK1uIZytRnqtT+0cj91gmA4iskT1QAAAABJRU5ErkJggg==);
        background-position: 50%;
        background-size: contain;
      }
    }
  }
  // 商品排行榜结束

  // 商品版本开始
  .product_info_choose_version {
    .padding-26-0-0-32 {
      padding: 13.542rem 0 0 16.667rem !important;
    }
    .padding-16-32 {
      padding: 8.333rem 16.667rem !important;
    }
    .mr1x {
      margin-right: 4.167rem;
    }
    .more::after {
      content: "";
      position: absolute;
      top: 13.542rem;
      right: 10.417rem;
      margin-left: auto;
      display: block;
      width: 18.75rem;
      height: 18.75rem;
      border-color: hsla(0, 0%, 64%, 0.8);
      transform: translateZ(0);
      border: none;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAABrklEQVRoQ+2ZyUpEMRBFTzt8gK4UnHUjCOL/f4RLN46tGxf6Ac5cMBKCkLeoSqeLBBqaziOvTu6tVJKeEbjNArMx4JZV3aHcUK7DGRi27FCUSSEN5SZNU4cPDeU6FGVSSNbKrQDbwCbwCjwDH5MicXjIGm4LOIO/PesjcAu8OcReHdIa7hTYyd76BTwB18BnNRrjB6zhZMcLQPbM2z1wAwi2WbOG03h7wCGwXlDMgbuWFrWGE88qsAucZLmn35NFpWCTRcYDLgl28A+g+mRR5eC3tz894RS7APUpLSpAfd49Ab3hZNGUg/qemiyayoSbRb3hBKN3JIvmQsmWyaIuAraAS4EfAfvAWkGiFVSQ5gq2hJMtBScVc4tKwQePHGwJJ8FU3FUDpWLelIMCVJkwW0VbwyWg418VSwUvgRerBFwUnErDObBRgGgferXscCGVC5tzoVfLkHUu7A4l9N4y7KlAOxEt+WUtXerzXNiTeOg7lNC3X6HvLUPfOIf+r8DqtGIyzqLOcybB1wYZcLUZ6rV/KNerMrW4hnK1Geq1fyjXqzK1uIZytRnqtT+0cj91gmA4iskT1QAAAABJRU5ErkJggg==);
      background-size: 100% auto;
    }
    .card-box {
      .product-section-box {
        .product-section {
          text-align: left;
          // line-height: 33.286rem;
          .ui-flex {
            display: flex;
            -webkit-box-pack: start;
            justify-content: flex-start;
            .title {
              color: #000;
              margin-right: 20.833rem;
              min-width: 26.039rem;
              font-weight: 500;
              padding-bottom: 13.542rem;
            }
            .flex {
              -webkit-box-flex: 1;
              flex: 1 1 auto;
              .info {
                position: relative;
                width: 100%;
                padding-bottom: 13.542rem;
                color: #000;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                font-family: Arial, Avenir, sans-serif;
                .display-flex {
                  display: flex;
                  align-items: center;
                  .pro-name {
                    max-width: 260.414rem;
                    margin-right: 2.604rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  .location-icon {
                    width: 16.664rem;
                    height: 16.664rem;
                    margin-right: 3.125rem;
                  }
                  .mr1x {
                    margin-right: 4.167rem;
                    flex-shrink: 0;
                  }
                  .on {
                    flex-shrink: 0;
                    color: #ff5934;
                    margin-right: 2.604rem;
                  }
                }
              }
            }
            .sendto {
              padding-bottom: 13.542rem;
            }
            .right-icon {
              margin-right: 10.417rem;
              margin-left: auto;
              display: block;
              width: 18.75rem;
              height: 18.75rem;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAABrklEQVRoQ+2ZyUpEMRBFTzt8gK4UnHUjCOL/f4RLN46tGxf6Ac5cMBKCkLeoSqeLBBqaziOvTu6tVJKeEbjNArMx4JZV3aHcUK7DGRi27FCUSSEN5SZNU4cPDeU6FGVSSNbKrQDbwCbwCjwDH5MicXjIGm4LOIO/PesjcAu8OcReHdIa7hTYyd76BTwB18BnNRrjB6zhZMcLQPbM2z1wAwi2WbOG03h7wCGwXlDMgbuWFrWGE88qsAucZLmn35NFpWCTRcYDLgl28A+g+mRR5eC3tz894RS7APUpLSpAfd49Ab3hZNGUg/qemiyayoSbRb3hBKN3JIvmQsmWyaIuAraAS4EfAfvAWkGiFVSQ5gq2hJMtBScVc4tKwQePHGwJJ8FU3FUDpWLelIMCVJkwW0VbwyWg418VSwUvgRerBFwUnErDObBRgGgferXscCGVC5tzoVfLkHUu7A4l9N4y7KlAOxEt+WUtXerzXNiTeOg7lNC3X6HvLUPfOIf+r8DqtGIyzqLOcybB1wYZcLUZ6rV/KNerMrW4hnK1Geq1fyjXqzK1uIZytRnqtT+0cj91gmA4iskT1QAAAABJRU5ErkJggg==);
              background-position: 50%;
              background-size: contain;
            }
          }
        }
      }
      .product-section {
        position: relative;
        text-align: left;
        .ui-flex {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: start;
          justify-content: flex-start;
          flex-wrap: wrap;
          .flex {
            -webkit-box-flex: 1;
            flex: 1 1 auto;
          }
          .service-policy-item {
            display: flex;
            align-items: center;
            font-size: 12.5rem;
            line-height: 20.828rem;
            margin-right: 16.667rem;
            flex: 0 1 auto;
            .img-icon {
              height: 12.5rem;
              width: auto;
            }
          }
          .fsc1 {
            font-size: 12rem;
            color: rgba(0, 0, 0, 0.54);
          }
        }
      }
      .sevice-section {
        line-height: 20.823rem;
      }
    }
  }
  // 商品版本结束

  // 商品活动开始
  .overview-flow-distribution {
    margin-top: 14.583rem;
    margin-bottom: 14.583rem;
    span {
      display: inline-block;
      height: 20.828rem;
      line-height: 20.828rem;
      color: #444;
      background-color: #f0f0f0;
      padding: 0 15.625rem 0 6.25rem;
      border-radius: 10px;
      position: relative;
      font-size: 12.5rem;
      &::after {
        content: " ";
        position: absolute;
        right: 0.1rem;
        top: 5.1rem;
        width: 10.414rem;
        height: 10.414rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAjVBMVEUAAAAAAAAAAABAQEAzMzNVVVVJSUlAQEA5OTlNTU1GRkZOTk5FRUVJSUlHR0dFRUVHR0dHR0dERERFRUVERERGRkZHR0dERERERERFRUVERERFRUVERERFRUVERERFRUVFRUVFRUVERERERERERERFRUVERERERERERERERERERERERERERERERERERESluIAtAAAALnRSTlMAAQIEBQYHCAkKCw0aKjZKVl1iaGlxc3V4eoCBg5GVmMPl6evt7vDy9Pb3+Pr7uAalLgAAAHZJREFUKM9jYBg2gFdBjAWfvLyerigHHnl+JT1dSW7c8szCKnpq4ux4FEhq6WkKMuFWwCqlrqchhMcEVgl1PVURNtwKOGW09ZQFGHEr4JLT0VPmw+NLHkU9PVmy9ROwn4D7WaXx+p9A+BEKf0LxRyj+CaWfIQkAaiYMEsvzCYIAAAAASUVORK5CYII=)
          no-repeat;
        background-size: contain;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: box;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  // 商品活动结束

  // 用户评论
  .product_info_comment {
    .comments-gallery {
      padding: 5.208rem 16.667rem 18.75rem;
      width: 341.667rem;
      overflow: hidden;
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      .comments-title {
        height: 37.5rem;
        line-height: 37.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .comments-title-left {
          color: #000;
          font-size: 14.5833rem;
          font-weight: 700;
        }
        .comments-title-right {
          color: #7f7f7f;
          font-size: 12.5rem;
          padding-right: 13.021rem;
          &::after {
            content: "";
            position: absolute;
            right: -5.729rem;
            top: 50%;
            width: 18.75rem;
            height: 18.75rem;
            transform: translate3d(0, -50%, 0);
            -webkit-transform: translate3d(0, -50%, 0);
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAABrklEQVRoQ+2ZyUpEMRBFTzt8gK4UnHUjCOL/f4RLN46tGxf6Ac5cMBKCkLeoSqeLBBqaziOvTu6tVJKeEbjNArMx4JZV3aHcUK7DGRi27FCUSSEN5SZNU4cPDeU6FGVSSNbKrQDbwCbwCjwDH5MicXjIGm4LOIO/PesjcAu8OcReHdIa7hTYyd76BTwB18BnNRrjB6zhZMcLQPbM2z1wAwi2WbOG03h7wCGwXlDMgbuWFrWGE88qsAucZLmn35NFpWCTRcYDLgl28A+g+mRR5eC3tz894RS7APUpLSpAfd49Ab3hZNGUg/qemiyayoSbRb3hBKN3JIvmQsmWyaIuAraAS4EfAfvAWkGiFVSQ5gq2hJMtBScVc4tKwQePHGwJJ8FU3FUDpWLelIMCVJkwW0VbwyWg418VSwUvgRerBFwUnErDObBRgGgferXscCGVC5tzoVfLkHUu7A4l9N4y7KlAOxEt+WUtXerzXNiTeOg7lNC3X6HvLUPfOIf+r8DqtGIyzqLOcybB1wYZcLUZ6rV/KNerMrW4hnK1Geq1fyjXqzK1uIZytRnqtT+0cj91gmA4iskT1QAAAABJRU5ErkJggg==)
              50%;
            background-size: 100% auto;
          }
        }
      }
      .comments-tags {
        margin-top: 6.25rem;
        margin-bottom: 8.333rem;
        min-height: 31.789rem;
        overflow: hidden;
        .comments-tags-text {
          background-color: #ffeeea;
          font-size: 12rem;
          line-height: 12rem;
          padding: 4.688rem 8.333rem;
          margin-right: 10.417rem;
          margin-bottom: 10.417rem;
          display: inline-block;
          color: #494a4b;
          border-radius: 6rem;
        }
      }
      .swiper-wrapper {
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: content-box;
        & > .swiper-slide:first-child {
          margin-left: 0;
        }
        .swiper-slide {
          width: 286.453rem;
          margin-left: 8.333rem;
          .swiper-box {
            overflow: hidden;
            width: 248.862rem;
            box-sizing: border-box;
            padding: 16.667rem;
            border: 0.828rem solid #e5e5e5;
            border-radius: 4rem;
            .comment-header {
              .avatar-img-box {
                margin-right: 12.5rem;
                width: 33.328rem;
                height: 33.328rem;
                overflow: hidden;
                border-radius: 100%;
                .user-info {
                  .name {
                    color: #000;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 166.664rem;
                    font-weight: 400;
                  }
                  .comment-date {
                    margin-top: 3.125rem;
                    color: rgba(0, 0, 0, 0.3);
                  }
                }
              }
            }
            .comment-content {
              text-align: justify;
              .text {
                margin: 8.333rem 0;
                line-height: 18.75rem;
                height: 37.5rem;
                overflow: hidden;
                position: relative;
                color: rgba(0, 0, 0, 0.5);
                font-size: 12.5rem;
              }
              .photos {
                margin-bottom: 6.25rem;
                display: flex;
                align-items: center;
                .img {
                  display: inline-block;
                  width: 79.16rem;
                  height: 79.16rem;
                  margin: 0 5.208rem 0 0;
                  border-radius: 5rem;
                  overflow: hidden;
                  img {
                    height: 100%;
                    width: 100%;
                  }
                }
              }
            }
          }
          &.view-all {
            width: 10.414rem;
            font-size: 12rem;
            color: #7f7f7f;
            height: 100%;
            margin-left: 8.333rem;
            padding: 0 1.563rem 0 5.208rem;
            .view-all-text {
              img {
                width: 12.5rem;
                height: 12.5rem;
                margin-left: -1.042rem;
                margin-top: 6.25rem;
              }
            }
          }
        }
      }
    }
  }

  // 米粉点评团开始
  .product_info_content {
    padding: 0 8.333rem 20.833rem;
    text-align: left;
    .topic-header {
      height: 51.039rem;
      font-size: 16.667rem;
      padding: 0 8.333rem;
      .topic-title {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .topic-more {
        width: 18.75rem;
        height: 18.75rem;
        background: transparent
          url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABlBMVEX///+9vb18/6H5AAAAAXRSTlMAQObYZgAAAF9JREFUeNrtzCESwDAMxMD4/59umIBJJ6JalLo3OkmS5Ie55IbRyAmrUQtmlxisoeswtR3GurPn+4crcXYljq7EyZU4uBKfrsSHK/F0JR6mhCPYDmwHdKzVUaWTJElefOyLAQtGqMZ7AAAAAElFTkSuQmCC)
          no-repeat 50%;
        background-size: contain;
        transform: rotate(-90deg);
      }
    }

    .topic-body {
      .topic-item {
        flex-shrink: 0;
        width: 141.664rem;
        margin: 0 8.333rem 0 0;
        display: block;
        border-radius: 10rem;
        overflow: hidden;
        .article-imgs {
          position: relative;
          .img-count {
            position: absolute;
            z-index: 3;
            left: 8.333rem;
            top: 8.333rem;
            color: #fff;
            background: rgba(18, 19, 19, 0.5)
              url(https://m.mi.com/static/img/icon-image.d0b01f5259.png)
              no-repeat 0.1rem;
            background-size: 15rem 15rem;
            font-size: 12rem;
            border: 1px solid hsla(0, 0%, 100%, 0.2);
            border-radius: 10rem;
            padding: 0 5.208rem 0 20.833rem;
          }
          .img-box {
            margin: 0;
            height: 141.664rem;
            border-radius: 0;
            width: 100%;
            overflow: hidden;
            img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center center;
              animation: opacity01 0.3s;
            }
            .blur-bg {
              object-fit: cover;
              filter: blur(10px);
            }
            .real-img {
              position: absolute;
              z-index: 1;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              object-fit: contain;
              border-top-left-radius: 10rem;
              border-top-right-radius: 10rem;
            }
          }
        }
        .article-text {
          padding: 0 8.333rem;
          font-size: 12.5rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 10.417rem 0 0;
        }
        .article-addition {
          padding: 0 8.333rem;
          height: 43.75rem;
          font-size: 12rem;
          color: rgba(0, 0, 0, 0.5);
          .article-author {
            width: 50%;
            .article-author-avatar {
              flex-shrink: 0;
              width: 18.75rem;
              height: 18.75rem;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 5.208rem;
              img {
                display: block;
                width: 100%;
              }
            }
            p {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .article-info {
            .article-nums {
              height: 18.75rem;
              line-height: 18.75rem;
              padding-left: 20.833rem;
              background-color: transparent;
              background-repeat: no-repeat;
              background-position: 0;
              background-size: 18.75rem 18.75rem;
            }
            .view-num {
              background-image: url(https://m.mi.com/static/img/icon-view.6fec9f2afd.png);
            }
          }
        }
      }
      .topic-more {
        background: #fff;
        height: 213.539rem;
        padding: 0 10.417rem;
        border-radius: 10rem;
        text-align: center;
        font-size: 12rem;
        color: rgba(0, 0, 0, 0.5);
        img {
          margin-top: 6.25rem;
          width: 12.5rem;
          height: 12.5rem;
        }
      }
      .border-1px {
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .topic-scroll {
      overflow-x: auto;
    }
  }
  // 米粉点评团结束

  // 商品轮播图开始
  .product_info_comment {
    .van-swipe-item:deep() {
      background-color: #f6f6f6;
    }
    .swiper-container {
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;
    }
    .swiper-ads {
      width: 100%;
      height: 94.792rem;
      background-color: #f6f6f6;
      padding: 10.417rem 0;
      img {
        display: block;
        width: 341.664rem;
        height: 94.789rem;
        margin: 0 auto;
        border-radius: 10rem;
      }
    }
  }
  // 商品轮播图结束

  // 商品推荐+爆款推荐开始
  .product_info_rank {
    .card-box {
      padding: 0 16.667rem 20.833rem;
      .tab-header {
        margin-bottom: 10.417rem;
        height: 37.5rem;
        .product-tab {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }
    }
    .my-swipe {
      ::v-deep .van-swipe-item {
        line-height: 0;
        background: #fff;
      }
    }
  }

  // 商品推荐+爆款推荐结束

  // 商品描述开始
  .description-view {
    position: relative;
    .tab-header {
      height: 35.414rem;
      position: sticky;
      top: 0.9rem;
      width: 100%;
      z-index: 98;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      .flex {
        font-size: 12.5rem;
        width: 100%;
        color: #000;
        &.on {
          color: #ff5934;
        }
      }
    }
    .border-bottom-1px {
      &::before {
        border-color: #f4f4f4 !important;
        height: 1px;
        content: "";
        width: 100%;
        border-top: 1px solid #999;
        position: absolute;
        top: 100%;
        right: 0;
        transform: scaleY(0.5);
        -webkit-transform: scaleY(0.5);
        text-decoration: inherit;
        vertical-align: inherit;
        box-sizing: inherit;
      }
    }
  }
  .tab-view {
    background: #fff;
    .image_w_1080 {
      width: 375rem;
      padding-left: 0px;
      padding-right: 0px;
      background: rgb(255, 255, 255);
    }
  }
  // 商品描述结束

  // 商品推荐开始
  .product_info_recommend {
    .recommend-box {
      background: #fff;
      text-align: left;
      .recommend-title {
        line-height: 41.664rem;
        padding: 0 16.667rem;
        font-size: 15.625rem;
      }
      .recommend-list {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  // 商品推荐结束
}

//修改vant默认样式
.van-tabs {
  ::v-deep .van-tab {
    font-size: 12.5rem;
    font-weight: 700;
    color: #3c3c3c;
  }
  ::v-deep .van-tabs__wrap {
    height: 37.5px;
    margin-bottom: 10.417rem;
  }
  ::v-deep .van-tab--active {
    color: #ff6700;
    font-size: 12.5rem;
    font-weight: 700;
  }
  ::v-deep .van-tabs__line {
    background-color: #ff6700;
    width: 16.664rem;
    height: 2.078rem;
    z-index: 0;
  }
}

//共同样式
.fz-xs {
  font-size: 12.5rem !important;
}
.fz-xxs {
  font-size: 12rem !important;
}
.overview {
  background: #fff;
  text-align: left;
  margin: 0 16.667rem;
}
.blank_line {
  width: 100%;
  background: #fff;
  transform: translateZ(0);
}
.offset-top-1px {
  margin-top: -1px;
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
  &.column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  &.row {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
  }
  &.wrap {
    flex-wrap: wrap;
  }
}
.justify-center {
  -webkit-box-pack: center;
  justify-content: center;
}
.justify-space-between {
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.justify-start {
  -webkit-box-pack: start;
  justify-content: flex-start;
}
.justify-space-around {
  justify-content: space-around;
}
.topic-scroll {
  overflow-x: auto;
}
.border-1px {
  position: relative;
}

.ui-flex {
  display: -webkit-box;
  display: flex;
}
.box-flex {
  display: flex;
}
.flex {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
}
</style>