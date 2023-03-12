<template>
    <div class="app-shell">
        <header class="app-header-wrapper app-shell-header" style="background-color: rgb(255, 255, 255);">
            <div class="app-header-left" @click="clickReturn">
                <div class="app-header-item">
                    <i class="app-header-icon"></i>
                </div>
            </div>

            <div class="app-header-middle">
                <div class="app-header-title" style="color: rgb(0, 0, 0);">
                    新增地址
                </div>
            </div>
            <div class="app-header-right"></div>
        </header>

        <div class="app-view-with-header"></div>

        <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" :show-postal=false />
    </div>
</template>

<script>
import Vue from 'vue';
import { AddressEdit } from 'vant';
import { areaList } from '@vant/area-data';

Vue.use(AddressEdit);
import { Toast } from 'vant';

export default {
    data() {
        return {
            areaList,//地区列表
            searchResult: [],//推荐位置
            shippingAddressList: JSON.parse(window.localStorage.getItem('shippingAddressList')) || [],//收货地址列表
            shippingAddressItem: null,//临时位置
        };
    },
    created() {
    },
    methods: {
        //点击返回上一级
        clickReturn() {
            this.$router.go(-1);
        },
        //点击保存按钮时触发
        onSave(content) {
            if (content.isDefault) {
                //默认地址只能有一个，如果前面有了默认地址，现在再添加一个进来，前面那个默认地址里面的isDefault要变成false
                this.shippingAddressList = this.shippingAddressList.map((item) => item.isDefault ? { ...item, isDefault: false } : item)
                this.shippingAddressList.unshift(content)
            } else {
                this.shippingAddressList.unshift(content)
                //默认地址应该排在收货地址列表最前面

                //1.先找到isDefault==true
                this.shippingAddressItem = this.shippingAddressList.find((item) => item.isDefault)

                if (this.shippingAddressItem) {
                    //2.然后删掉this.shippingAddressList数组里面的isDefault==true的对象
                    this.shippingAddressList.splice(this.shippingAddressList.indexOf(this.shippingAddressItem), 1)

                    //3.最后再存this.shippingAddressItem进this.shippingAddressList数组里面
                    this.shippingAddressList.unshift(this.shippingAddressItem)
                }
            }
            //本地存储
            window.localStorage.setItem('shippingAddressList', JSON.stringify(this.shippingAddressList))
            //保存之后返回
            this.$router.go(-1);
        },
        //确认删除地址时触发
        onDelete() {
            Toast('删除成功');
        },
        //修改详细地址时触发
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: '粤嵌科技',
                        address: '从化区',
                    },
                ];
            } else {
                this.searchResult = [];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.van-address-edit {
    .van-address-edit__buttons {

        ::v-deep .van-button--danger {
            background-color: aqua;
        }


    }

}

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

    .app-view-with-header {
        padding-top: 50px;
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
</style>