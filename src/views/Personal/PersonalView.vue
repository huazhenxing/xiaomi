<template>
    <div class="app-view" v-if="infoData">
        <div class="mi-circle-personal-container">
            <div class="header-banner">
                <div class="fill-height">
                    <div class="header-btn" @click="clickReturn">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAxCAYAAAAr49IFAAADpklEQVRYR7WY66tUZRTGf8tMM8uUJD+EoB/7X0KUk9rhnMILXrOLWt4iLyliaFhBkAiBIhKFSGneSYIgTI2+l+SFYx5LhFTwUi55DmsfXl+dmT2z93lhmGGGvZ+9fu9az1rvGEO03H0kMAEwoN/MbutD7cvdRwELgEXAcOBTYMdQib0LrAWejUjOAlNqFXP3p4A3gG0ZrpPAzNrEAt0S4IMkImlejgf4rk6xZcA6YEwS1Q1gOvCDmd2rLBZZtxD4JEPXD/Sa2Yni+0pigU4Ztz5D9xewFNhnZv/VJfZ2CI3N0L0KHBe6NNqOInP3EVFHn2Xo/g50xx5XvG2LRXprjzZkyXAFWA58naKrFJm7vxlC4zJ0vcARM7vbyJJKR+buTwLzgM+zm10DeszsaCvfKyUW6CS0KUOn9JY1fdUIXdsY3X0x8CHwfHLxTeB14Ptm6EqLubscey7wRYboeqA73ApdKbFwBgltBp5LLroKrAD25nXUSrjhnrm70nsjMD5DNwf4tiy6ppG5+zBAN9yZPem/QLeZHWoVQanUD3SzgS0ZOjnDSmBPu+gaRubu8wPdCxk6pf1+M7vTaVS6bmDP3F3vs4Avs5spvYXuYBWRQdcPZ+iJfpRm3T/AKmB3FXQPYXT3iYCs5qXkh1uAsvGbquhyMYn8BqhtaN1XNprZrjrQ5WKTNCMAk7PC1R6qAQ522qriFumu8UveNzq54cVo7Srg/6sKpdmoQtYcoTEsXbKmKWZ2qjaxJP01xWpQSbNSbUTurnGsEtKHvNHdnwY0/ynlU6QXgHeAA1WQPmLE0VaE9P0MncazqWb2S6dIH+v64SgS1KiWItVQIwP4sZMIm7UYIVXLV+9KkZ6PhzhoZqrJ0qvpDBJWppFtdXbHPmCamZ0urVQYcbMLAqmaqEa49NCgPewGfiqLtOx0JYzvxUt4i/Un8BZwqAzSUmJRhzojC6maaLEcuAR0mdmZVkhLiyWFrwFI9lYcYfWTkM4Afm6GtC2xEBRSFb2KP0V6Lvb1aCOkbYuFoM7OShqVRopUTvOKmenA/sjqSCxB+hGgaTmtQ52hu4DTOdKOxULwGWBN+Kb++yjWH4AO8+qHg4VfSSwEtW9Cqj1MkaosppvZr8WXlcUSpPrvQ3NLmjQDTgOcVYS1iIWgSkGdQkWeIv09HuJkbWLJHgqpel+K9AjwWq1iCdLtgKbrIkJNby/XLpYgla2pLJ4APga2DolYkqUvAhqm+szs5gNNrjyZWAcuFQAAAABJRU5ErkJggg=="
                            alt="">
                    </div>
                    <div class="share-btn">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAADf0lEQVR4Xu2bS6hOURTHf0vJzCOklAkDYzKSIuVVlJkSdSOKMmHAiIHyyMCjlJFCmRiQmUeRkQFlxIQopShEKYSldZ3vdjrO+b57zt77O8dn7eG9e+2z9u/819qPbx3BW18C4nz6E3BAAxTigBxQWBJxBbmCXEFhBFxBYfw8B7mCXEFhBP4FBanqVGABMAV4KSI/k866xuCdyEGqehjYBUwDTgHnRORbjXkk69o6IFXdC5wBTEXWvgAHgQtdUFJrgLKw2g6cBqYXJPAR2A1cbxtSm4B2AEeB+RXxYZBMSZdE5HuyGOpiks7C6niJcorufgAOARfbUtJQFTQgrKreZavhNmxAZWFlAGbl6Fg4WaLO/621cBsaoIqw6qnjWg7QG+AKsKcQgq2EW3JAfcJqYsLAjxyg18AGYCVQzFNDD7dhAKoKq4kVSlW1AGi9iDxV1YG2qVe3pIBUdQw4WwiVv1TQB5BtHsv2Sqa+/cBlEcnDjc4rGSBVnQk8BBbnvC7NI1WAenYV+es2sFVE3kenkhswJaAZwF1gWfa8ypVoECCzLwm3m8CYiNi4yVpKQDb28uwoYad0O5DeKtvwTRKQhdsm4AjwNdtlPxCRX8noAMkA1XF6MoDqjBezrwPq4lms6JMraMBbckAOKCwtuoL+JwWpqu1p5ticReRdmHb+WKdQUCw/ay/zqroROJH9AnFERK6GQkoEKIqfTQC9ABZmUJ4DK0TkbQikRICi+NkEkG3te3Z2dzN+NdFBQFH8bAKo9O6mg4Ci+OmAYh81EuWLKG87P9dYfrqCXEHjBBovJq4gV5ArqFQDo5ako2zqRnkVi3IsGGVAUQ6Wowyos1conVjmQ85xVbYjlaQdUAoCQ7rG9RBLsJP+lCtnsTvpLSJyvwWRVD5SVRcBdtvZa6+A1SLysq6fTRR0D1iVPcgqw24A54EoF/h1J1Dob/OZB+wDNuf+99gq1kTEah9rtSaAtlnhUu7a1SBZ3U8XPh2w+djnDLOz7z56MA6JyMlaZLLOTQDNzYos1xScaPL81DZ2hHmUqcdKZmq3JoDMZglwDFjblRKakpmbsu8AB0TkWW0yTRVkdqpqkOzHw3XATmDpJKrmm/pYx86ubj8DT7I0YFVo70PqGGsrqI63o9DXAQ14iw7IAYUFuivIFeQKCiPgCgrj5znIFeQKCiPgCgrj9xvqWldnMn4yDAAAAABJRU5ErkJggg=="
                            alt="">
                    </div>
                </div>
            </div>

            <div class="personal-box">
                <div class="avter">
                    <img :src="infoData.avatar" alt="">
                </div>
                <div class="meet-btn">
                    + 关注
                </div>
                <div class="avter-name">
                    <h2 class="name">卡地亚</h2>
                    <div class="mi9">
                        <span>成长值 {{ infoData.mi_num }}</span>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAVCAYAAAByrA+0AAACHElEQVQ4T32SzUtUYRTGf+cd79yRUUstEKJVtChaFC5aSCnoWFlDLUr7sMhoHWjRIltMuTE/6ANzExIEU5PYIoZUNKJd/0SbCPqAFpXN1x3nnpjrHWl0pnf5nuf3Ps97zpFExB5S5SbCXDafuz3wnp/850iiy/6qaEtRIxAvuGb4wrvsp2qMvIzYEy46iGIU8iLMaci+dj658qMSJDNt1Idrg1MKF9dMQIRkX9utUxKLuRshTzDbEW5xrfx9Vc4AAU8kMoeYoXNLmc//Qh7gQcfqtrur+RFVvQJYxXhGeGUsa7B3PvWtpFsHPOhIQ1OhkBsFDyo65UXkbTjUfDqa/JL2G1OeMn6cxkDOfqLoSaBmrSqLgWDNQO986nuZQwl92sHWWsseV9V+IASsFrtn7MCNikARfB6t32Yyzl0XvSpgITiiJKoC3p86g3sLwiKw03f/UxVIdAX3gDxStNOfzy9jzL2KQKI7uE9VplA97ItTwESTaRzfBHhil2fAgfX+GXOnzs6ORZOky4B4xN5tlBnQQ744bYTRvmVnZNPg4hFrv1HzALR9/YPCuCPO5KUlipHWJuJ1o9tqLag8Rjno37qiDDdYznTPAr/Ldil5onlHKrPyWoVWv1AQketnl3MPy3fAd3jRZS+AHvXtVgTGJOVM9n4gUw34CLpLhBxKbNVypvs3xCiLNBsJtbu4l1V4syXgJHsWyFV6uXT3F/cVvzlJHPoVAAAAAElFTkSuQmCC"
                            alt="">
                    </div>
                </div>
                <div class="num-list">
                    <ul class="J_linksign-customize">
                        <li class="layout">
                            <div class="num"> {{
                                infoData.following_num
                            }}</div>
                            <div class="tips">关注</div>
                        </li>
                        <li class="layout">
                            <div class="num"> {{ infoData.follower_num }}</div>
                            <div class="tips">粉丝</div>
                        </li>
                        <li class="layout">
                            <div class="num"> {{ infoData.praised_num }}
                            </div>
                            <div class="tips">获赞</div>
                        </li>
                        <li class="layout">
                            <div class="num"> {{ infoData.question_num }}</div>
                            <div class="tips">问答</div>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="show-content">
                <div class="content-header">
                    <div class="item-nav" :class="isActive ? 'active' : ''" @click="clickDynamic">
                        <div class="title">动态</div>
                        <div class="line" v-if="isActive"></div>
                    </div>

                    <div class="item-nav" :class="!isActive ? 'active' : ''" @click="clickPraised">
                        <div class="title">赞过</div>
                        <div class="line" v-if="!isActive"></div>
                    </div>
                </div>
            </div>

            <div class="show-container" v-if="dynamicListData">
                <Card v-for="(item, index) in dynamicListData.dynamic_list" :key="index" :item="item" />
            </div>
        </div>

        <van-skeleton title avatar :row="3" :loading="loading" />
    </div>
