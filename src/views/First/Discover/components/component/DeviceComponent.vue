下<template>
  <!-- 设备开始 -->
  <div class="device" v-if="entity_circle">
    <div class="device-img">
      <img :src="entity_circle.img" alt="" width="100%" height="100%" />
    </div>
    <div class="device-name">{{ entity_circle.name }}</div>
    <div class="device-hot">{{ entity_circle.hot }}热度</div>
    <div class="arrow"></div>
  </div>
  <!-- 设备结束 -->
</template>

<script>
export default {
  props: ["entity_circle"],
};
</script>

<style lang="scss" scoped>
// 设备开始
.device {
  padding: 6.771rem 5.208rem;
  text-align: left;
  border-bottom: 3px solid #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  .device-img {
    margin-right: 8.333rem;
    width: 31.25rem;
    height: 31.25rem;
  }
  .device-name {
    flex: 1;
    font-size: 13.5417rem;
    line-height: 1;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .device-hot {
    font-size: 12.5rem;
    line-height: 12.5rem;
    color: #999;
  }
  .arrow {
    width: 20.828rem;
    height: 20.828rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAMAAAApvJHbAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMAAQIDBAUGERIXGSAhIiMkJSYnKCksNEBBQkNERQpW9+0AAACfSURBVEjH7ZVZEoMwDENZShcIodCFJnn3P2fvIH0w0+b9a6w4ttw0lUrlz2jH19jL6luB7ayqn0De1OqXDLB0onzaAdZBU/dTAfJ6UqsDsKidCzvAopoPCch30Xw7A5Somp8/AFGs3s8JKKr5LgJk2XxMQLmK6uEN8DigtvVur+fOf1uz5s25tWPB2G8vW6xc8zLVy3Pvlnh3rFKp/ABfuAgRatQVDBMAAAAASUVORK5CYII=)
      50% no-repeat;
    background-size: 100% 100%;
  }
}
// 设备结束
</style>