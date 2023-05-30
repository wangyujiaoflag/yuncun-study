<template>
  <div class="flex items-center cursor-pointer hover-text">
    <ElAvatar
      size="small"
      round
      class="bg-gray-200"
      :src="headerImg ?? ''"
    ></ElAvatar>
    <span class="text-xs ml-1.5" v-if="isLogin">{{ userName }}</span>
    <span class="text-xs ml-1.5" @click="goLogin" v-else>点击登录</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Pages } from "@/router/pages";
import { useStore } from "@/store/index";
import { onMounted, toRefs } from "vue";
import { getStorage } from "@/utils/local";
const { state, dispatch } = useStore(); // 该方法用于返回store 实例
const { isLogin, userName, headerImg } = toRefs(state.user);
console.log(state.user, isLogin.value, "userInfo");

// onMounted(() => {
//   dispatch("user/checkLogin");
// });

const router = useRouter();
const goLogin = function () {
  // if (!getStorage("token")) {
  router.push(Pages.Login);
  // }
};
</script>

<style lang="scss"></style>
