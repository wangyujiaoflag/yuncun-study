<template>
  <div class="playlist">
    <div class="p-5" v-if="playlist">
      <Info :playlist="playlist" :play-all="() => playAll()" />
      <el-tabs class="mt-3" v-model="tab">
        <el-tab-pane lazy :label="`歌曲 ${songs.length}`" name="tracks">
          <SongList :songs="songs" />
        </el-tab-pane>
        <el-tab-pane lazy label="评论" name="comments" />
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, toRefs } from "vue";
import Info from "./Info.vue";
import SongList from "./SongList.vue";
import type { Song } from "@/type/song";
import type { PlayListDetail } from "@/type/playlist";
import { usePlayListDetail, usePlayListTrackAll } from "@/api/index";
import { useStore } from "@/store/index";

const { commit, dispatch, state } = useStore();
const tab = ref("tracks");
const route = useRoute();
const playlist = ref<PlayListDetail>();
const songs = ref<Song[]>([]);

const playAll = () => {
  commit("player/pushPlayList", { replace: true, list: songs.value });
  if (songs.value.length) {
    dispatch("player/play", songs.value[0]?.id || "");
  }
};

const getData = () => {
  const id: number = Number(route.query?.id);
  usePlayListDetail(id).then((res) => {
    playlist.value = res;
  });
  usePlayListTrackAll(id).then((res) => {
    songs.value = res;
  });
};
onMounted(getData);
</script>

<style lang="scss">
.playlist {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__header {
    @apply m-0;
  }
}
</style>
