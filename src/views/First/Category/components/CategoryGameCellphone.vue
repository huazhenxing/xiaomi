<template>
  <div class="swiper-container" v-if="classList">
    <CategoryImgUrl
      :img_url="classList.category_list[0].body.items[0]"
    />

    <van-index-bar :index-list="indexList">
      <van-index-anchor :index="classList.category_list[1].body.category_name">
        <CategoryName :title="classList.category_list[1].body.category_name" />
      </van-index-anchor>

      <CategoryProductIist
        :product_list="classList.category_list[2].body.product_list"
      />

      <van-index-anchor :index="classList.category_list[3].body.category_name">
        <CategoryName :title="classList.category_list[3].body.category_name" />
      </van-index-anchor>

      <CategoryItemsList :items="classList.category_list[4].body.items" />
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
import CategoryProductIist from "@/views/First/Category/components/CategoryProductIist.vue";
export default {
  components: {
    CategoryImgUrl,
    CategoryItemsList,
    CategoryName,
    CategoryProductIist,
  },
  props: ["classList"],
  data() {
    return {};
  },

  computed: {
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
};
</script>


<style lang="scss" scoped>
.swiper-container {
  padding-right: 16.667rem;
}
</style>