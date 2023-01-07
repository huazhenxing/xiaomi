  <template>
  <!-- 头部开始 -->
  <header
    v-if="type != 99"
    class="app-header-wrapper app-shell-header border"
    :class="
      type == 1 || type == 2 || type == 3 || type == 100
        ? 'background255'
        : 'background242'
    "
  >
    <div class="app-header-left">
      <div class="app-header-item" @click="returnToSuperior">
        <i class="app-header-icon"></i>
      </div>
    </div>
    <div class="app-header-middle">
      <div v-if="type == 1" class="app-header-title">内容详情</div>
      <div v-if="type == 2 || type == 3" class="app-header-title">文章详情</div>
      <div v-if="type == 5" class="app-header-title">投票详情</div>
      <div v-if="type == 6" class="app-header-title">问题详情</div>
      <!-- <div
        v-if="type == 99"
        class="app-header-title"
      >
        视频详情
      </div> -->
      <div v-if="type == 100" class="app-header-title">买家秀详情</div>
    </div>
    <div class="app-header-right">
      <div
        class="app-header-item"
        v-if="type == 1 || type == 2 || type == 3 || type == 100"
      >
        <i class="app-header-icon"></i>
      </div>
    </div>
  </header>
  <!-- 头部结束 -->
</template>

<script>
export default {
  props: ["type"],

  mounted() {},
  methods: {
    //点击返回上一级
    returnToSuperior() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
// 头部开始
.app-shell-header {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 50%;
  width: 375rem;
  transform: translateX(-50%);
  & > div {
    display: flex;
    align-items: center;
  }
  .app-header-item {
    display: block;
    width: 31.25rem;
    margin: 0 10.417rem;
    .app-header-icon {
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      display: block;
      overflow: hidden;
    }
  }
  .app-header-left {
    .app-header-icon {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
      width: 26.039rem;
      height: 26.039rem;
    }
  }
  .app-header-middle {
    flex: 1;
    font-size: 15.625rem;
    .app-header-title {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
    }
  }
  .app-header-right {
    min-width: 52.078rem;
    .app-header-icon {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAABDlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgAAAAAAAAAAAAAAAAACAAIAAAAAAAACAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAEAAQABAAABAQABAQH5nwh2AAAAWnRSTlMAAQMEBQYICQoLDQ4PEBITFBUZHCUqKywtMzQ5Ojs+QEFMVVhZXl9gYmRrbnBxcnZ3eXp7fH6Pj5CRkpSUlaGhpqiqq623wMXR1tfc3+Dh4uPk5OXm5ubm5uZI4vvLAAABJUlEQVQYGe3BSyMCURgG4G9yiRKli0oikluoiOSeSzSlYd6m/P8/Ypo2Z7KxOAuL93mEiIiIiIiIiIiIiIiI6G9mC+cna/JLrlLNB2RaslwvLIgWRuoZQL8WEZ/4LUb4aK6KT+S0B3w9JESH5ZYNV/dIVOGGBWBoXwVEMV+1MPYSFQ2KFlwOOkFRZE14+nlRpNrAAK5j0eAGDjw5UezBgacqiq0eXCOgJRo0MTFcF0UJYwOgIorNLiYeRYNtTHSCosia8Dg5UaTa3wBGcMqiwdKTDQfoHYoqdPkJOLCuRTVz1ofLfl0UDYzMveXgvRYTn8SFCZiNuPjE6m9A9y4tWhjRjf1iMihTQtndUiYsU+bSOwf5FUOIiIiIiIiIiIiIiIiI/rUfLiVAIk2yGYMAAAAASUVORK5CYII=);
      background-size: 31.25rem 31.25rem;
      width: 31.25rem;
      height: 31.25rem;
    }
  }
}
.app-shell-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  color: #666;
  padding: 0;
  transition: transform 0.2s ease-out;
}
.border {
  border-bottom: 1px solid #f5f5f5;
}
.background242 {
  background-color: rgb(242, 242, 242);
}
.background255 {
  background-color: rgb(255, 255, 255);
}
// 头部结束
</style>