</template>

<script>
import Vue from 'vue';
import { Skeleton } from 'vant';

Vue.use(Skeleton);
import Card from '@/components/Card.vue'
export default {
    name: "PersonalView",
    components: { Card },
    data() {
        return {
            isActive: true,
            infoData: null,
            dynamicListData: null,
            praisedListData: null,
            loading: true,
        };
    },

    created() {
        console.log("路由参数", this.$route.params.mid);
        // 用户主页简介
        this.axios({
            method: "get",
            url: "communicate/personal_info",
            params: {
                to_mid: this.$route.params.mid,
            },
        }).then((res) => {
            console.log('用户主页简介==>', res);
            this.infoData = res.data.data
            this.loading = false;
        })

        // 用户动态列表
        this.axios({
            method: "get",
            url: "communicate/personal_dynamic_list",
            params: {
                to_mid: this.$route.params.mid,
            },
        }).then((res) => {
            console.log('用户动态列表==>', res);
            this.dynamicListData = res.data.data
        })
    },

    mounted() { },

    methods: {
        //点击返回上一级
        clickReturn() {
            this.$router.go(-1);
        },

        clickDynamic() {
            if (this.isActive) {
                return
            }
            this.isActive = true
            // 用户动态列表
            this.axios({
                method: "get",
                url: "communicate/personal_dynamic_list",
                params: {
                    to_mid: this.$route.params.mid,
                },
            }).then((res) => {
                console.log('用户动态列表==>', res);
                this.dynamicListData = res.data.data
            })
        },

        clickPraised() {
            if (!this.isActive) {
                return
            }
            this.isActive = false
            // 用户赞过列表
            this.axios({
                method: "get",
                url: "communicate/personal_praised_list",
                params: {
                    to_mid: this.$route.params.mid,
                },
            }).then((res) => {
                console.log('用户赞过列表==>', res);
                this.praisedListData = res.data.data
            })
        }
    },



    watch: {},
};
</script>

