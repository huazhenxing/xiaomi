<template>
    <div class="app-shell">
        <header style="background-color: rgb(242, 242, 242);">
            <Header />
        </header>
        <div class="page-order-list">
            <van-tabs v-model="active">
                <van-tab title="全部">
                    <div class="container">
                        <div class="empty" v-if="all_pay_success_order_list.length == 0
                        ">您还没有 待收货 订单</div>
                        <ol v-else>
                            <li v-for="(item, index) in all_pay_success_order_list" :key="index">
                                <div class="order-item">
                                    <div class="item-box-top">
                                        <div class="top-left">
                                            <p class="order-data">
                                                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e1f03f361e857881963e47ea2c7270ef.png"
                                                    alt="">
                                                <strong>小米商城</strong>
                                            </p>
                                        </div>
                                        <div class="top-right">{{ item.isPayment == false ? '等待付款' : '等待收货' }}</div>
                                    </div>

                                    <div class="item-box-center">
                                        <img :src="item.img_url" alt="">
                                        <div class="pro-info">
                                            <p class="pro-name">{{ item.name }}</p>
                                        </div>
                                        <div class="pro-right">
                                            <p class="pro-price">
                                                <span class="rmb">￥</span>{{ item.price }}
                                            </p>
                                            <p class="pro-num">x1</p>
                                        </div>
                                    </div>

                                    <div class="item-box-bottom">
                                        <span class="add_time">{{ orderTime(item.orderTime) }}</span>
                                        <span>共{{ item.goods_count }}件商品</span>
                                        <span>{{ item.isPayment ? '已付' : '应付' }}金额：</span>
                                        <strong>{{ item.goods_count * item.price }}元</strong>
                                    </div>
                                </div>
                                <div class="item-box-btn" v-if="item.isPayment == false">
                                    <span class="btn btn-bordered btn-gray" @click="clickCancelOrder(index)">取消订单</span>
                                    <span class="btn btn-bordered" @click="clickImmediatePayment(index)">立即付款</span>
                                </div>
                            </li>
                        </ol>
                        <!-- 商品推荐 -->
                        <RecommendCommodity />
                    </div>
                </van-tab>

                <van-tab title="待付款">
                    <div class="container">
                        <div class="empty" v-if="treat_pay.length == 0
                        ">您还没有 待付款 订单</div>
                        <ol v-else>
                            <li v-for="(item, index) in treat_pay" :key="index">
                                <div class="order-item">
                                    <div class="item-box-top">
                                        <div class="top-left">
                                            <p class="order-data">
                                                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e1f03f361e857881963e47ea2c7270ef.png"
                                                    alt="">
                                                <strong>小米商城</strong>
                                            </p>
                                        </div>
                                        <div class="top-right">等待付款</div>
                                    </div>

                                    <div class="item-box-center">
                                        <img :src="item.image_share" alt="">
                                        <div class="pro-info">
                                            <p class="pro-name">{{ item.name }}</p>
                                        </div>
                                        <div class="pro-right">
                                            <p class="pro-price">
                                                <span class="rmb">￥</span>{{ item.price }}
                                            </p>
                                            <p class="pro-num">x1</p>
                                        </div>
                                    </div>

                                    <div class="item-box-bottom">
                                        <span class="add_time">{{ orderTime(item.orderTime) }}</span>
                                        <span>共{{ item.goods_count }}件商品</span>
                                        <span>应付金额：</span>
                                        <strong>{{ item.goods_count * item.price }}元</strong>
                                    </div>
                                </div>
                                <div class="item-box-btn">
                                    <span class="btn btn-bordered btn-gray">取消订单</span>
                                    <span class="btn btn-bordered">立即付款</span>
                                </div>
                            </li>
                        </ol>
                        <!-- 商品推荐 -->
                        <RecommendCommodity />
                    </div>

                </van-tab>

                <van-tab title="待收货">
                    <div class="container">
                        <div class="empty" v-if="stop_pay.length == 0
                        ">您还没有 待收货 订单</div>
                        <ol v-else>
                            <li v-for="(item, index) in stop_pay" :key="index">
                                <div class="order-item">
                                    <div class="item-box-top">
                                        <div class="top-left">
                                            <p class="order-data">
                                                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e1f03f361e857881963e47ea2c7270ef.png"
                                                    alt="">
                                                <strong>小米商城</strong>
                                            </p>
                                        </div>
                                        <div class="top-right">等待收货</div>
                                    </div>

                                    <div class="item-box-center">
                                        <img :src="item.image_share" alt="">
                                        <div class="pro-info">
                                            <p class="pro-name">{{ item.name }}</p>
                                        </div>
                                        <div class="pro-right">
                                            <p class="pro-price">
                                                <span class="rmb">￥</span>{{ item.price }}
                                            </p>
                                            <p class="pro-num">x1</p>
                                        </div>
                                    </div>

                                    <div class="item-box-bottom">
                                        <span class="add_time">{{ orderTime(item.orderTime) }}</span>
                                        <span>共{{ item.goods_count }}件商品</span>
                                        <span>已付金额：</span>
                                        <strong>{{ item.goods_count * item.price }}元</strong>
                                    </div>
                                </div>
                            </li>
                        </ol>
                        <!-- 商品推荐 -->
                        <RecommendCommodity />
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RecommendCommodity from "@/components/RecommendCommodity.vue";
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import { Dialog } from 'vant';
import { mapState, mapGetters, mapMutations } from "vuex";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);

