import axios from "axios";
import type { AxiosInstance } from "axios";
import type { hyRequestConfig, hyRequestInterceptors } from "./types";
import { ElLoading } from "element-plus";
import { ILoadingInstance } from "element-plus/packages/loading/src/loading.type";

const DEFAULT_LOADING = true;

class hyRequest {
  instance: AxiosInstance;
  interceptors?: hyRequestInterceptors;
  loading?: ILoadingInstance;
  showLoading: boolean;

  constructor(config: hyRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存基本信息 ?? null或者undefined的时候类型推倒为DEFAULT_LOADING
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;
    // axios响应，针对某个响应请求做处理，看情况使用
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch);
    // axios 拦截，针对某个拦截请求做处理，看情况使用
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch);
    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0,.5)"
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        // 虚假响应成功
        const data = res.data;
        if (data.xxx === "-1101") {
          console.log("虚假成功");
        } else {
          return data;
        }
      },
      (err) => {
        this.loading?.close();
        switch (err.response.status) {
          case "404":
            console.log("错误消息");
            break;
        }
        return err;
      }
    );
  }

  request<T>(config: hyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
          // 请求成功以后，将loading回复初始值， 不会影响下一次请求加载loading
          this.showLoading = DEFAULT_LOADING;
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: hyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: hyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: hyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: hyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default hyRequest;
