<template>
  <h4>你的专属歌单</h4>
  <div
    class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5 2xl:grid-cols-10"
  >
    <div
      v-for="(item, index) in personalized.slice(10)"
      :key="index"
      :class="{ 'item-1': index === 0 }"
      @click="router.push({ name: 'playlist', query: { id: item.id } })"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.picUrl"
        :play-count="item.playCount"
        show-play-count
      />
      <div class="mt-2 text-xs text-main truncate">{{ item.name }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import { getPersonalized } from "@/api/index";
import { Personalized } from "@/type/common";
import CoverPlay from "@/components/common/coverPlay.vue";
const router = useRouter();
let personalized = reactive([] as Personalized[]);
onMounted(async () => {
  const data = await getPersonalized();
  // 这里不能直接赋值
  personalized.push(...data);
  // console.log(data, "personalized");
});
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
