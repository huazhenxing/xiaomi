<template>
    <!-- 卡片 -->
    <div class="card" v-if="item">
        <div class="user">
            <div class="user-avatar">
                <img :src="item.icon" alt="">
            </div>
            <div class="user-info">
                <div class="user-info-name">{{ item.nickname }}</div>
                <div class="user-info-other"><span class="time"> {{ item.create_time }}</span></div>
            </div>
            <div class="user-ctrl"></div>
        </div>

        <div class="card-content">
            <div>
                <div class="content">
                    {{ item.content }}
                </div>
                <div class="images" v-if="item.pic_list.length > 0">
                    <div class="image" v-for="(item_a, index) in item.pic_list" :key="index">
                        <img :src="item_a.img" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="moment-tags">
            <div class="tags-item" v-for="(item_b, index) in item.tag_list" :key="index">
                <img class="icon" :src="item_b.img" alt="">
                <span>{{ item_b.tag }}</span>
            </div>
        </div>

        <div class="card-message" v-if="item.hot_comment">
            <div class="card-message-item">
                <p>
                    <span class="name">{{ item.hot_comment.name }}:</span>{{ item.hot_comment.comment }}
                </p>
            </div>
        </div>

        <div class="card-ctrl">
            <div class="shar-btn">
            </div>
            <div class="send-btn">
                <span class="num">{{ item.comment_num }}</span>
            </div>
            <div class="praise-btn">
                <span class="num">{{ item.praise_num }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
    },
};
</script>