<style lang="scss" scoped>
.app-view {
    min-height: 100vh;
    color: #3c3c3c;
    background: #f5f5f5;

    .mi-circle-personal-container {
        height: 138rem;
        background: url(https://m.mi.com/static/img/bg.e75cdafde7.png) no-repeat 0 0;
        background-size: cover;
        padding-top: 25rem;

        .header-banner {
            height: 45.828rem;
            margin: 0 20.833rem 39.063rem 16.667rem;

            .fill-height {
                margin-bottom: 20.833rem;
                height: 45.828rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .header-btn {
                    width: 18.227rem;
                    height: 18.227rem;

                    img {
                        width: 10rem;
                        height: 100%;
                    }
                }

                .share-btn {
                    width: 25rem;
                    height: 25rem;
                    margin-right: 10.417rem;
                }
            }
        }

        .personal-box {
            background: #fff;
            border-radius: 12rem 12rem 0 0;
            padding: 0 22.917rem;
            position: relative;

            .avter {
                width: 52.602rem;
                height: 51.563rem;
                position: absolute;
                top: -26.042rem;
                border-radius: 26.042rem;
                overflow: hidden;
            }

            .meet-btn {
                width: 60.938rem;
                height: 25rem;
                background-image: url(https://m.mi.com/static/img/add-btn.9c1fbada18.png);
                background-size: 100% 100%;
                margin-left: 7.813rem;
                position: absolute;
                top: -33.854rem;
                right: 16.146rem;
                font-size: 12rem;
                font-weight: 700;
                color: #fff;
                line-height: 25rem;
                text-align: center;
            }

            .avter-name {
                padding-top: 33.854rem;
                display: flex;
                align-items: center;

                .name {
                    max-width: 329.172rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 17.1875rem;
                }

                .mi9 {
                    display: flex;
                    align-items: center;
                    padding: 0 4.167rem;
                    height: 16.664rem;
                    background: linear-gradient(35deg, #ffc080, #ffddb4);
                    border-radius: 10rem;
                    font-size: 12rem;
                    font-family: MI-LANTING--GBK1-Bold, MI-LANTING--GBK1;
                    font-weight: 700;
                    margin-left: 4.688rem;
                    color: #a74406;
                    line-height: 16.664rem;

                    img {
                        width: 4.164rem;
                        height: 6.766rem;
                        margin-left: 2.604rem;
                    }
                }

            }

            .num-list {
                padding-bottom: 16.667rem;

                .J_linksign-customize {
                    overflow: hidden;
                    margin-top: 16.667rem;
                    display: flex;
                    align-items: center;

                    .layout {
                        display: flex;
                        align-items: flex-end;
                        margin-right: 26.042rem;

                        .num {
                            font-size: 16.667rem;
                            font-family: AvenirLT-Black, AvenirLT;
                            font-weight: 900;
                            color: rgba(0, 0, 0, .87);
                            line-height: 16.664rem;
                            margin-right: 3.646rem;
                        }

                        .tips {
                            font-size: 12rem;
                            font-weight: 400;
                            color: rgba(0, 0, 0, .54);
                        }
                    }
                }
            }
        }

        .show-content {
            background: #fff;

            .content-header {
                height: 44.500rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 104.167rem;
                border-top: 0.500rem solid #f0f0f0;
                border-bottom: 5rem solid #f6f6f6;

                .item-nav {
                    position: relative;

                    .title {
                        font-size: 16.664rem;
                        font-weight: 700;
                        color: #333;
                        line-height: 16.664rem;
                    }

                    &.active {
                        .title {
                            color: #ff5934;
                        }
                    }

                    .line {
                        width: 20.828rem;
                        height: 2.602rem;
                        background: #ff5934;
                        border-radius: 1rem;
                        margin: 6.250rem auto 0;
                        position: absolute;
                        left: 50%;
                        margin-left: -10.417rem;
                        opacity: 1;
                    }

                }
            }
        }

        .show-container {
            background: #fff;
            padding: 0 12.500rem 12.500rem;
            overflow: hidden;


        }
    }
}
</style>