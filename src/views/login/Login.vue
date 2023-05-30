<template>
  登录页
  <el-card class="el_add_card" shadow="hover" v-loading="isLogin">
    <img style="width: 128px; height: 128px" :src="loginCode" alt="" />
    <button @click="loginAgiain" v-show="isNeedReLoad">重新获取二维码</button>
    <button v-show="isLogin">已登录</button>
  </el-card>
</template>
<script setup lang="ts">
import { useStore } from "@/store/index";
import { toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { Pages } from "@/router/pages";
import { getStorage } from "@/utils/local";

const { state, dispatch } = useStore(); // 该方法用于返回store 实例
const { isLogin, loginCode, isNeedReLoad } = toRefs(state.user);
console.log(state.user, "state.user");

const loginAgiain = function () {
  dispatch("user/peopleLogin");
};

const router = useRouter();
watch(
  () => state.user.isLogin,
  (newValue, oldValue) => {
    console.log(newValue, "newVa");
    if (newValue) {
      router.push({ name: Pages.discover });
    } else {
      dispatch("user/peopleLogin");
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style></style>
