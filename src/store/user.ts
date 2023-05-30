import { StoreOut } from "@/type/store";
import { setStorage, delStorage, getStorage } from "@/utils/local";
import {
  checkCodeToLogin,
  getAccoutInfo,
  getCodeKey,
  getLoginStatus,
  useLoginByCode,
  logout,
  peopleLogin,
} from "@/api/index";
export const user: StoreOut = {
  namespaced: true,
  state: {
    // 登录信息
    token: "", // 接口中的cookie
    isLogin: false, // 是否是登录状态
    loginCode: "", // 二维码
    isNeedReLoad: false, // 是否需要重新获取二维码
    userId: "", // 用户id
    headerImg: "", // 用户头像
    userName: "", // 用户名
    // 其他
  },
  mutations: {
    setLoginInfo(
      state,
      { qrimg, isNeedReLoad, headerImg, userName, token, userId, isLogin }
    ) {
      state.loginCode = qrimg;
      state.isNeedReLoad = isNeedReLoad;
      state.headerImg = headerImg;
      state.userName = userName;
      state.token = token;
      state.userId = userId;
      state.isLogin = isLogin;
      console.log(state, "state-set");
      if (token) {
        setStorage("token", JSON.stringify(state));
      }
    },
    clearLoginInfo(state) {
      state.token = state.userId = state.headerImg = state.userName = "";
      state.isLogin = false;
      delStorage();
    },
  },
  actions: {
    // 检测当前登录状态
    async checkLogin({ commit }) {
      const { data } = (await getLoginStatus()) as any;
      const isLogin = getStorage("token") ? true : !!(data && data.profile);
      commit("setLoginInfo", { isLogin });
    },
    // 二维码登录
    async login({ commit }) {
      const { data } = (await getCodeKey()) || ({} as any);
      const { unikey = "" } = data;
      const res: any = await useLoginByCode(unikey);
      if (res.data.qrimg) {
        commit("setLoginInfo", { qrimg: res.data.qrimg });
        let timer: any = null;
        timer = setInterval(() => {
          checkCodeToLogin(unikey).then((status: any) => {
            // 过期，重新获取二维码
            if (status.code == "800") {
              commit("setLoginInfo", { isNeedReLoad: true });
            } else if (status.code == "802") {
              commit("setLoginInfo", {
                headerImg: status.avatarUrl,
                userName: status.nickname,
              });
            } else if (status.code == "803") {
              clearInterval(timer);

              // setStorage("token", state);
              // 获取账户信息
              getAccoutInfo().then((res: any) => {
                // accout、profile
                // 获取用户信息--目前看起来没有什么用
                const useid = res.account.id;
                commit("setLoginInfo", {
                  token: status.cookies,
                  isLogin: true,
                  userId: useid,
                });
                // getUserInfo(useid).then((res) => {
                //   console.log(res, "用户详情");
                // });
              });
              return "ok";
            }
          });
        }, 1000);
      }
    },
    // 游客登录
    async peopleLogin({ state, commit }) {
      const data: any = await peopleLogin();
      console.log(data, "peopleLogin");
      if (data) {
        const { cookie, userId } = data;
        commit("setLoginInfo", {
          token: cookie,
          userId: userId,
          userName: "游客账号",
          isLogin: true,
        });
        console.log(state, "state-user");
      }
    },
    // 退出登录
    async logout({ commit }) {
      const { data } = (await logout()) as any;
      if (data) {
        commit("clearLoginInfo");
      }
    },
  },
};
