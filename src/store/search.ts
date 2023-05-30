import { useSearchSuggest } from "@/api/index";
import type { SearchSuggest } from "@/type/search";
import { StoreOut } from "@/type/store";

export const search: StoreOut = {
  namespaced: true,
  state: () => {
    return {
      showSearchView: false,
      searchKeyword: "",
      suggestData: {} as SearchSuggest,
      historyRecord: [],
    };
  },
  getters: {
    showHot: (state) => {
      return state.searchKeyword == "";
    },
  },
  actions: {
    async suggest({ state, commit }) {
      const data = await useSearchSuggest(state.searchKeyword);
      commit("setSuggest", data);
    },
  },
  mutations: {
    setSuggest(state, sug) {
      state.suggestData = sug;
    },
    setSearchKeyWord(state, word) {
      state.searchKeyword = word;
    },
    isShowSearchView(state, isShow) {
      state.showSearchView = isShow;
    },
    clearHistory(state) {
      state.historyRecord = [];
    },
    setHistory(state, info) {
      state.historyRecord.push(info);
      // state.historyRecord.forEach((item: any) => {
      //   console.log("heiehiehei1");
      //   if (!state.historyRecord.includes(item.id)) {
      //     state.historyRecord.push(info);
      //     console.log("heiehiehei");
      //   }
      // });
    },
  },
};
