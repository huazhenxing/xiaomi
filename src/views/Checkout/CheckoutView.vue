<template>
    <div class="app-shell app-shell-bottom-navigation">
        <header class="app-header-wrapper app-shell-header" style="background-color: rgb(242, 242, 242);">
            <div class="app-header-left" @click="clickReturn">
                <div class="app-header-item">
                    <i class="app-header-icon"></i>
                </div>
            </div>

            <div class="app-header-middle">
                <div class="app-header-title" style="color: rgb(102, 102, 102);">用户结算</div>
            </div>
            <div class="app-header-right"></div>
        </header>


        <div class="app-view-wrapper">
            <div class="checkout app-view app-view-with-header">
                <div class="notice_position">
                    <van-notice-bar mode="closeable" left-icon="info-o">
                        广东、湖北部分地区因国家疫情防控影响，商品到货存在一定延期，给您带来不便，敬请谅解。
                    </van-notice-bar>
                </div>
                <div class="page-wrap">
                    <div class="b1 more">
                        <div @click="goAddressEditView(`/address/list`)" v-if="orderAddress">
                            <div class="b11">
                                <p>
                                    <span style="margin-right: 5.208rem;">{{ orderAddress.name }}</span>
                                    <span>{{ orderAddress.tel }}</span>
                                </p>
                            </div>
                            <div class="b13">
                                <p>{{ orderAddress.province }} {{ orderAddress.city }} {{ orderAddress.county }} {{
                                    orderAddress.addressDetail
                                }}
                                    ({{ orderAddress.areaCode }})</p>
                            </div>
                        </div>

                        <div v-else class="b14" @click="goAddressEditView(`/address/edit`)">添加收货地址
                        </div>
                    </div>

                    <div class="ui-line"></div>

                    <div class="b8">
                        <div class="b8w" v-for="(item, index) in orderInfo" :key="index">
                            <div class="b81">
                                <img :src="item.image_share" alt="">
                            </div>

                            <div class="b82">
                                <div class="name">
                                    <p>
                                        <span>{{ item.name }}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="b83">
                                <div class="item-price">
                                    <span>{{ item.goods_count }} x </span>
                                    <strong>{{ item.price }}</strong>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="ui-line"></div>
                    <div class="b3 J_linksign-customize">
                        <dl>
                            <dt class="ui-flex align-center justify-space-between">
                                <strong>运费</strong>
                                <div class="ui-flex align-center">
                                    <span>包邮</span>
                                </div>
                            </dt>
                        </dl>
                    </div>

                    <div class="b3 J_linksign-customize">
                        <div class="gap-line" style="margin: 0px 20.833rem;"></div>
                        <dl>
                            <dt class="ui-flex align-center justify-space-between">
                                <strong class="invoice-cat-name">电子普通发票</strong>
                                <div class="ui-flex align-center">
                                    <span>个人</span>
                                    <i class="image-icons icon-arrow-down"></i>
                                </div>
                            </dt>
                        </dl>
                    </div>

                    <div class="b3 J_linksign-customize">
                        <div class="gap-line" style="margin: 0px 20.833rem;"></div>
                        <dl>
                            <dt class="ui-flex align-center justify-space-between">
                                <strong class="invoice-cat-name">电子普通发票</strong>
                                <div class="ui-flex align-center">
                                    <!-- <span class="i-recommend-coupon">已选推荐优惠</span>
                                    <span>已优惠
                                        <em>100元</em>
                                    </span> -->
                                    <span>无可用</span>
                                    <i class="image-icons icon-arrow-down"></i>
                                </div>
                            </dt>
                        </dl>
                    </div>
                    <div class="ui-line"></div>
                    <div class="b5">
                        <p><strong>商品价格：</strong><span>{{ amount }}</span></p>
                        <!-- <p><strong>优惠：</strong><span>-100.00</span></p> -->
                        <p><strong>配送费用：</strong><span>0.00</span></p>
                    </div>
                    <div class="ui-line"></div>
                    <div class="b7">
                        <div class="info-tips" v-if="orderAddress">
                            <p>配送至：{{ orderAddress.province }} {{ orderAddress.city }} {{ orderAddress.county }} {{
                                orderAddress.addressDetail
                            }}
                                ({{ orderAddress.areaCode }})</p>
                        </div>
                        <div class="ui-flex">
                            <div class="b71 ui-box-flex">
                                <span>共{{ is_order ? orderInfo[0].goods_count : quantity }}件 合计: </span>
                                <strong>{{
                                    is_order ? orderInfo[0].total : amount
                                }}</strong>
                            </div>
                            <div class="b72 ui-box-flex" @click="goOrderPayView(`/order/pay`)">
                                <div class="ui-button">
                                    <span>去付款</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState, mapMutations } from "vuex";
