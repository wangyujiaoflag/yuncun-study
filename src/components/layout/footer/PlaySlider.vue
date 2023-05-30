<template>
  <div class="player-slider">
    <el-slider
      :show-tooltip="false"
      :min="0"
      v-model="currentTime"
      :max="duration"
      @change="onSliderChange"
      @input="onSliderInput"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useStore } from "@/store/index";
const { state, commit } = useStore();
const { duration, currentTime } = toRefs(state.player);
const onSliderInput = function () {
  commit("player/onSliderInput");
};
const onSliderChange = function () {
  commit("player/onSliderChange", currentTime.value);
};
</script>

<style lang="scss">
.player-slider {
  .el-slider {
    height: 10px;

    .el-slider__runway,
    .el-slider__bar {
      height: 2px;
      border-radius: 0;
    }

    .el-slider__button-wrapper {
      @apply opacity-0 transition-opacity;
      width: 10px;
      height: 10px;
      top: -10.5px;
    }

    &:hover {
      .el-slider__button-wrapper {
        @apply opacity-100;
      }
    }

    .el-slider__button {
      width: 8px;
      height: 8px;
      @apply bg-emerald-400;
    }
  }
}
</style>
