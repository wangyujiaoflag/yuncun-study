import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { urlJointQuery } from "./utils/urlJointQuery";
import "./assets/base.scss";
import "./assets/theme.scss";

router.beforeEach((to, from, next) => {
  store.commit("history/addHistory", urlJointQuery(to.path, to.query));
  next();
});

createApp(App)
  .directive("debounce", {
    mounted(el, { value }) {
      const { fn, wait, event } = value;
      if (typeof fn !== "function") return;
      el._timer = null;
      el.addEventListener(event, () => {
        if (el._timer) clearTimeout(el._timer);
        el._timer = setTimeout(() => {
          fn();
          console.log(event, fn, wait, "debounce-3");
        }, wait);
      });
    },
    beforeMount(el, { value }) {
      if (el._timer) {
        clearTimeout(el._timer);
        el._timer = null;
      }
      el.removeEventListener(value.event, value.fn);
    },
  })
  .use(store, key)
  .use(ElementPlus)
  .use(router)
  .mount("#app");
