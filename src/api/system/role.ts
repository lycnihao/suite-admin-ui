import { http } from "/@/utils/http/request";
export interface BasicResponseModel<T = any> {
  status: number;
  message: string;
  data: T;
}

/**
 * @description: 角色列表
 */
export function getRoleList(params) {
  return http.request({
    url: "/role/list",
    method: "GET",
    params,
  });
}

/**
 * @description: 获取所有角色
 */
export function getAllRoles() {
  return http.request({
    url: "/role/getAllRoles",
    method: "GET",
  });
}

/**
 * @description: 角色信息
 */
export function getRoleInfo(id: number) {
  return http.request({
    url: `/role/info?id=${id}`,
    method: "GET",
  });
}

/**
 * @description: 添加角色信息
 */
export function addRoleInfo(params) {
  return http.request<BasicResponseModel>({
    url: "/role/add",
    method: "post",
    data: params,
  });
}

/**
 * @description: 更新角色信息
 */
export function updateRoleInfo(params) {
  return http.request<BasicResponseModel>({
    url: "/role/update",
    method: "post",
    data: params,
  });
}

/**
 * @description: 删除角色信息
 */
export function deleteRoleInfo(roleId: number) {
  return http.request<BasicResponseModel>({
    url: "/role/delete",
    method: "post",
    params: { roleId: roleId },
  });
}

export default {
  getRoleList,
  getAllRoles,
  getRoleInfo,
  updateRoleInfo,
  deleteRoleInfo,
};