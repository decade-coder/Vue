import XBAxiosInstance from "../util/http";

export const register = () => {
  return XBAxiosInstance({
    method: "get",
    url: "/exam",
  });
};

export const login = (params) => {
  return XBAxiosInstance({
    method: "get",
    url: "/login",
    params,
  });
};
