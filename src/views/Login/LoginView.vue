<template>
    <div id="root">
        <van-popup v-model="show" position="top" :style="{ height: '15%' }">
            <h3 style="font-size: 16rem;">【小米】登录/注册小米帐号验证码：{{
                captcha
            }}，请勿转发，转发将导致帐号被盗。本验证码5分钟有效。注册后将绑定此安全手机。</h3>
        </van-popup>
        <div class="MuiCollapse-container MuiCollapse-entered">
            <header>
                <div class="root">
                    <div class="language">
                        &lrm;中文(简体)&lrm;
                        <svg class="MuiSvgIcon-root">
                            <path d="M7 10l5 5 5-5z"></path>
                        </svg>
                    </div>
                </div>

                <h4 class="title">
                    <div class="legend">
                        小米帐号登录</div>
                </h4>
            </header>

            <div class="Banner-indextsx-root">
                <svg class="Banner-indextsx-logo" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <g id="48*48">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="48"
                            height="48">
                            <path id="Clip 2" fill-rule="evenodd" clip-rule="evenodd"
                                d="M0 3.05176e-05H48V47.9998H0V3.05176e-05Z" fill="white"></path>
                        </mask>
                        <g mask="url(#mask0)">
                            <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd"
                                d="M42.9972 5.015C38.4683 0.503953 31.9571 0 24.0001 0C16.0329 0 9.51214 0.509889 4.98532 5.03265C0.459587 9.55464 0 16.0649 0 24.0234C0 31.9816 0.459587 38.4954 4.98719 43.018C9.51418 47.5421 16.0334 47.9998 24.0001 47.9998C31.9665 47.9998 38.4858 47.5421 43.013 43.018C47.5398 38.4939 48 31.9816 48 24.0234C48 16.0548 47.5343 9.53698 42.9972 5.015Z"
                                fill="#FF6900"></path>
                            <path id="Fill 3" fill-rule="evenodd" clip-rule="evenodd"
                                d="M22.2335 32.8946C22.2335 33.0556 22.0979 33.1892 21.9328 33.1892H17.8394C17.6715 33.1892 17.5353 33.0556 17.5353 32.8946V22.19C17.5353 22.0276 17.6715 21.8946 17.8394 21.8946H21.9328C22.0979 21.8946 22.2335 22.0276 22.2335 22.19V32.8946Z"
                                fill="white"></path>
                            <path id="Fill 5" fill-rule="evenodd" clip-rule="evenodd"
                                d="M30.248 32.8946C30.248 33.0556 30.1118 33.1892 29.9461 33.1892H26.0497C25.8826 33.1892 25.7464 33.0556 25.7464 32.8946V32.8546V23.6589C25.7423 22.0465 25.6501 20.3892 24.8177 19.5562C24.1019 18.8383 22.7672 18.6738 21.3787 18.6393H14.3157C14.149 18.6393 14.0144 18.7733 14.0144 18.9345V31.9287V32.8946C14.0144 33.0556 13.8769 33.1892 13.7102 33.1892H9.81124C9.64471 33.1892 9.51068 33.0556 9.51068 32.8946V15.1074C9.51068 14.9441 9.64471 14.8113 9.81124 14.8113H21.0604C24.0003 14.8113 27.0737 14.9454 28.5895 16.4632C30.1118 17.9877 30.248 21.0556 30.248 23.9989V32.8946Z"
                                fill="white"></path>
                            <path id="Fill 7" fill-rule="evenodd" clip-rule="evenodd"
                                d="M38.2749 32.8946C38.2749 33.0556 38.1372 33.1892 37.9721 33.1892H34.0738C33.9072 33.1892 33.7718 33.0556 33.7718 32.8946V15.1074C33.7718 14.9441 33.9072 14.8113 34.0738 14.8113H37.9721C38.1372 14.8113 38.2749 14.9441 38.2749 15.1074V32.8946Z"
                                fill="white"></path>
                        </g>
                    </g>
                </svg>
                <div class="Banner-indextsx-slogan">让每个人都能享受科技的乐趣</div>
            </div>

        </div>
        <div style="margin-top: 50rem;">
            <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
            <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
                <template #button>
                    <van-button size="small" type="primary" @click="sendVerificationCode"
                        :class="(isHighlight ? 'correct' : 'incorrect')" v-if="isDisplay">
                        {{ isResend?'重新发送': '发送验证码' }}
                    </van-button>

                    <van-button size="small" type="primary" :class="(isDisplay ? 'correct' : 'incorrect')" v-else>
                        <van-count-down style="color: rgba(255, 255, 255, 0.7);" :time="time" format="重新发送 ss s"
                            @finish="finish" />
                    </van-button>
                </template>
            </van-field>


            <div style="width: 280rem; margin: 50rem auto 0;">
                <van-button round type="primary" size="large" @click="clickLogin"
                    :class="(isLogin ? 'correct' : 'incorrect')">
                    登录
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Field } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { CountDown } from 'vant';
import { Popup } from 'vant';

