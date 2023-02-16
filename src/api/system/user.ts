import { http } from "/@/utils/http/request";

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取当前登录用户信息
 */
export function getUserInfo() {
  return http.request<BasicResponseModel>({
    url: "/user/info",
    method: "get",
  });
}

/**
 * @description: 修改用户密码
 */
export function updatePassword(params: any) {
  return http.request<BasicResponseModel>({
    url: "/user/updatePassword",
    method: "post",
    params: params,
  });
}

/**
 * @description: 获取用户信息
 */
export function getUserInfoById(id: number) {
  return http.request<BasicResponseModel>({
    url: "/user/info",
    method: "get",
    params: { userId: id },
  });
}

/**
 * @description: 添加用户信息
 */
export function addUserInfo(params: any) {
  return http.request<BasicResponseModel>({
    url: "/user/add",
    method: "post",
    data: params,
  });
}

/**
 * @description: 更新用户信息
 */
export function updateUserInfo(params: any) {
  return http.request<BasicResponseModel>({
    url: "/user/update",
    method: "post",
    data: params,
  });
}

/**
 * @description: 删除用户信息
 */
export function deleteUserInfo(userId: number) {
  return http.request<BasicResponseModel>({
    url: `/user/delete?userId=${userId}`,
    method: "post",
  });
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request<BasicResponseModel>({
    url: "/login",
    method: "POST",
    params,
  });
}

/**
 * @description: 用户登出
 */
export function logout() {
  return http.request({
    url: "/logout",
    method: "POST",
  });
}

/**
 * @description: 获取用户列表
 */
export function getUserList(params: any) {
  return http.request<any>({
    url: "/user/list",
    method: "get",
    params,
  });
}

export default {
  getUserInfo,
  updatePassword,
  getUserInfoById,
  addUserInfo,
  updateUserInfo,
  deleteUserInfo,
  login,
  logout,
  getUserList,
};
