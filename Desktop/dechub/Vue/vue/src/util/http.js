import axios from "axios";
import qs from "qs";

import serviceConfig from "../config/http";
import { ACCESS_TOKEN, AUTH } from "../config/constant";
import router from "../router";

const actionMapping = {
  get: "view",
  post: "add",
  put: "edit",
  delete: "delete",
};

// 创建axios实例
const XBAxiosInstance = axios.create({
  // TODO: 动态更改baseURL
  baseURL: serviceConfig.baseURL,
  timeout: serviceConfig.timeout,
});

// 请求拦截器
XBAxiosInstance.interceptors.request.use(
  (config) => {
    // 如果开启token认证
    if (XBAxiosInstance.useTokenAuthorization) {
      if (config.url !== "login") {
        let { headers } = config;
        const token = localStorage.getItem(ACCESS_TOKEN);
        const action = actionMapping[config.method];
        token &&
          Object.assign(headers, {
            [AUTH]: token,
          });
        const currentRight = router.currentRoute.meta;
        if (currentRight && !currentRight.includes(action)) {
          alert("没有权限");
          return Promise.reject(new Error("没有权限"));
        }
      }
    }
    // 设置请求头
    if (!config.headers["Content-Type"]) {
      if (config.method === "post") {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        // 序列化(比如表单数据)
        config.data = qs.stringify(config.data);
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// 响应拦截器
XBAxiosInstance.interceptors.response.use(
  (res) => {
    let { data } = res;
    if (data.returnCode === 401) {
      router.push("/login");
      sessionStorage.clear();
      // 清除vuex中动态路由的缓存
      location.reload();
    }
    // TODO: 全局请求进度条
    return data;
  },
  (error) => {
    let message = "";
    if (error && error.message) {
      switch (error.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP 版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
      }
    }
    return Promise.reject(message);
  }
);
