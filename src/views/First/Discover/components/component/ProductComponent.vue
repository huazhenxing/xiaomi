<template>
  <!-- 产品开始 -->
  <div class="product-header">
    <div class="img-box">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b3553083a4975325eab6470d94465548.jpg"
        alt=""
        width="100%"
        height="100%"
      />
    </div>
    <div class="title">Xiaomi 10S</div>
  </div>
  <!-- 产品结束 -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// 产品开始
.product-header {
  height: 41.664rem;
  padding: 0 16.667rem;
  position: fixed;
  z-index: 9999;
  top: 50px;
  left: 0;
  right: 0;
  background: #fafafa;

  -webkit-box-align: center;
  align-items: center;
  display: flex;
  -webkit-box-flex: 1;
  flex-wrap: nowrap;
  .img-box {
    border-radius: 5rem;
    margin-right: 12.5rem;
    line-height: 37.5rem;
    img {
      width: 22.391rem;
      height: 29.688rem;
      align-items: center;
      vertical-align: middle;
    }
  }
  .title {
    font-size: 12.5rem;
    color: #000;
    line-height: 14.578rem;
  }
  // .device-hot {
  //   font-size: 12.5rem;
  //   line-height: 12.5rem;
  //   color: #999;
  // }
  // .arrow {
  //   width: 20.828rem;
  //   height: 20.828rem;
  //   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAMAAAApvJHbAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMAAQIDBAUGERIXGSAhIiMkJSYnKCksNEBBQkNERQpW9+0AAACfSURBVEjH7ZVZEoMwDENZShcIodCFJnn3P2fvIH0w0+b9a6w4ttw0lUrlz2jH19jL6luB7ayqn0De1OqXDLB0onzaAdZBU/dTAfJ6UqsDsKidCzvAopoPCch30Xw7A5Somp8/AFGs3s8JKKr5LgJk2XxMQLmK6uEN8DigtvVur+fOf1uz5s25tWPB2G8vW6xc8zLVy3Pvlnh3rFKp/ABfuAgRatQVDBMAAAAASUVORK5CYII=)
  //     50% no-repeat;
  //   background-size: 100% 100%;
  // }
}
// 产品结束
</style>