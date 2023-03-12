<template>
    <!-- 商品推荐 -->
    <div class="recommend-box">
        <div class="recommend-top-img">
            <img :src="img_url" alt="" />
        </div>
        <div class="wrap">
            <div class="goods-item" v-for="item in recom_list" :key="item.action.path"
                @click="JumpView(`/commodity/detail/${item.action.path}`)">
                <div class="goods-img-box">
                    <img :src="item.image_url" alt="" />
                </div>
                <div class="goods-info">
                    <div class="goods-name">{{ item.name }}</div>
                    <div class="goods-price">
                        <span>￥</span> {{ item.price }}
                        <del v-if="item.price !== item.market_price" class="price">
                            <span>￥</span>{{ item.market_price }}
                        </del>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            img_url: null, //商品推荐照片
            recom_list: null, //商品推荐数据
        };
    },
    created() {
        //推荐
        this.axios.get("cart_recom").then((res) => {
            this.img_url = res.data.data.header.body.items[0].img_url;
            this.recom_list = res.data.data.recom_list;
        });
    },
    methods: {
        //跳转到商品详情
        JumpView(path) {
            this.$router.push(path);
        },
    }
}
</script>

<style lang="scss" scoped>
.recommend-box {
    background: #fff;
    text-align: left;

    .wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;

        .goods-item {
            flex: 0 1 49.5%;
            overflow: hidden;

            .goods-img-box {
                img {
                    display: block;
                    width: 100%;
                    min-height: 185.625rem;
                }
            }

            .goods-info {
                padding: 9.375rem 13.542rem 11.458rem;

                .goods-name {
                    font-size: 14.5833rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .goods-price {
                    font-size: 16.6667rem;
                    display: inline-block;
                    color: #ff6700;
                    margin-top: 5.20833rem;

                    span {
                        font-size: 12.5rem;
                    }

                    .price {
                        font-size: 12.5rem;
                        margin-left: 5.20833rem;
                        color: rgba(0, 0, 0, 0.54);
                        text-decoration: line-through;

                        span {
                            font-size: 12rem;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }
}
</style>