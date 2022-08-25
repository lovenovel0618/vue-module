import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { getToken } from "../auth";

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import type { CommonRes } from "@/api/global";
import type { Config, RequestMethod } from "./http";


const pendingQueue = new Map();
const CancelToken = axios.CancelToken;

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// 判斷請求是否在佇列中，如果在就執行取消請求
const judgePendingFunc = (config: AxiosRequestConfig) => {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.get(`${config.method}->${config.url}`)();
  }
};

// 刪除佇列中對應已執行的請求
const removeResolvedFunc = (config: AxiosRequestConfig) => {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.delete(`${config.method}->${config.url}`);
  }
};

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 請求發起之前先檢驗該請求是否在佇列中，如果在就把佇列中 pending 的請求 cancel 掉
    judgePendingFunc(config);
    // 接口权限拦截
    // const store = usePermissioStoreWithOut();
    // const { url = '' } = config;
    // if (!WhiteList.includes(url) && store.getIsAdmin === 0) {
    //   if (!store.getAuths.includes(url)) {
    //     console.log('url', url, store.getIsAdmin);
    //     return Promise.reject('没有操作权限');
    //   }
    // }

    // 請求頭 token配置
    const token = getToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }

    // 將 pending 佇列中的請求設定為當前
    config.cancelToken = new CancelToken((cb) => {
      pendingQueue.set(`${config.method}->${config.url}`, cb);
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 刪除佇列中對應已執行的請求
    removeResolvedFunc(response.config);

    const res = response.data as CommonRes<any>;
    // 正確狀態
    if (res.code === 0) {
      return res.result || true;
    }

    // 登录失效
    if (res.code === -1) {
      // useUserStoreWithOut().logout();
    }

    // 異常
    // createMessage.error(res.message);
    return undefined;
  },
  (error) => {
    console.log("err" + error); // for debug
    // 没权限时，不再重复提示
    if (error === "没有操作权限") return;
    // createMessage.error('网络超时，稍后再试吧');
  }
);


const request = (method: Method): RequestMethod => {
  return <R, T>(url: string, config: AxiosRequestConfig = {}) => {
    return (params?: T, requestConfig?: Config) => {
      // TODO: 如果有需要處理 

      return instance.request<T, R>({
        url,
        method,
        params,
        ...config,
      })
    }
  };
};

const cancel = () => {
  console.log("中斷所有請求:");

  if (pendingQueue.size > 0) {
    pendingQueue.forEach((value, key, map) => {
      const cancel = value;
      cancel(key);
    });

    pendingQueue.clear();
  }
};

export default {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
  cancel,
};
