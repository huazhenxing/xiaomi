<template>
  <!-- 底部开始 -->
  <div class="bottom-action">
    <div class="bottom-action-left">
      <div class="bottom-action-btn buy-btn">
        ￥1599起 立即购买
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAnFBMVEUAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////v///////////////////////v/////////////////////////////////+///////+///////////////+/v/+/////v////+kjwqbAAAAMHRSTlMAAQIDBgkOEhQuLzY6PURGSEtMTU5PV1leX42urrfJ1drb297g4eLj5Ofo6Onp/f73eMRnAAAAtklEQVQoz6WTaRKCMBSDKVURlEVBXBHcniAq1Nz/bl7ARmd8f9PXzJemjvPzjDSVx7s1O+AVuC+UXQ9LQFLXqutEgGZlt1C+GDRL+w0qOnSmnhGL9ATUud1CTy9AyzAnZ6DN7JjuvAKuGbGIBbgRCxUI0OYEM64MGOZg8wT2Q7IPsq8CeRF/HQuL6Bs/z+9L/jo9obe/n4qOHQPzBaQ/OhHD+heW6Fl/vQIP1n9nvF3rf/7f53kDDgwVMThwprwAAAAASUVORK5CYII="
          alt=""
          class="i-arrow"
        />
      </div>
    </div>
    <div class="bottom-action-right">
      <div class="bottom-action-ctrl">
        <div class="action-icon">
          <img
            src="https://m.mi.com/static/img/m_b_share.ac01313399.png"
            alt=""
            class="icon"
          />
        </div>
        <div class="action-icon">
          <img
            src="https://m.mi.com/static/img/m_b_msg.1f9f89973f.png"
            alt=""
            class="icon"
          />
          <span>{{ total.total_primary_comment_num }}</span>
        </div>
        <div class="action-icon">
          <img
            src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
            alt=""
            class="icon"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- 底部开始 -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// 底部开始
.bottom-action {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 50rem;
  left: 0;
  right: 0;
  padding: 7.813rem 0 7.813rem 12.5rem;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  z-index: 999;
  .bottom-action-left {
    flex: 1;
    .bottom-action-btn {
      height: 34.375rem;
      line-height: 34.375rem;
      border-radius: 34.375rem;
      font-weight: 500;
      font-size: 13.5417rem;
      display: flex;
      align-items: center;
      &.buy-btn {
        padding: 0;
        justify-content: center;
        background: #ff5528;
        color: #fff;
        text-align: center;
      }
      .i-arrow {
        display: inline-block;
        width: 10.414rem;
        height: 10.414rem;
      }
    }
  }
  .bottom-action-right {
    .bottom-action-ctrl {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .action-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13.5417rem;
        color: #666;
        font-weight: 500;
        width: 75rem;
        .icon {
          width: 20.828rem;
          height: 20.828rem;
        }
      }
    }
  }
}
// 底部结束
</style>