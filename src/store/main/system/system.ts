import { Module } from "vuex";
import { ISystemState } from "./types";
import { IRootState } from "@/store/types";
import { getPageListData } from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
    };
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // let pageUrl = "";
      // switch (pageName) {
      //   case "users" :
      //     pageUrl = "/users/list";
      //     break;
      //   case "role":
      //     pageUrl = "/role/list";
      //     break;
      // }
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, pageResult.data.list);
      commit(`chang${changePageName}Count`, pageResult.data.totalCount);
      // switch (pageName) {
      //   case "users" :
      //     commit(`changeUsersList`, pageResult.data.list);
      //     commit(`changUsersCount`, pageResult.data.totalCount);
      //     break;
      //   case "role":
      //     commit(`changeRoleList`, pageResult.data.list);
      //     commit(`changRoleCount`, pageResult.data.totalCount);
      //     break;
      // }
    }
  }
};
export default systemModule;
