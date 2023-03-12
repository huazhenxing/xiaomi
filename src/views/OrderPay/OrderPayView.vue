<template>
    <div class="pay app-view">
        <div class="page-wrap">
            <div class="box box1">
                <div class="p3">
                    <span class="symbol">¥</span>
                    <span>{{
                        orderInfo
                    }}</span>
                </div>
                <div class="p2">
                    <div v-if="isShow">
                        <div>支付剩余时间:</div>
                        <van-count-down class="span" millisecond :time="time" format="HH:mm:ss" @finish="finish" />
                    </div>
                    <span v-else>请尽快完成支付，超时订单将关闭</span>
                </div>
            </div>

            <div class="box box2">
                <div class="p ui-flex">
                    <div class="ui-box">订单编号：</div>
                    <div class="flex_1">5230207502906964</div>
                </div>

                <div class="p ui-flex" v-if="orderAddress">
                    <div class="ui-box">收货信息：</div>
                    <div class="flex_1">
                        {{ orderAddress.name }} {{ orderAddress.tel }}
                        <br>
                        {{ orderAddress.province }}{{ orderAddress.city }}{{ orderAddress.county }}{{
                            orderAddress.addressDetail
                        }}({{
    orderAddress.areaCode
}})
                    </div>
                </div>
            </div>

            <div class="box box3">
                <div class="head">
                    <span>支付工具</span>
                </div>
                <div class="list">
                    <ul>
                        <li class="J_linksign-customize" @click="paymentMethod(1)">
                            <div class="item ui-flex align-center" :class="(idx == 1 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_alipaywap.png"
                                        alt="" class="pay_icon">支付宝支付
                                </div>
                            </div>
                            <div class="company">支付宝（中国）网络技术有限公司</div>
                        </li>
                        <li class="J_linksign-customize" @click="paymentMethod(2)">
                            <div class="item ui-flex align-center" :class="(idx == 2 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_micash_wap.png"
                                        alt="" class="pay_icon">小米钱包
                                </div>
                            </div>
                            <div class="company">捷付睿通股份有限公司</div>
                        </li>
                        <li class="J_linksign-customize" @click="paymentMethod(3)">
                            <div class="item ui-flex align-center" :class="(idx == 3 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_weixin_wap.png"
                                        alt="" class="pay_icon">微信支付
                                </div>
                            </div>
                            <div class="company">财付通支付科技有限公司</div>
                        </li>
                        <li class="J_linksign-customize" @click="paymentMethod(4)">
                            <div class="item ui-flex align-center" :class="(idx == 4 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="	https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_bestpay_wap.png"
                                        alt="" class="pay_icon">翼支付
                                </div>
                            </div>
                            <div class="company">天翼电子商务有限公司</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="box box3">
                <div class="head">
                    <span>信贷产品</span>
                </div>
                <div class="list">
                    <ul>
                        <li class="J_linksign-customize" @click="paymentMethod(5)">
                            <div class="item ui-flex align-center" :class="(idx == 5 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_baitiao_wap.png"
                                        alt="" class="pay_icon">白条分期
                                </div>
                            </div>
                            <div class="company">重庆京东盛际小额贷款有限公司及合作金融机构</div>
                        </li>
                        <li class="J_linksign-customize" @click="paymentMethod(6)">
                            <div class="item ui-flex align-center" :class="(idx == 6 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_micashcreditinstallment_wap.png"
                                        alt="" class="pay_icon">信用卡分期
                                </div>
                            </div>
                            <div class="company">由各大商业银行提供服务</div>
                        </li>
                        <li class="J_linksign-customize" @click="paymentMethod(7)">
                            <div class="item ui-flex align-center" :class="(idx == 7 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_antinstal_m.png"
                                        alt="" class="pay_icon">花呗分期
                                </div>
                            </div>
                            <div class="company">重庆蚂蚁消费金融有限公司及合作金融机构</div>
                        </li>
                        <li class="J_linksign-customize" @click="paymentMethod(8)">
                            <div class="item ui-flex align-center" :class="(idx == 8 ? 'on' : '')">
                                <div class="ui-flex align-center micash_wap">
                                    <img src="https://cdn.cnbj1.fds.api.mi-img.com//staticsfile/mobile/pay-icons/pay_mifinanceinstal_m.png"
                                        alt="" class="pay_icon">小米分期
                                </div>
                            </div>
                            <div class="company">重庆小米消费金融有限公司及合作金融机构</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="box box5">
            <div class="ui-button">
                <!-- <span>确认支付 ¥{{
                    is_order ? orderInfo[0].total : amount
                }}</span> -->

                <span class="cancel-payment" @click="clickCancelPayment(`/order/list`)">取消支付</span>
                <span class="confirm-payment" @click="clickConfirmPayment(`/order/list`)">确认支付</span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapState, mapMutations } from "vuex";
