// axios 统一出口
import hyRequest from "./requset";
import { BASE_URL, TIME_OUT } from "./requset/config";
import LocalCache from "@/utils/csche";

export default new hyRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: BASE_URL,
  // timeout: TIME_OUT,
  // timeout: process.env.VUE_APP_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token
      const token = LocalCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});
