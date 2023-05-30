<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in banners" :key="item.targetId">
      <img :src="item.imageUrl" class="banner-image" @click="onClick(item)" />
    </el-carousel-item>
  </el-carousel>
</template>
<script setup>
import { useBanner } from "@/api/index";
const banners = await useBanner();

import { useStore } from "@/store/index";
const { dispatch } = useStore();

const onClick = function (item) {
  console.log(item.targetType, item.targetId, item, "banner-click");
  if (item.targetType === 1) {
    dispatch("player/play", item.targetId);
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
