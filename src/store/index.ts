import { createStore, Store, useStore as useVuexStore } from "vuex";
import { user } from "./user";
import { RootWithModel, RootState } from "../type/store";
import { InjectionKey } from "vue";
import { player } from "./player";
import { search } from "./search";
import { history } from "./history";

export const key: InjectionKey<Store<RootWithModel>> = Symbol();
export const store = createStore<RootState>({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    player,
    search,
    history,
  },
});

export const useStore = (): Store<RootWithModel> => {
  return useVuexStore(key);
};
