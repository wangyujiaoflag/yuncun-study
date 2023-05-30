<template>
  <div class="content-word">
    <!-- 所有歌词 -->
    <div class="all-word">
      <template v-for="(item, index) in t" :key="index">
        <div v-if="typeof item === 'string'" class="line-word">{{ item }}</div>
        <div v-else class="line-word">
          <span v-if="item[0]" style="color: red; margin-right: 10px">{{
            item[0]
          }}</span>
          <span v-if="item[1]">{{ item[1] }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getSongWords, getSongWord } from "@/api/index";
import { useStore } from "@/store";
import { AllWordLrc } from "@/type/song";
import { onMounted, ref, toRefs } from "vue";
const store = useStore();
const { id, t } = toRefs(store.state.player);
let single = ref({} as any);
// let all = ref({} as AllWordLrc);
onMounted(async () => {
  let data = {} as any;
  let arr = [];
  // 1、获取歌词
  data = await getSongWord(id.value);
  // 2、歌词处理
  arr = data.lrc.lyric.split("\n");
  arr.map((item: string, index: number) => {
    if (item[0] === "[") {
      item = item.slice(1);
      arr[index] = item.split("]");
    }
  });
  // 3、保存到store
  store.commit("player/saveWord", arr);
  console.log(arr, "切割");
  // all.value = await getSongWords(id.value);
  // console.log(single, all, "sing-all");
});
</script>
<style lang="scss">
.content-word {
  width: 100%;
  height: 50vh;
  // overflow: hidden;
  position: relative;
  .all-word {
    position: absolute;
  }
}
.line-word {
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: rgb(226, 231, 91) solid 1px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}
</style>
