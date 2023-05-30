<template>
  <div class="flex items-center justify-between drag h-14 yuncun-header">
    <div class="flex items-center pl-5">
      <IconPark
        :icon="Left"
        :size="iconSize"
        :stroke-width="2"
        class="icon-button"
        @click="pre"
      />
      <IconPark
        :icon="Right"
        :size="iconSize"
        :stroke-width="2"
        class="icon-button"
        @click="next"
      />
      <div class="search no-drag ml-2">
        <SearchPop />
      </div>
    </div>
    <div class="flex items-center mr-5">
      <UserInfo />
      <IconPark :icon="Mail" :stroke-width="2" class="icon-button" />
      <IconPark
        :icon="Platte"
        :stroke-width="2"
        class="icon-button"
        @click="changeThemeMode"
      />
      <IconPark :icon="HamburgerButton" :stroke-width="2" class="icon-button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import {
  HamburgerButton,
  Left,
  Mail,
  Platte,
  Right,
} from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import IconPark from "../../common/IconPark.vue";
import UserInfo from "./UserInfo.vue";
import SearchPop from "./SearchPop.vue";
import { useStore } from "@/store/index";
const iconSize = 22;

const router = useRouter();
const { state } = useStore();
const data = toRefs(state.history);
const pre = function () {
  console.log(data.prevPath.value, "路由");

  router.push(data.prevPath.value);
};
const next = function () {
  router.push(data.nextPath.value);
};

const mode = ref(false);

const changeThemeMode = () => {
  window.document.documentElement.setAttribute(
    "data-theme",
    mode.value ? "dark" : "light"
  );

  mode.value = !mode.value;
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
.yuncun-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(214, 240, 215);
  padding: 10px 0;
  .header-right {
    display: flex;
    .icon-button {
      display: flex;
      align-items: center;
    }
  }
}
</style>
