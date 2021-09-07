import hyRequest from "../index";
import { IAccount } from "./types";

enum LoginAPI {
  AccountLogin = "/login"
}

// 登录axios
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  });
}
