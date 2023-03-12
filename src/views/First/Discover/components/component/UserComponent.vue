<template>
  <!-- 用户开始 -->
  <div class="user" v-if="user">
    <div class="user-avatar" @click="jumpPersonalView(`/micircle/personal/${user.mid}`)">
      <img :src="user.icon" alt="" width="100%" height="100%" />
    </div>
    <div class="user-info">
      <div class="user-info-name">
        {{ user.nickname }}
      </div>
      <div class="user-info-other">
        <span class="time">{{ user.create_time }}</span>
        <span class="device" v-if="user.dev_type">{{ user.dev_type }}</span>
      </div>
    </div>
    <div class="user-focus">关注</div>
  </div>
  <!-- 用户结束 -->
</template>

<script>
export default {
  props: ["moment_list", "user"],
  methods: {
    jumpPersonalView(routing) {
      // console.log('触发', routing);
      this.$router.push(routing)
    }
  }
};
</script>

<style lang="scss" scoped>
// 用户开始
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
      line-height: 17.5rem;
    }

    .user-info-other {
      font-size: 12rem;
      font-weight: 500;
      color: #757575;

      .time {
        margin-right: 6.25rem;
      }

      .device {
        padding-left: 10.417rem;
        position: relative;

        &::before {
          content: "";
          width: 6.766rem;
          height: 10.938rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAABBCAYAAABMx43BAAAEBklEQVRoQ+2aS2hcVRzGv+/MnY5OtSrRYsS2YoVKUEFREfGBUAsudFnFrCQhsxHcuREka8WFASFzDcGgWGgQdOFCqkUoNLooqWmxvh+rtlqttrahmd7zyX+8E0IfuWeul7aLcyBkmPs///Pd33nMved8bLfbdUlPktwO4BEAtwC4GpehkJSkv0h+C+CDWq22a2Rk5CtOTU09nWWZidsGYCOAawHUV9HYIXlM0mEAtwO4BkAHwA8A/iSZnVtX0ro8t/2/quD+FwEcI/m1Ca3X67uYpul7AO6WdE8APJH8B8CCpL0AngGwAcAJkh9KOpQLXk7lnLPPGyU9IekOAAMB7cCoAnif5KyJ/F7SDYGVjdIRkp8A2AngZUlDJI8AeLNWq82RNKrLpdPp0Dm3BcB27/2jOf0QnSZ0j6Q5ttvtkyTXSFoTUNMbNQCHSM5L2irpZpL23eckfwFgMeeW9ZLuBbAZwI0B7fRC9pNcMJJnJRGA9Ys1sEjydB+JKgn13juStXzSNvKkB7tAVoi0709J2kfyi0pa7iNJ3ps2Xh8AMHQxkUbxuKRZADaZLnVpOuc2SXo2X2ms/fNI2qT4DcBEq9V67VIrnJiYWFev1+90zr0E4PmLkYwii3omkiwiFHo9kgwlVRQXSRYRCr0eSYaSKoqLJIsIhV6PJENJFcVFkkWEQq+HkLT3m7NX7ENvu922h117EYsii7p91e6OJIvwrbgeSfYBa9XQSDKS7G2zxCWoj7EQJ04fsOISVBWsSDKS7BGIS1BVYyGSjCRXPgXxv9PwK/eVNk3T7qlqFBkwcIu2WXokbSfD7Ak7nXPvBuStNCTLsrWSbiP53IUOQJcP0b33mfkrAPxeqYKwZHbW3SA5IOn6vMryKW2PZHf+5EJtEvVTzC9hBpIzAE7nxpCeIcT2mUKLxSYATLCV80WGZloZZxOOpLkNfgZwOLfMbJB0KwD76zpFSpZqRNpBPoAfSb4FYG+WZaeSJNki6SlJLwIwb0dZoZWJNNPIx5J2ADjQarU6MzMzA0tLS9u896/klhzzA5UplYmck/R2kiS7R0dHf+0pSdP0cQCvSroLwPoyCqsck/Mkd5D8aGxs7DsTMz4+7gYHB7eSfF3SJgDXlRVpTitzs5yQZBaXEF/QhdoyO9gBALOS9jcajb+zLNvsvTdH1Qu5wLK59znn5k3kQUk3/Y8usR+BM+a6krQA4Ghum7nP7GVlJk1urPMkd0vaYyLfkPQQgIfLdEme0NbJk2Z8yvfem7kJqax70G7ccr3THUqTk5OPOefuz22JZtdaW+D6K3Mv/dRZlPSHc+4bAJ8mSfJl99dgenp6SNKD3vsh773NRCNxuUp33XXOfdZsNn8aHh4+/i9JKNsfmC6KSgAAAABJRU5ErkJggg==) 50% no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          top: 8%;
          text-decoration: inherit;
          vertical-align: inherit;
          box-sizing: inherit;
        }
      }
    }
  }

  .user-focus {
    padding: 0 17.188rem;
    height: 23rem;
    line-height: 23rem;
    background: #fff;
    border-radius: 12.5rem;
    border: 1px solid #ff5528;
    font-size: 12.5rem;
    font-weight: 500;
    text-align: center;
    color: #ff5528;
  }
}

// 用户结束
</style>