Vue.use(Popup);

Vue.use(CountDown);

Vue.use(Toast);

Vue.use(Button);
Vue.use(Field);
export default {
    data() {
        return {
            tel: '',//手机号
            isHighlight: false,//发送按钮是否高亮
            time: 60 * 1000,//倒计时
            isDisplay: true,//是否发送
            captcha: null,//随机生成的六位数验证码
            show: false,//验证码信息
            sms: '',//验证码
            isLogin: false,//手机号码正确&&验证码正确
            isResend: false,//是否显示重新发送
        };
    },

    methods: {
        //点击发送验证码
        sendVerificationCode() {
            var re = /^1[34578]\d{9}$/
            if (re.test(this.tel)) {
                this.isDisplay = false
                this.captcha = Math.floor(Math.random() * (999999 - 100000)) + 100000

                let that = this
                setTimeout(function () {
                    that.show = true
                }, 3000);
            } else {
                if (this.tel) {
                    Toast('手机号码格式错误');
                } else {
                    Toast('请输入手机号码')
                }
            }
        },


        //点击确定
        clickLogin() {
            if (!this.isLogin) {
                return Toast({
                    message: '请点击重新发送',
                });
            }

            //短信验证五分钟内有效
            let that = this
            setTimeout(function () {
                that.isLogin = false
            }, 300000);


            var re = /^1[34578]\d{9}$/
            if (re.test(this.tel) && this.sms == this.captcha) {
                // 存储token
                window.localStorage.setItem("token", this.tel);

                // 换取到token之后返回
                this.$router.go(-1)
            } else {
                if (re.test(this.tel)) {
                    if (this.sms) {
                        Toast({
                            message: '验证码不正确',
                        });
                    } else {
                        Toast({
                            message: '验证码不能为空',
                        });
                    }
                } else {
                    Toast({
                        message: '手机号码格式错误',
                    });
                }
            }
        },
        finish() {
            // 倒计时结束
            this.isDisplay = true
            this.isResend = true
        },

    },

    watch: {
        tel: function () {
            this.isHighlight = false
            var re = /^1[34578]\d{9}$/
            if (re.test(this.tel)) {
                this.isHighlight = true
            }
        },
        sms: function () {
            this.isLogin = false
            if (this.sms == this.captcha) {
                this.isLogin = true
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.incorrect {
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(11, 132, 255, 0.3);
    background-color: rgba(11, 132, 255, 0.3);
}

.correct {
    color: #fff;
    border: 1px solid #0B84FF;
    background-color: #0B84FF;
}

//小米帐号登录
.root {
    height: 15.970rem;
    display: flex;
    padding: 12.847rem 27.778rem;
    font-size: 13.1944rem;
    background: #fff;
    align-items: center;
    line-height: 15.970rem;
    justify-content: space-between;

    .language {
        color: rgba(0, 0, 0, 50%);
        cursor: pointer;
        display: flex;
        overflow: hidden;
        font-size: 0.659722rem;
        align-items: center;
        justify-content: flex-start;

        .MuiSvgIcon-root {
            color: rgba(0, 0, 0, 50%);
            font-size: 0.763889rem;
            margin-top: -2.951em;
            fill: currentColor;
            width: 23.609rem;
            height: 23.609rem;
            display: inline-block;
            transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            flex-shrink: 0;
            user-select: none;
        }
    }
}

.title {
    color: rgba(0, 0, 0, .8);
    margin: 0;
    padding: 3.472rem 27.778rem 20.833rem;
    font-size: 20.8333rem;
    background: #fff;
    text-align: center;
    font-weight: normal;

    .legend {
        color: rgba(0, 0, 0, 1);
        overflow: hidden;
        font-size: 20.8333rem;
        font-weight: 600;
        text-overflow: ellipsis;
    }
}

.Banner-indextsx-root {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding-top: 19.444rem;
    flex-direction: column;
    padding-bottom: 47.917rem;
    background-size: cover;
    background-image: url(https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/background.d3d7d2dd.png);
    background-position-y: -56.777778rem;

    .Banner-indextsx-logo {
        text-align: center;
    }

    .Banner-indextsx-slogan {
        color: rgba(0, 0, 0, 0.6);
        padding: 0 27.778rem;
        font-size: 13.8889rem;
        margin-top: 15.278rem;
        text-align: center;
        font-weight: normal;
        line-height: 18.398rem;
    }
}
</style>