import { CountDown } from 'vant';
import { Dialog } from 'vant';

Vue.use(CountDown);
Vue.use(Dialog);


export default {
    data() {
        return {
            time: 15 * 60 * 1000,
            isShow: true,

            // before_all_pay_success_order_list: JSON.parse(window.localStorage.getItem('all_pay_success_order_list')) || [],//之前所有_成功_订单列表

            // now_success_order_list: null,//现在成功_订单列表

            // product_data_of_all_orders: null,//所有订单的产品数据

            is_order: null,//判断订单是从购物车结算进来还是从立即购买进来
            orderInfo: null,//订单信息

            orderAddress: null,//订单地址

            idx: 1,//支付方式

            isPayment: false,

            shippingAddressList: JSON.parse(window.localStorage.getItem('shippingAddressList')) || [],//收货地址列表
        };
    },
    created() {
        if (this.ImmediatePayment.length >= 1) {
            this.orderInfo = this.ImmediatePayment[0].goods_count * this.ImmediatePayment[0].price
            this.orderAddress = this.ImmediatePayment[0].list
        } else {
            this.is_order = this.$route.query.is_order
            if (this.is_order) {
                this.orderInfo = this.buy_now_place_an_order[0].total;
            } else {
                this.orderInfo = this.amount;
            }

            if (JSON.parse(window.localStorage.getItem('orderAddress'))) {
                this.orderAddress = JSON.parse(window.localStorage.getItem('orderAddress'))
            } else {
                this.shippingAddressItem = this.shippingAddressList.find((item) => item.isDefault)
                if (this.shippingAddressItem) {
                    this.orderAddress = this.shippingAddressList.find((item) => item.isDefault)
                } else {
                    this.orderAddress = this.shippingAddressList[0]
                }

            }
        }
    },

    methods: {
        //取消支付
        clickCancelPayment(path) {
            if (this.is_order) {
                //立即购买下单
                this.clickBNYNOWBUY(this.isPayment)

            } else {
                //购物车下单
                this.clickFILTER(this.isPayment)
            }
            this.$router.push(path + `?active=0`);
        },

        //确认支付
        clickConfirmPayment(path) {
            if (this.ImmediatePayment.length >= 1) {
                this.clickPAY()
            } else {
                if (this.is_order) {
                    //立即购买下单
                    this.clickBNYNOWBUY(!this.isPayment)

                } else {
                    //购物车下单
                    this.clickFILTER(!this.isPayment)
                }
            }

            this.$router.push(path + `?active=0`);
            // Dialog.alert({
            //     title: '支付成功',
            //     message: '点击确定返回我的订单页面',
            // }).then(() => {
            //     this.$router.push(path + `?active=0`);
            // });
        },
        finish() {
            this.isShow = false
        },
        //支付方式
        paymentMethod(index) {
            this.idx = index
        },

        ...mapMutations({ clickFILTER: "FILTER", clickBNYNOWBUY: 'BNYNOWBUY', clickPAY: 'PAY' }),
    },

    computed: {
        ...mapState(["buy_now_place_an_order", "ImmediatePayment"]),
        ...mapGetters(["amount"]),
    },

}
</script>

