import { http } from "/@/utils/http/request";
export interface BasicResponseModel<T = any> {
  status: number;
  message: string;
  data: T;
}

/**
 * @description: 获取登录日志列表
 */
export function getLoginLog(params) {
  return http.request({
    url: "/loginLog/list",
    method: "GET",
    params,
  });
}

export default {
  getLoginLog,
};
