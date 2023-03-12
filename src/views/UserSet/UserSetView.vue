<template>
    <div>
        <Header />
        <div class="page-user-set">
            <ol>
                <li @click="JumpAddressListView(`/address/list`)">
                    <span>地址管理</span>
                </li>
                <li>
                    <span>经营证照</span>
                </li>
                <li>
                    <span>协议规则</span>
                </li>
                <li>
                    <span>隐私管理</span>
                </li>
                <li>
                    <span>小米商城用户协议</span>
                </li>
                <li>
                    <span>小米商城隐私政策</span>
                </li>
                <li>
                    <span>小米帐号使用协议</span>
                </li>
                <li>
                    <span>小米帐号隐私政策</span>
                </li>
            </ol>
            <footer @click="clicSignOut">
                <span>退出账号</span>
            </footer>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
    components: {
        Header,
    },
    methods: {
        //点击退出账号
        clicSignOut() {
            window.localStorage.removeItem('token')
            this.$router.go(-1);
        },
        //点击跳转到AddressListView页面
        JumpAddressListView(path) {
            this.$router.push(path + '?type=user');
        }
    }
}
</script>

<style lang="scss" scoped>
.page-user-set {
    padding-top: 50px;
    background: #fff;
    color: #3c3c3c;

    ol {
        font-size: 15.625rem;
        margin-bottom: 15.625rem;

        li {
            width: 100%;
            display: inline-block;
            padding: 10.417rem;
            border-bottom: 1px solid #f6f6f6;
            box-sizing: border-box;
            position: relative;
            text-align: left;
            color: #3c3c3c;

            span {
                color: #3c3c3c;
            }

            &::after {
                content: " ";
                position: absolute;
                width: 6.289rem;
                height: 6.289rem;
                right: 6.289rem;
                top: 50%;
                margin-top: -3.646rem;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                transform: rotate(-45deg);
            }
        }
    }

    footer {
        background-color: #f4f4f4;
        text-align: center;
        height: 52.078rem;
        line-height: 52.078rem;
        box-shadow: 0 3px 14px 2px rgb(0 0 0 / 12%);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;

        span {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 15.625rem;
            color: #3c3c3c;
        }
    }
}
</style>