import { NoticeBar } from 'vant';
import { Dialog } from 'vant';
Vue.use(NoticeBar);
Vue.use(Dialog);
export default {
    data() {
        return {
            orderInfo: null,//订单信息
            orderAddress: JSON.parse(window.localStorage.getItem('orderAddress')) || null,//订单地址
            is_order: null,//判断订单是从购物车结算进来还是从立即购买进来
        };
    },
    created() {
        // 默认选择默认地址
        if (window.localStorage.getItem('shippingAddressList') && !window.localStorage.getItem('orderAddress')) {
            //如果有默认地址，则选择默认地址
            this.orderAddress = JSON.parse(window.localStorage.getItem('shippingAddressList')).find((item) => item.isDefault)
            //否则选择地址列表第一个
            if (!this.orderAddress) {
                this.orderAddress = JSON.parse(window.localStorage.getItem('shippingAddressList'))[0]
            }
        }

        this.is_order = this.$route.query.is_order
        if (this.is_order) {
            // 从立即购买进来
            this.orderInfo = this.buy_now_place_an_order
        } else {
            //从购物车结算进来
            // this.orderInfo = JSON.parse(window.localStorage.getItem('cartCommodityList')).filter((o) => o.state)
            this.orderInfo = this.cartCommodityList.filter((o) => o.state)
        }
    },
    methods: {
        //点击返回上一级触发的操作
        clickReturn() {
            this.$router.go(-1);
        },

        //点击地址编辑
        goAddressEditView(path) {
            this.$router.push(path + '?type=checkout');
        },

        //去付款
        goOrderPayView(path) {
            //判断是否选择了地址
            if (this.orderAddress) {
                // if (this.is_order) {
                //     this.clickAPPADDRESS({ list: JSON.parse(window.localStorage.getItem("orderAddress")), judge: false })
                //     this.$router.push(path + '?is_order=true');
                // } else {
                //     this.clickAPPADDRESS({ list: JSON.parse(window.localStorage.getItem("orderAddress")), judge: true })
                //     this.$router.push(path);
                // }

                if (this.is_order) {
                    this.clickAPPADDRESS({ list: this.orderAddress, judge: false })
                    this.$router.push(path + '?is_order=true');
                } else {
                    this.clickAPPADDRESS({ list: this.orderAddress, judge: true })
                    this.$router.push(path);
                }

            } else {
                Dialog.alert({
                    title: '温馨提示',
                    message: '请添加收货地址',
                }).then(() => {
                    //跳转到地址编辑
                    this.$router.push(`/address/edit`)
                });
            }
        },
        ...mapMutations({ clickAPPADDRESS: "APPADDRESS" }),
    },
    computed: {
        ...mapState(["buy_now_place_an_order", "cartCommodityList"]),
        ...mapGetters(["quantity", "amount"]),
    },
}
</script>

