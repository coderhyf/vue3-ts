import { Module } from "vuex";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/types";
import { accountLoginRequest } from "@/service/login/login";
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: ""
    };
  },
  actions: {
    async userInfoAccount({ commit }, payload: IAccount) {
      console.log(payload);
      const loginRes = await accountLoginRequest(payload);
      console.log(loginRes);
      // console.log("userInfoAccount", payload);
    }
  }
};
export default loginModule;
