import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { CommonRes } from "@/api/global";

export type Instance = AxiosInstance & {
  [key: string]: any;
};

// 接口返回 形狀
export type Config = {
  alert?: boolean;
  loading?: boolean;
  loadingText?: string;
};

export type Plugin = {
  request?: (config: Config) => Config;
  response?: (data: AxiosResponse) => AxiosResponse;
};

// export type Request<R, T> = (
//   params?: T,
//   config?: Config
// ) => Promise<CommonRes<R>>;

// export type Request<R, T> = (
//   params?: T,
//   config?: Config
// ) => Promise<R>
export type Request<R, T> = (
  params?: T, config?: Config
) => Promise<CommonRes<R>>;

export type RequestMethod = <R, T = any>(url: string, config?: AxiosRequestConfig) => Request<T, R>;