<style lang="scss" scoped>
.card {
    padding-top: 15.625rem;
    text-align: left;

    &::after {
        margin-left: -12.5rem;
        margin-right: -12.5rem;
        display: block;
        content: "";
        border-bottom: 6rem solid #f6f6f6;
    }

    .user {
        margin-bottom: 10.417rem;
        display: flex;
        align-items: center;

        .user-avatar {
            margin-right: 8.333rem;
            width: 27.078rem;
            height: 27.078rem;
            border-radius: 27.078rem;
            overflow: hidden;
        }

        .user-info {
            flex: 1;

            .user-info-name {
                font-size: 12.5rem;
                font-weight: 500;
                color: #161616;
                line-height: 17.500rem;
            }

            .user-info-other {
                font-size: 12rem;
                font-weight: 500;
                color: #757575;

                .time {
                    margin-right: 6.250rem;
                }
            }
        }

        .user-ctrl {
            margin-left: 5.208rem;
            width: 20.828rem;
            height: 20.828rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAQAAAC380bCAAAFNklEQVR42u2c/0+VVRzH7xWQLwqCQeAgES8qQ4uZbkK2pEVtWlrKXFtfcOnYFEmzlpvNNQw1sqar1eZWqWT2A9pc6u5SoPO8P5/zPF3lNhFj2ZKwNCR1uBlpfLk8/aBm2uXen/t4XucveO18nuecz3Pez/F4DAaDwWAw3NW43mCcSnASVUIwzvXeFcoq4dsJ9CDN5hk8vjOhZoRoWX887uMyXqk38Yf0MT7ijVSNJ5DnjvB4hc4uj7fLsQcXMAAXLlwM4gJ9oZ8LZPrjRZY4HqINcHCe+jB0Q3mI+qxu0thmT/PHCyxpeh0tuHpD9t/jD7TxKj1VmPLRe/QCHAije330oglLVKyo4nYKsIfODKs8iEv0AU8+mCRG+MQoegxtuDassgsXh+hplS5GOZDDFfgtorCLo7SuOVeMsp5CL+N8FOU22mL75KzIBVgdVfkkvavy5azIeVRJUQqbvuMa5IlRbhyDedSBUETlRq5QWXIKO9aZjkPoHlY4RFfwqZ6pkyWty9n6FeJ/Npp3jr/oFL/WPlJUV+Uk6il4D13UH6akQ+jmWp7lymojXa8bY83HJ2jD5f+U9EnsojnOWIGdVGeCPY224DgGMIgQQghhkP6kU7RZTTs8SmS/3BATSMH9eNZ6C5/Dz9/Q1/QZ1/JieiCQ4sZI/gyUzkX0DL9EK7BML+AZwTGu7E9BBoPBYDAYDAaDwWAwGAwGg8Hw/yYYF8i0fVTo5FNG+0jhkcaGmEAK8nQxL6bltMaqssvtkmafShWsrZPtEr0ZLehEF7qpi86gBXVcKja+6hRwBe2gVvTePFynEHqplXZalXZuME5cSetkLIEfV8KcLveQ5oXHsoQpB1LsEtqBK2HDE4O4SLt5vjBl5NFmah02J9KHn1DTnC0ouhqM08VoQW/ETNA+mqNS5ZR1Ji9GZ5REEFO1yhGjbPtoObqiRN2OYyNPFKNMhXpNhAjU9Vn+nrY6ctJ9Tr5VRVFmmVr1JkmznGGX0xmK/CyDq5xsMcrtI+2SiG/sIfTTXi7jNDHKrtf2cR2dGFZ5AOe4NpguatOpUrmUdqIHg2HnuAf1/JQbI6q5cL3BOKokjYvUd4fuAHroqF4kbo/t8bheO5cX0m7r9G3K/XQW9XqRymkYKfJrCI3DAtqAL4lxHO3UCsI+ruX5x7LaJQrfpDlblVI1NtJWvYmruCyYLjrM6PF4PP54lapyeKKTzxOdbE67a37oNRgMBoPBYDAYDAaDwWAwGAwiaIjRycF0lUUZarSwQ5nwuF4n0SmwH9HzuJQnB5OE/6N+MIkK9TJsp/04YilqpP28nSq5SOxcN2Xyw7QWh+nW+WMIl3GE3qDZztgGiWcWei7tQDcGbrtDZggD1jkc4FmdCcJ0g0lUiDp0oC/M+fI1dOBtmi1MmcbRCrKGzYlcxTGsbhyjYgW9pbmIFHoiZEUGUI/parQYZU6zn6Qf0R8pEWQ10guC7vuyc7EsarovSG+qCXKe5EJ+Fb9HTfdtE5Tu48lUbUULNJ6gdyTd0JjDL1rnhr3T7bpygNbyeDHKTqJ+1DodNvN1a/jtcsqQ1DtNpV3UEeFO3Yt4PzDJSRS0FbHvxfN0kK6Gi67SEHpJYamwoIyK5TSsx8/UF/a6wrNchUnSuimvO0IV0zpqun19tgatS2jCei4StPO6hT/e9vEqay9+wK9WNy6gm37BSXzFK22fSvBIxPUG4zhNzUQFbeF62ke7UcdLuUilC4+7+VOQp4q5TM/Vj/Ms2xdMqjHXFRoMBoPB4PF4PH8DMOM6OoU7iBYAAAAASUVORK5CYII=) 50% no-repeat;
            background-size: 100% 100%;
        }
    }

    .card-content {
        margin-bottom: 14.063rem;

        .content {
            font-size: 15.625rem;
            font-weight: 500;
            color: #161616;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .images {
            margin-top: 10.417rem;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            border-radius: 5rem;
            // height: 115.102rem;
            overflow: hidden;
            position: relative;

            .image {
                width: 33%;
                height: 115.102rem;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .moment-tags {
        max-height: 31.250rem;
        overflow: hidden;

        .tags-item {
            float: left;
            display: flex;
            align-items: center;
            padding: 4.688rem;
            margin-right: 7.292rem;
            // max-width: 6.6rem;
            margin-bottom: 9.375rem;
            line-height: 12.500rem;
            background: #f6f6f6;
            border-radius: 0.06rem;
            font-size: 12.500rem;
            font-weight: 500;
            color: #757575;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .icon {
                width: auto;
                height: 12.500rem;
                float: left;
                margin-right: 3.646rem;
            }
        }
    }

    .card-message {
        padding: 8.333rem;
        margin-bottom: 7.292rem;
        background: #f6f6f6;
        border-radius: 2rem;

        .card-message-item {
            font-size: 13.5417rem;
            font-weight: 400;
            color: #161616;
            line-height: 18.141rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;

            .name {
                color: #757575;
            }
        }
    }

    .card-ctrl {
        padding-bottom: 10.417rem;
        display: flex;
        justify-content: space-around;

        .shar-btn {
            width: 20.828rem;
            height: 20.828rem;
            background: url(https://m.mi.com/static/img/m_b_share.ac01313399.png) no-repeat;
            background-size: contain;
        }

        .send-btn {
            width: 20.828rem;
            height: 20.828rem;
            background: url(https://m.mi.com/static/img/m_b_msg.1f9f89973f.png) no-repeat;
            background-size: contain;
            position: relative;
        }

        .praise-btn {
            width: 20.828rem;
            height: 20.828rem;
            background: url(https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png) no-repeat;
            background-size: contain;
            position: relative;
        }

        .num {
            width: 52.078rem;
            position: absolute;
            left: calc(100% + 0.03rem);
            top: 50%;
            transform: translateY(-50%);
            font-size: 12.5rem;
            font-family: DIN-Medium, DIN;
            font-weight: 500;
            color: #757575;
        }
    }
}
</style>