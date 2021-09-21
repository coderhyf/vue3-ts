import hyRequest from "../index";
import { IAccount, IDataType } from "./types";
import { ILoginResult } from "./types";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  userMenus = '/role/' // role + 'id' 动态的
}

// 登录axios
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading:false
  });
}

// 请求用户数据 id
export function resUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}
// 用户菜单，左侧
export  function resUserMenus(id: number){
  return hyRequest.get<IDataType>({
    url: LoginAPI.userMenus + id + '/menu',
    showLoading: false
  })
}