<style lang="scss" scoped>
.app-view {
    background: #fff;
    color: #3c3c3c;


    .page-wrap {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        .box1 {
            padding: 20.833rem 10.417rem;
            text-align: center;
            padding-top: 31.250rem;

            .p3 {
                color: #ff5934;


                span {
                    margin-left: 5.208rem;
                    font-weight: 500;
                    font-size: 29.1667rem;
                }

                .symbol {
                    font-size: 20.8333rem;
                    font-weight: 500;
                    position: relative;
                    top: -5.208rem;
                }
            }

            .p2 {
                margin-top: 10.417rem;

                span {
                    font-size: 12.5rem;
                    color: rgba(0, 0, 0, .3);
                    background-color: #ebebeb;
                    padding: 4.167rem 17.188rem;
                    border-radius: 20rem;
                }
            }
        }

        .box2 {
            padding: 15.625rem;
            text-align: left;
            background: #fff;
            margin: 0 15.625rem 10.417rem;
            border-radius: 5rem;

            .p {
                font-size: 12.5rem;
                color: rgba(0, 0, 0, .3);
                // line-height: .42rem;
            }
        }

        .box3 {
            padding: 5.208rem 15.625rem 15.625rem;
            text-align: left;
            background: #fff;
            margin: 0 12.500rem 10.417rem;
            border-radius: 5rem;

            .head {
                span {
                    font-size: 14.5833rem;
                    color: #000;
                    font-weight: 700;
                }
            }

            .list {
                padding-top: 0;
                padding-bottom: 0;

                li {
                    .item {
                        // width: 10rem;
                        // height: 10rem;
                        padding-right: 31.250rem;
                        background-image: url(https://s1.mi.com/m/images/m/check_normal.png);
                        background-position: 100% 50%;
                        background-repeat: no-repeat;
                        background-size: 20rem 20rem;
                        justify-content: space-between;

                        &.on {
                            background-image: url(https://s1.mi.com/m/images/m/check_press.png);
                            color: #f60;
                        }

                        .micash_wap {
                            font-size: 13.5417rem;
                            line-height: 26.036rem;
                            padding-top: 10.417rem;
                            color: #333;
                            text-decoration: none;

                            .pay_icon {
                                display: block;
                                max-width: 26.039rem;
                                max-height: 26.039rem;
                                margin-right: 15.625rem;
                            }
                        }
                    }

                    .company {
                        color: #999;
                        margin-left: 41.667rem;
                        font-size: 12rem;
                        padding: 2.604rem 0;
                    }
                }
            }
        }
    }
}

.pay {
    background-color: #f5f5f5 !important;
    padding-bottom: 104.167rem;

    .ui-flex {
        display: flex;
        text-align: left;

        .ui-box {
            width: 70.313rem;
        }

        .flex_1 {
            flex: 1;
        }
    }

    li {
        list-style: none;
        padding: 4.167rem 0;
    }

    .box5 {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 375rem;
        margin: 0 auto;
        background: #fff;

        // .ui-button {
        //     width: 340.664rem;
        //     display: block;
        //     background-image: linear-gradient(67deg, #ff7b29, #ff5900 98%);
        //     border-radius: 20rem;
        //     text-align: center;
        //     height: 36.500rem;
        //     line-height: 36.500rem;
        //     border: 0.500px solid #ff5722;
        //     font-size: 15.625rem;
        //     color: #fff;
        //     margin: 6.771rem auto;
        // }
        .ui-button {
            width: 340.664rem;
            display: flex;
            justify-content: space-between;

            border-radius: 20rem;
            text-align: center;
            height: 36.500rem;
            line-height: 36.500rem;
            // border: 0.500px solid #ff5722;
            font-size: 15.625rem;
            color: #fff;
            margin: 6.771rem auto;

            .cancel-payment {
                flex: 1;

                background-image: linear-gradient(90deg, #fdcf00, #fd9b00);
                border-top-left-radius: 20rem;
                border-bottom-left-radius: 20rem;
            }

            .confirm-payment {
                flex: 1;
                background-image: linear-gradient(67deg, #ff7b29, #ff5900 98%);
                border-top-right-radius: 20rem;
                border-bottom-right-radius: 20rem;
            }


        }
    }
}

.align-center {
    -webkit-box-align: center;
    align-items: center;
}

.ui-flex {
    display: -webkit-box;
    display: flex;
}
</style>
