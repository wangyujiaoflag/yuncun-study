<template>
  <el-popover
    popper-style="max-width:auto;padding:0;"
    v-model:visible="showSearchView"
    width="250px"
  >
    <template #reference>
      <ElInput
        placeholder="搜索音乐、MV、歌单"
        :prefix-icon="Search"
        clearable
        v-debounce="{ fn: searchInput, wait: 500, event: 'input' }"
        v-model="searchKeyword"
        @keyup.enter.native="searchList"
        @focus="showSearchView = true"
        @focusout="showSearchView = false"
      />
    </template>
    <div class="h-96">
      <el-scrollbar>
        <div>
          <div>历史搜索</div>
          <div @click="del">del</div>
          <div>
            <div
              v-for="item in historyRecord"
              :key="item.id"
              @click="hisClick(item)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="pb-2.5">
          <div v-if="showHot">
            <div class="pt-2 pb-1.5 px-2.5">热门搜索</div>
            <div>
              <div
                v-for="(item, index) in searchHot"
                :key="item.searchWord"
                class="py-2.5 px-2.5 hover-text cursor-pointer flex justify-between items-center text-xs"
                @click="hotClick(item.searchWord)"
              >
                <div>
                  <span class="mr-1">{{ index + 1 }}.</span>
                  <span>{{ item.searchWord }}</span>
                </div>
                <div class="text-red-300 text-xs">
                  {{ item.score }}
                </div>
              </div>
            </div>
          </div>
          <SearchSuggest v-else />
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { Search } from "@icon-park/vue-next";
import { computed, onMounted, ref, toRefs } from "vue";
import type { SearchHotDetail } from "@/type/search";
import { useSearchHotDetail } from "@/api/index";
import SearchSuggest from "@/components/layout/header/SearchSuggest.vue";
import { useStore } from "@/store";

const { state, getters, dispatch, commit } = useStore();
const { showSearchView, searchKeyword, historyRecord } = toRefs(state.search);
const showHot = computed(() => getters["search/showHot"]);

const hotClick = (text: string) => {
  commit("search/setSearchKeyWord", text);
  dispatch("search/suggest");
  commit("search/isShowSearchView", true);
};

const hisClick = (info: any) => {
  commit("search/setSearchKeyWord", info.name);
  dispatch("search/suggest");
  commit("search/isShowSearchView", true);
};
const del = () => {
  commit("search/clearHistory");
};

const searchInput = (value: string | number) => {
  dispatch("search/suggest");
};
const searchList = (value: string | number) => {
  // dispatch("search/suggest");
  // 去详情页
};
const searchHot = ref<SearchHotDetail[]>([]);
onMounted(async () => {
  searchHot.value = await useSearchHotDetail();
});
</script>
<style lang="scss"></style>
