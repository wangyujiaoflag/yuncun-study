<template>
  <router-view />
</template>

<style lang="scss"></style>
<script setup lang="ts">
import { useStore } from "@/store/index";
import { setStorage, getStorage } from "@/utils/local";
import { onMounted, onUnmounted, ref, toRefs, watch } from "vue";
import { useFormatDuring } from "./utils/number";

const store = useStore();
if (getStorage("token")) {
  store.replaceState(
    Object.assign({}, store.state, JSON.parse(getStorage("token") || ""))
  );
}
// 在页面刷新时将store保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  setStorage("token", JSON.stringify(store.state));
});

let timer = ref(0);
const { state, commit, dispatch } = useStore();
const { ended, currentTime } = toRefs(state.player);

//监听播放结束
watch(ended, (ended) => {
  if (!ended) return;
  dispatch("player/playEnd");
});

watch(currentTime, (currentTime) => {
  if (!currentTime) return;
  // console.log(useFormatDuring(currentTime), "time-wyj");
});

//启动定时器
onMounted(() => {
  commit("player/init");
  console.log("启动定时器");
  timer.value = setInterval(() => {
    commit("player/interval");
  }, 1000);
});

//清除定时器
onUnmounted(() => {
  console.log("清除定时器");
  clearInterval(timer.value);
});
</script>