<style lang="scss" scoped>
.app-shell {
    position: relative;
    width: 100%;
    z-index: 1;

    .app-shell-header {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 50%;
        width: 375rem;
        transform: translateX(-50%);

        .app-header-left {
            display: flex;
            align-items: center;

            .app-header-item {
                width: 31.250rem;
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
            font-size: 16.625rem;
            min-width: 0;
            text-align: center;

            .app-header-title {
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }

        .app-header-right {
            min-width: 52.078rem;
        }
    }

    .app-view-wrapper {
        .app-view-with-header {
            padding-top: 50px;

            .page-wrap {
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;

                .b1 {
                    background: #fff url(https://s1.mi.com/m/images/m/bd1.png) 0 0 repeat-x;
                    background-size: 52rem 4rem;
                    padding: 20.833rem 20.833rem 15.625rem;
                    position: relative;

                    .b11 {
                        font-size: 15.625rem;
                        font-weight: 700;
                        margin-bottom: 10.417rem;
                    }

                    .b13 {
                        color: #757575;
                        margin-right: 15.625rem;
                    }

                    .b14 {
                        font-size: 13.5417rem;
                        font-weight: 700;
                    }
                }

                .more::after {
                    content: "";
                    position: absolute;
                    right: 16.667rem;
                    top: 50%;
                    width: 9.414rem;
                    height: 9.414rem;
                    border-left: 1px solid currentColor;
                    border-top: 1px solid currentColor;
                    -webkit-transform: translate3d(0, -50%, 0) rotate(135deg);
                }

                .ui-line {
                    border-top: 1px solid #e0e0e0;
                    border-bottom: 1px solid #e0e0e0;
                    height: 8.414rem;
                    background: #f5f5f5;
                    overflow: hidden;
                    clear: both;
                }

                .b8 {
                    background: #fff;

                    .b8w {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        line-height: 41.659rem;
                        margin: 0 20.833rem;
                        padding: 7.292rem 0;
                        border-bottom: 1px solid #eee;
                        box-sizing: border-box;

                        .b81 {
                            margin-right: 10.417rem;
                            width: 41.664rem;
                            height: 41.664rem;

                            img {
                                width: 41.664rem;
                            }
                        }

                        .b82 {
                            flex: 1;

                            .name {
                                p {
                                    display: -webkit-box;
                                    -webkit-box-align: center;

                                    span {
                                        display: block;

                                        &:first-child {
                                            margin-right: 5.208rem;
                                        }

                                        &:last-child {
                                            -webkit-box-flex: 1;
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }

                        .b83 {
                            text-align: right;


                            .item-price {}
                        }
                    }
                }

                .b3 {
                    background: #fff;

                    dt {
                        padding: 13.542rem 20.833rem;

                        span {
                            float: right;
                            color: #bdbdbd;
                        }

                        em {
                            font-style: normal;
                            color: #f60;
                            margin-left: 5.208rem;
                        }
                    }

                    .gap-line {
                        background: #eee;
                        height: 1px;
                        padding-bottom: 0;
                    }

                    .image-icons {
                        width: 20.828rem;
                        height: 20.828rem;
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABlBMVEX///+9vb18/6H5AAAAAXRSTlMAQObYZgAAAF9JREFUeNrtzCESwDAMxMD4/59umIBJJ6JalLo3OkmS5Ie55IbRyAmrUQtmlxisoeswtR3GurPn+4crcXYljq7EyZU4uBKfrsSHK/F0JR6mhCPYDmwHdKzVUaWTJElefOyLAQtGqMZ7AAAAAElFTkSuQmCC);
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                        -webkit-transition: -webkit-transform .2s linear;
                        transition: transform .2s linear;
                    }

                    .i-recommend-coupon {
                        margin-right: 8.333rem;
                        padding: 0 1.042rem;
                        font-size: 12rem;
                        line-height: 11.453rem;
                        border: 1px solid #f60;
                        border-radius: 3px;
                        color: #f60;
                    }

                }

                .b5 {
                    padding: 13.542rem 20.833rem;
                    background: #fff;

                    p {
                        line-height: 25rem;
                    }
                }

                .b7 {
                    transform: none;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #fff;
                    border-top: 1px solid #e0e0e0;
                    z-index: 10;
                    max-width: 375rem;
                    margin: 0 auto;

                    .info-tips {
                        background: #fbf3c4;
                        color: #b57842;
                        opacity: .7;

                        p {
                            line-height: 15.625rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    .ui-flex {
                        align-items: center;
                        font-size: 15.625rem;
                    }

                    .b71 {
                        line-height: 15.625rem;
                        color: #ff4d14;
                        width: 100%;
                        text-align: center;
                    }

                    .b72 {
                        width: 100%;
                    }

                    .ui-button {
                        display: block;
                        background-color: #ff5722;
                        text-align: center;
                        height: 50.078rem;
                        line-height: 50.078rem;
                        border: 1px solid #ff5722;
                        font-size: 15.625rem;
                        color: #fff;
                    }
                }
            }
        }
    }
}

.info-tips {
    background: #fbf3c4;
    color: #b57842;
    padding: 6.250rem 10.417rem;
    opacity: .7;

    p {
        line-height: 15.625rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #b57842;
    }
}

.ui-flex {
    display: -webkit-box;
    display: flex;
}

.justify-space-between {
    -webkit-box-pack: justify;
    justify-content: space-between;
}

.align-center {
    -webkit-box-align: center;
    align-items: center;
}

.checkout {
    padding-bottom: 80.729rem;
    text-align: left;
    font-size: 12.5rem;
    background: #f5f5f5 !important;
    min-height: 100vh;
}

.ui-flex {
    display: -webkit-box;
    display: flex;
}

.image-icons {
    display: inline-block;
    width: 20.828rem;
    height: 20.828rem;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
}

.app-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #f2f2f2;
    color: #666;
    padding: 0;
    transition: transform .2s ease-out;
}
</style>