export default {
    components: {
        Header,
        RecommendCommodity
    },
    data() {
        return {
            active: null,
        };
    },
    created() {
        this.active = parseInt(this.$route.query.active)
    },
    methods: {
        orderTime(time) {
            var date = new Date(time);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes();
            return Y + M + D + h + m
        },

        // 取消订单
        clickCancelOrder(index) {
            console.log(index);
            Dialog.confirm({
                message: '确定取消当前订单吗？',
            })
                .then(() => {
                    //确定==>删除该订单
                    this.clickDELETEITEM(index)
                })
                .catch(() => {
                    //取消==>什么也不做
                });
        },
        // 立即付款
        clickImmediatePayment(index) {
            this.clickIMMDEIATEPAYMENT(index)
            this.$router.push(`/order/pay`);
        },
        ...mapMutations({ clickDELETEITEM: "DELETEITEM", clickIMMDEIATEPAYMENT: 'IMMDEIATEPAYMENT' }),
    },

    computed: {
        ...mapState(["all_pay_success_order_list"]),
        ...mapGetters(["treat_pay", "stop_pay"]),
    },

}
</script>

<style lang="scss" scoped>
.page-order-list {
    padding-bottom: 46.875rem;
    padding-top: 50px;
    background: #fff;
    color: #3c3c3c;

    .container {
        padding-bottom: 46.875rem;
        color: rgba(60, 60, 60, .87);

        .empty {
            font-size: 15.625rem;
            text-align: center;
            background: url(https://s1.mi.com/m/images/m/empty.png) 50% 0 no-repeat;
            background-size: 104rem 104rem;
            padding-top: 130.208rem;
            color: #999;
            margin: 41.667rem 52.083rem 0;
        }
    }

    ol {
        overflow: hidden;

        li {
            border-top: 10rem solid RGBA(245, 245, 245, 1);
            font-size: 12.5rem;
            display: block;

            .order-item {
                .item-box-top {
                    border-bottom: 1px solid #ececec;
                    display: -webkit-box;
                    padding: 8.854rem 14.583rem;

                    .top-left {
                        -webkit-box-flex: 1;
                        width: 100%;
                        text-align: left;

                        .order-data {
                            font-size: 14.5833rem;
                            color: #000;
                            display: flex;
                            align-items: center;

                            img {
                                width: 20.828rem;
                                height: 20.828rem;
                                margin-right: 4.167rem;
                            }

                            strong {
                                font-weight: 400;
                            }
                        }
                    }

                    .top-right {
                        color: #ff5722;
                        font-size: 13.5417rem;
                        position: relative;
                        top: 3.646rem;
                    }
                }

                .item-box-center {
                    padding: 10.417rem 14.583rem;
                    text-align: left;
                    -webkit-box-align: center;
                    align-items: center;
                    display: flex;

                    img {
                        width: 60.414rem;
                        height: 60.414rem;
                        margin-right: 12.500rem;
                        display: block;
                    }

                    .pro-info {
                        width: 208.328rem;

                        .pro-name {
                            width: 208.328rem;
                            font-size: 14.5833rem;
                            color: #000;
                            display: block;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .pro-right {
                        width: 64.602rem;
                        text-align: right;
                        color: rgba(0, 0, 0, .5);

                        .pro-price {
                            font-size: 14.5833rem;
                            display: block;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;

                            .rmb {
                                font-size: 12rem;
                                position: relative;
                                top: -2.083rem;
                            }
                        }

                        .pro-num {
                            display: block;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }

                .item-box-bottom {
                    padding: 10.417rem 14.583rem;
                    text-align: right;
                    border-top: 1px solid #ececec;
                    font-size: 12.5rem;

                    span {
                        margin-left: 10.417rem;
                        color: #000;
                    }

                    .add_time {
                        float: left;
                        font-size: 12rem;
                        color: #919191;
                        margin-top: 3.125rem;
                    }

                    strong {
                        font-size: 15.625rem;
                        display: inline-block;
                        color: rgba(0, 0, 0, .5);
                        font-weight: 400;
                    }
                }
            }

            .item-box-btn {
                padding: 7.813rem 14.583rem 10.417rem;
                overflow: hidden;
                text-align: right;

                .btn {
                    display: inline-block;
                    width: 53.729rem;
                    height: auto;
                    font-size: 12rem;
                    padding: 7.292rem 10.417rem;
                    border-radius: 2rem;
                    margin-left: 10.417rem;
                    line-height: normal;

                }
            }

            .btn-bordered.btn-gray {
                color: #999;
                border: 1px solid #999;
            }

            .btn-bordered {
                color: #ff6700;
                background: transparent;
                border: 1px solid #ff6700;
            }

            .btn {
                outline: 0;
                text-align: center;
            }
        }
    }
}
</style>