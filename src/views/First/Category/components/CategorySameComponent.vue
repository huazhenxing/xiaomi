<template>
  <div class="swiper-container" v-if="classList">
    <CategoryImgUrl :img_url="classList?.category_list[0].body.items[0]" />

    <van-index-bar :index-list="indexList">
      <div v-for="item in count" :key="item">
        <van-index-anchor
          :index="classList.category_list[item * 2 - 1].body.category_name"
        >
          <CategoryName
            :title="classList?.category_list[item * 2 - 1].body.category_name"
          />
        </van-index-anchor>
        <CategoryItemsList
          :items="classList.category_list[item * 2].body.items"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor } from "vant";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
import CategoryImgUrl from "@/views/First/Category/components/CategoryImgUrl.vue";
import CategoryItemsList from "@/views/First/Category/components/CategoryItemsList.vue";
import CategoryName from "@/views/First/Category/components/CategoryName.vue";
export default {
  components: {
    CategoryImgUrl,
    CategoryItemsList,
    CategoryName,
  },
  props: ["classList"],
  data() {
    return {};
  },

  computed: {
    count: function () {
      return this.classList
        ? Math.floor(this.classList.category_list.length / 2)
        : 0;
    },
    indexList: function () {
      //   return this.classList
      //     ? this.classList.category_list
      //         .filter((item, index) => {
      //           return index % 2 == 1;
      //         })
      //         .map((item) => item.body.category_name)
      //     : [];
      return this.classList
        ? this.classList.title_list.map((item) => item.title)
        : [];
    },
  },

  watch: {},
  created() {},
  mounted() {},
  modules: {},
};
</script>

<style lang="scss">
.swiper-container {
  padding-right: 16.667rem;
}

.van-index-bar__sidebar {
  padding: 13.021rem 0rem;
  width: 263.016rem;
  overflow: auto;
  text-align: left;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;

  white-space: nowrap;
  display: inline-block;

  -webkit-transform: translateY(0);
  transform: translateY(0);
  text-align: left;
  flex-direction: row;
  &::-webkit-scrollbar {
    height: 0rem;
  }
}
.van-index-bar__index {
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;

  display: inline-block;
  margin-right: 17.1875rem;
  color: #666;
  padding: 3.125rem 5.20833rem;
  font-size: 12.5rem;

  color: #333;
  border-radius: 5rem;
}

.van-index-bar__index--active {
  background: #efefef;
}
</style>