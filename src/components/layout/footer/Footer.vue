<template>
  <div class="flex flex-col items-stretch h-20">
    <PlaySlider />
    <div class="flex grow px-5 items-center">
      <div class="flex-1">
        <!-- <PlayLeft /> -->
      </div>
      <div class="flex-1">
        <PlayControl />
      </div>
      <div class="flex-1">
        <PlayRight />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PlaySlider from "./PlaySlider.vue";
import PlayControl from "./PlayControl.vue";
import PlayLeft from "./PlayLeft.vue";
import PlayRight from "./PlayRight.vue";
</script>
<style lang="scss" scoped>
.yuncun-footer {
  display: flex;
  height: 100%;
  position: relative;
  .yuncun-progress {
    width: 100%;
    height: 10px;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
  }
  .footer-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
