<template>
  <div class="cells_auto_fill" v-if="img_url">
    <img :src="img_url.img_url" alt="" />
  </div>
</template>

<script>
export default {
  props: ["img_url"],
};
</script>

<style lang="scss" scoped>
.cells_auto_fill {
  width: 254.859rem;
}
</style>