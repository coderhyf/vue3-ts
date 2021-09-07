// axios 统一出口
import hyRequest from "./requset";
import { BASE_URL, TIME_OUT } from "./requset/config";

export default new hyRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: BASE_URL,BASE_URL
  // timeout: TIME_OUT,
  // timeout: process.env.VUE_APP_TIME_OUT,
  interceptors: {
    responseInterceptor: (config) => {
      // 携带token
      const token = "";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptor: (err) => {
      return err;
    }
  }
});
