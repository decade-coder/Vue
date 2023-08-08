import XBAxiosInstance from "../util/http";

// 查询考试
export const getExamList = () => {
  return XBAxiosInstance({
    method: "get",
    url: "/api/exam",
  });
};

// 新增考试
export const addExamItem = (params) => {
  return XBAxiosInstance({
    method: "post",
    url: "/api/exam",
    data: params,
  });
};

// 更新考试
export const updataExamItem = (params) => {
  return XBAxiosInstance({
    method: "post",
    url: "/exam",
    params,
  });
};

// 移除考试
