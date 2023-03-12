<template>
  <!-- 问题板块 -->
  <div class="card" v-if="content">
    <div class="card-content" @click="
      ClickJump(
        `discover/article/${content.id}/${content.content_type}`,
        content.content_type,
        content.announce_id,
        content.vote_detail ? content.vote_detail.vote_id : ''
      )
    ">
      <div class="question">
        <div class="user-ctrl"></div>
        <div class="title">
          <div class="question-i"></div>
          {{ content.question.question }}
        </div>
        <div class="moment-tags moment-ask-tags">
          <div class="tags-item" v-for="item in content.tag_list" :key="item.id">
            <img :src="item.img" alt="" class="icon i-device" />
            <span>{{ item.tag }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="answers">
          <div class="answers-item" v-for="(item, index) in content.question.answer_list_v2" :key="index">
            <div class="icon">
              <img :src="item.icon" alt="" width="100%" height="100%" />
            </div>
            <p>
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-ctrl">
      <div class="shar-btn"></div>
      <div class="send-btn">
        <span class="name">{{ content.question.answer_num }}</span>
      </div>

      <div class="praise-btn">
        <span class="name">{{ content.question.praise_num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content"],
  methods: {
    ClickJump(url, type, announce_id, vote_id) {
      console.log('跳转');
      if (type == 6) {
        this.$router.push({ path: url, query: { announce_id } });
      } else if (type == 5) {
        this.$router.push({ path: url, query: { vote_id } });
      } else {
        this.$router.push(url);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-left: 12.5rem;
  margin-right: 12.5rem;
  padding-top: 15.625rem;
  text-align: left;

  .card-content {
    margin-bottom: 14.063rem;

    .normal {
      .content {
        font-size: 15.625rem;
        font-weight: 500;
        color: #161616;
        line-height: 30rem;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .images {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        border-radius: 0.14rem;
        height: 115.102rem;
        overflow: hidden;
        position: relative;
        margin-top: 10.417rem;

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

    .question {
      font-size: 15.625rem;
      color: #333;
      position: relative;

      .user-ctrl {
        width: 20.828rem;
        height: 20.828rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAQAAAC380bCAAAFNklEQVR42u2c/0+VVRzH7xWQLwqCQeAgES8qQ4uZbkK2pEVtWlrKXFtfcOnYFEmzlpvNNQw1sqar1eZWqWT2A9pc6u5SoPO8P5/zPF3lNhFj2ZKwNCR1uBlpfLk8/aBm2uXen/t4XucveO18nuecz3Pez/F4DAaDwWAw3NW43mCcSnASVUIwzvXeFcoq4dsJ9CDN5hk8vjOhZoRoWX887uMyXqk38Yf0MT7ijVSNJ5DnjvB4hc4uj7fLsQcXMAAXLlwM4gJ9oZ8LZPrjRZY4HqINcHCe+jB0Q3mI+qxu0thmT/PHCyxpeh0tuHpD9t/jD7TxKj1VmPLRe/QCHAije330oglLVKyo4nYKsIfODKs8iEv0AU8+mCRG+MQoegxtuDassgsXh+hplS5GOZDDFfgtorCLo7SuOVeMsp5CL+N8FOU22mL75KzIBVgdVfkkvavy5azIeVRJUQqbvuMa5IlRbhyDedSBUETlRq5QWXIKO9aZjkPoHlY4RFfwqZ6pkyWty9n6FeJ/Npp3jr/oFL/WPlJUV+Uk6il4D13UH6akQ+jmWp7lymojXa8bY83HJ2jD5f+U9EnsojnOWIGdVGeCPY224DgGMIgQQghhkP6kU7RZTTs8SmS/3BATSMH9eNZ6C5/Dz9/Q1/QZ1/JieiCQ4sZI/gyUzkX0DL9EK7BML+AZwTGu7E9BBoPBYDAYDAaDwWAwGAwGg8Hw/yYYF8i0fVTo5FNG+0jhkcaGmEAK8nQxL6bltMaqssvtkmafShWsrZPtEr0ZLehEF7qpi86gBXVcKja+6hRwBe2gVvTePFynEHqplXZalXZuME5cSetkLIEfV8KcLveQ5oXHsoQpB1LsEtqBK2HDE4O4SLt5vjBl5NFmah02J9KHn1DTnC0ouhqM08VoQW/ETNA+mqNS5ZR1Ji9GZ5REEFO1yhGjbPtoObqiRN2OYyNPFKNMhXpNhAjU9Vn+nrY6ctJ9Tr5VRVFmmVr1JkmznGGX0xmK/CyDq5xsMcrtI+2SiG/sIfTTXi7jNDHKrtf2cR2dGFZ5AOe4NpguatOpUrmUdqIHg2HnuAf1/JQbI6q5cL3BOKokjYvUd4fuAHroqF4kbo/t8bheO5cX0m7r9G3K/XQW9XqRymkYKfJrCI3DAtqAL4lxHO3UCsI+ruX5x7LaJQrfpDlblVI1NtJWvYmruCyYLjrM6PF4PP54lapyeKKTzxOdbE67a37oNRgMBoPBYDAYDAaDwWAwGAwiaIjRycF0lUUZarSwQ5nwuF4n0SmwH9HzuJQnB5OE/6N+MIkK9TJsp/04YilqpP28nSq5SOxcN2Xyw7QWh+nW+WMIl3GE3qDZztgGiWcWei7tQDcGbrtDZggD1jkc4FmdCcJ0g0lUiDp0oC/M+fI1dOBtmi1MmcbRCrKGzYlcxTGsbhyjYgW9pbmIFHoiZEUGUI/parQYZU6zn6Qf0R8pEWQ10guC7vuyc7EsarovSG+qCXKe5EJ+Fb9HTfdtE5Tu48lUbUULNJ6gdyTd0JjDL1rnhr3T7bpygNbyeDHKTqJ+1DodNvN1a/jtcsqQ1DtNpV3UEeFO3Yt4PzDJSRS0FbHvxfN0kK6Gi67SEHpJYamwoIyK5TSsx8/UF/a6wrNchUnSuimvO0IV0zpqun19tgatS2jCei4StPO6hT/e9vEqay9+wK9WNy6gm37BSXzFK22fSvBIxPUG4zhNzUQFbeF62ke7UcdLuUilC4+7+VOQp4q5TM/Vj/Ms2xdMqjHXFRoMBoPB4PF4PH8DMOM6OoU7iBYAAAAASUVORK5CYII=) 50% no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        right: 0;
      }

      .title {
        margin-bottom: 6.25rem;
        max-width: 328.125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-weight: 500;
        color: #161616;

        .question-i {
          display: inline-block;
          margin-right: 4.167rem;
          width: 15.102rem;
          height: 15.102rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAABdFBMVEUAAAD/AAD/////gAD/gID/VVX/gED/ZjP/SST/VTn/VSr/WyT/Wzf/ZjP/YDD/Wi3/USj/Xij/WSb/Zib/VTH/YST/XS7/WSz/VSr/YCr/XCn/WCf/VSb/WyT/WCP/VSL/VSr/Win/WCj/VSf/XSf/WiX/VyT/VSP/VSv/Uyn/VSf/VyX/Vyb/VSr/Vyn/Vyb/Vyn/WCj/Vin/WCb/Vin/Vyj/Vin/VSn/Vij/VSn/Vyn/WCj/VCf/Vir/VSb/Vyn/VSj/Vif/VSn/Uyj/Vij/Vyj/VSf/Vin/Vib/VCn/VSj/Vib/Vij/Vif/Vif/VSn/Vij/Vyj/Vin/VSf/VSj/Vij/VSf/Vin/VSj/VCn/Vij/VCj/Vif/Vij/Vij/VSf/VSn/VSj/VSj/VSn/VSn/Vin/VCj/VSj/VSf/VSj/VSj/VSj/VSn/VSj/VSj+VCj/VSj/VSj/VSj/VSj/VSj/VSj/VSj/VSj/VSj/VSj+VCj/VSh+rrY9AAAAenRSTlMAAQECAgMEBQcJDA4ODxARExMUFBUVFhcYGBkaGxwdHh4fICEhIiMkJCUnKS8wMjU4Oj5DREZKS01RWFpbXF1eYGJjZWVmaXFzdnh5eXyChIWHiZaZoaKjpaamp6m3uLy8xsjI1tbX2Nzg6+3v8PHy8vP09vf4+fr9/jKoXmsAAAGOSURBVEjH1dVpVwFRGMDxa2coe5ibSkUqlRZp31Mq7aQ9bdJeCN0v30Uxcw7mmZf93805v/OcmTGeixBNotJaWVw/h4lRStBvqmYHFsqmk5exugUDYs2K0mQQphnpdEkzEGOWoaMdUI0tCqTF8NTIKkLrECtC6xHnYvAy0FgbODpwRx7Gndi/tsFvqKYOJkn+ehgvPRN+czW1c/mD5BMuoMZ4J0ueQv71TU7J+rrtILHYyn+wq3o6HIl4fU4M1O+EFO+ek7Be3a8U9grq8+rLuPVBdCZNyxSAen6KNvsJ1N3FK9fLP9PfImfvbdN2M0At7tcRpycC5UY6BPVWPN4O/2I7PR7u931DyEwDXfmXut3uLs9YiqQna+o3nh6InhxFz+7zJDUKmN3zWH4x+dPemvq1UODe8UUul/vKpo/7uLuqupAPYzGuDoRWFqaD/fw9aBKxNRnEwDGrQkobWBtlSKKDbnC7hp5pcjNQN0mLR6DCCJluL2M6nbEIPqBRI/07upFCrdMb6qdnVLKS+wFqZEJxW6nLUgAAAABJRU5ErkJggg==) no-repeat;
          background-size: contain;
          transform: translateY(0.04rem);
        }
      }

      .moment-tags {
        max-height: 33.328rem;
        overflow: hidden;

        .tags-item {
          margin: 0rem 7.292rem 9.375rem 0rem;
          padding: 4.688rem;

          display: flex;
          align-items: center;

          max-width: 328.125rem;
          font-weight: 500;
          color: #757575;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .icon {
            width: 14.578rem;
            height: 14.578rem;
            margin-right: 3.646rem;
          }

          span {
            font-weight: 500;
            color: #757575;
            font-size: 14.5833rem;
          }
        }
      }

      .line {
        margin-bottom: 11.979rem;
        display: block;
        height: 0;
        border-bottom: 1px solid hsla(0, 0%, 92%, 0.6);
      }

      .answers {
        .answers-item {
          display: flex;
          margin-bottom: 10.417rem;
          line-height: 16.66rem;
          font-size: 14.5833rem;
          color: #000;

          .icon {
            margin-right: 8.333rem;
            width: 16.664rem;
            height: 16.664rem;
            border-radius: 50%;
            overflow: hidden;
          }

          p {
            max-width: 302.078rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
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

    .name {
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

  .user {
    margin-bottom: 10.417rem;
    display: flex;
    align-items: center;

    .user-avatar {
      margin-right: 8.33rem;
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
        line-height: 17.5rem;
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

  .moment-tags {
    max-height: 31.25rem;
    overflow: hidden;

    .tags-item {
      float: left;
      display: flex;
      align-items: center;
      padding: 4.688rem;
      margin-right: 7.292rem;
      max-width: 157.469rem;
      margin-bottom: 9.375rem;
      line-height: 12.5rem;
      border-radius: 5rem;
      font-size: 12.5rem;
      font-weight: 500;
      color: #757575;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .icon {
        width: auto;
        height: 12.5rem;
        float: left;
        margin-right: 3.646rem;
        width: 12.5rem;
        height: 12.5rem;
      }

      span {
        font-size: 12.5rem;
        font-weight: 500;
        color: #757575;
        line-height: 12.5rem;
      }
    }
  }

  .card-message {
    padding: 8.333rem;
    margin-bottom: 7.292rem;
    background: #f6f6f6;
    border-radius: 5rem;

    .card-message-item {
      font-size: 13.5417rem;
      font-weight: 400;
      color: #161616;
      line-height: 18.14rem;
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

  &::after {
    margin-left: -12.5rem;
    margin-right: -12.5rem;
    display: block;
    content: "";
    border-bottom: 6.25rem solid #f6f6f6;
  }
}
</style>