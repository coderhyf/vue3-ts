// 接口设计
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface hyRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

// 接口设计
export interface hyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: hyRequestInterceptors<T>;
  showLoading?: boolean;
}
