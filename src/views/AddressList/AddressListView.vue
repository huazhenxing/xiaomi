<template>
    <div class="app-shell">
        <header class="app-header-wrapper app-shell-header" style="background-color: rgb(255, 255, 255);">
            <div class="app-header-left" @click="clickReturn">
                <div class="app-header-item">
                    <i class="app-header-icon"></i>
                </div>
            </div>

            <div class="app-header-middle">
                <div class="app-header-title" style="color: rgb(0, 0, 0);">收货地址</div>
            </div>
            <div class="app-header-right"></div>
        </header>

        <div class="app-view-wrapper">
            <div class="container app-view app-view-with-header ">
                <div class="page-wrap">
                    <div class="address-manager">
                        <div class="address-manager-list" v-if="shippingAddressList">
                            <div class="ui-card" v-for="(item, index) in shippingAddressList" :key="index"
                                @click="clickSelectAddress(index)">
                                <ul class="ui-card-item ui-list">
                                    <li class="ui-list-item identity">
                                        <span class="consignee">{{ item.name }}</span>
                                        <span>{{ item.tel }}</span>
                                        <em v-if="item.isDefault"> 默认</em>
                                        <span class="delete" v-if="isDisplayDelete"
                                            @click.stop="clickDelete(index)">删除</span>
                                    </li>

                                    <li class="ui-list-item edit">
                                        <p>{{ item.province }} {{ item.city }} {{ item.county }}</p>
                                        <p>{{ item.addressDetail }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="add" @click="goAddressEditView(`/address/edit`)">
                    <div class="btn btn-gradient">
                        <span>+ 新建收货地址</span>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import Vue from 'vue';
import { Dialog } from 'vant';
Vue.use(Dialog);
export default {
    data() {
        return {
            shippingAddressList: JSON.parse(window.localStorage.getItem('shippingAddressList')) || [],
            isDisplayDelete: false,
        };
    },
    created() {
        //判断是从设置进来还是在结算页面进来的
        if (this.$route.query.type == 'user') {
            this.isDisplayDelete = true
        }
    },
    methods: {
        //点击返回上一级
        clickReturn() {
            this.$router.go(-1);
        },

        //点击地址编辑
        goAddressEditView(path) {
            this.$router.push(path);
        },

        //点击删除
        clickDelete(index) {
            Dialog.confirm({
                title: '提示',
                message: '确定删除当前地址？',
            })
                .then(() => {
                    // on confirm
                    this.shippingAddressList.splice(index, 1)
                    window.localStorage.setItem('shippingAddressList', JSON.stringify(this.shippingAddressList))
                })
                .catch(() => {
                    // on cancel
                });

        },

        //点击选择地址
        clickSelectAddress(index) {
            if (this.isDisplayDelete) {
                return
            }
            window.localStorage.setItem('orderAddress', JSON.stringify(this.shippingAddressList[index]))
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
.app-shell {
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

.app-view-wrapper {
    position: relative;
    max-width: 375rem;
    margin: 0 auto;

    .app-view-with-header {
        padding-top: 50px;
    }

    .app-view {
        background: #fff;
        color: #3c3c3c;
    }
}

.container {
    margin-right: auto;
    margin-left: auto;
    flex-basis: 100%;
}

.page-wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.address-manager {
    position: relative;
    padding-bottom: 1rem;

    .ui-card {
        overflow: hidden;
        background: #fff;
        text-align: left;
        padding: 0 16.667rem;

        .ui-card-item {
            padding-left: 0;
            padding-right: 0;
        }

        .ui-list-item:last-child {
            border: 0;
        }
    }

    .ui-card-item {
        display: block;
        font-size: 14.5833rem;
        overflow: hidden;
        background: #fff;
    }

    .ui-list {
        position: relative;
        padding: 11.979rem 0;
        border-bottom: 0.500rem solid rgba(0, 0, 0, .1);

        // &:first-child {
        //     border-bottom: 0rem solid rgba(0, 0, 0, .1);
        // }

        .edit {
            position: relative;
            padding-right: 26.042rem;
            font-size: 12.5rem;

            p {
                font-size: 12.5rem;
                color: rgba(0, 0, 0, .5);
                line-height: 16.664rem;
            }

            &::after {
                content: " ";
                position: absolute;
                width: 6.289rem;
                height: 6.289rem;
                right: 6.289rem;
                top: 50%;
                margin-top: -3.646rem;
                border-right: 1px solid #999;
                border-bottom: 1px solid #999;
                -webkit-transform: rotate(-45deg);
            }
        }
    }

    .identity {
        margin-bottom: 1.563rem;

        span {
            vertical-align: middle;
            color: rgba(0, 0, 0, .87);
        }

        em {
            color: #fff;
            display: inline-block;
            padding: 1.563rem 3.125rem;
            font-size: 12rem;
            font-style: normal;
            margin-left: 11.458rem;
            background-color: #ff5934;
            border-radius: 2rem;
            line-height: 10.414rem;
        }

        .delete {
            float: right;
            color: #999;
        }
    }

    .consignee {
        margin-right: 8.333rem;
        color: #000;
        font-size: 16.667rem;
    }
}

.add {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 1;
    padding: 6.250rem 16.667rem;
    text-align: center;


    span {
        font-size: 15.625rem;
        color: #fff;
    }
}

.btn-gradient {
    display: inline-block;
    height: 37.500rem;
    line-height: 37.500rem;
    background: linear-gradient(46deg, #ff7d00, #ff5934);
    border-radius: 20rem;
    width: 100%;
    font-size: 15.625rem;
    font-weight: 700;
    color: #fff;
}
</style>