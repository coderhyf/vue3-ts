import { Module } from "vuex";
import router from "@/router";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/types";
import LocalCache from "@/utils/csche";
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-menus";
// api
import { accountLoginRequest, resUserInfoById, resUserMenus } from "@/service/login/login";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: "",
      userMenus: [],
      permission: []
    };
  },
  mutations: {
    // 保存token
    changToken(state, token: string) {
      state.token = token;
    },
    // 用户信息
    changUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    // 用户菜单
    changUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((path) => {
        router.addRoute("main", path);
      });
      const permissions = mapMenusToPermissions(userMenus);
      state.permission = permissions;
    }
  },
  actions: {
    async userInfoAccount({ commit }, payload: IAccount) {
      const loginRes = await accountLoginRequest(payload);
      // 本地存储token
      commit("changToken", loginRes.data.token);
      LocalCache.setCache("token", loginRes.data.token, true);
      // 请求用户信息
      const res = await resUserInfoById(loginRes.data.id);
      commit("changUserInfo", res.data);
      LocalCache.setCache("userInfo", res.data, true);
      // 用户菜单，左侧
      const resMenus = await resUserMenus(res.data.role.id);
      commit("changUserMenus", resMenus.data);
      LocalCache.setCache("userMenus", resMenus.data, true);
      await router.push("/main");
    },
    // 防止vuex刷新丢失数据
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache("token");
      if (token) {
        commit("changToken", token);
      }
      const userInfo = LocalCache.getCache("userInfo");
      if (userInfo) {
        commit("changUserInfo", userInfo);
      }
      const userMenus = LocalCache.getCache("userMenus");
      if (userMenus) {
        commit("changUserMenus", userMenus);
      }
    }
  }
};
export default loginModule;
