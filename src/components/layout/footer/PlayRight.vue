<template>
  <div class="flex justify-end items-center gap-x-2.5">
    <span class="text-xs">
      {{ useFormatDuring(currentTime) }} / {{ useFormatDuring(duration) }}
    </span>
    <IconPark
      :icon="TextMessage"
      size="18"
      :stroke-width="3"
      class="hover-text-geci"
      title="歌词"
      @click="getWord"
    />
    <div class="flex items-center hover-text" @click="showPlayList = true">
      <IconPark
        :icon="MusicList"
        size="18"
        :stroke-width="3"
        class="hover-text"
        title="播放列表"
      />
      <span class="text-xs">{{ playListCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MusicList, TextMessage } from "@icon-park/vue-next";
import { useFormatDuring } from "@/utils/number";
import IconPark from "@/components/common/IconPark.vue";
import { computed, toRefs } from "vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import { Pages } from "@/router/pages";
const store = useStore();
const { currentTime, duration, showPlayList, id } = toRefs(store.state.player);
const playListCount = computed(() => store.getters["player/playListCount"]);

const router = useRouter();
const getWord = async function () {
  router.push({ name: Pages.music, query: { id: id.value } });
};
</script>

<style lang="scss">
.gap-x-right {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hover-text-geci {
  padding: 0 10px;
}
</style>
