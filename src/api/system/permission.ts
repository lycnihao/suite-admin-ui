import { http } from "/@/utils/http/request";

export interface BasicResponseModel<T = any> {
  status: number;
  message: string;
  data: T;
}

/**
 * @description: 获取所有权限
 */
export function getAllPermission() {
  return http.request({
    url: "/permission/getAllPermissions",
    method: "GET",
  });
}

/**
 * @description: 添加权限信息
 */
export function addPermissionInfo(params) {
  return http.request<BasicResponseModel>({
    url: "/permission/add",
    method: "post",
    data: params,
  });
}

/**
 * @description: 更新权限信息
 */
export function updatePermissionInfo(params) {
  return http.request<BasicResponseModel>({
    url: "/permission/update",
    method: "post",
    data: params,
  });
}

/**
 * @description: 删除权限信息
 */
export function deletePermissionInfo(permissionId: number) {
  return http.request<BasicResponseModel>({
    url: `/permission/delete`,
    method: "post",
    params: { permissionId: permissionId },
  });
}

export default {
  getAllPermission,
  addPermissionInfo,
  updatePermissionInfo,
  deletePermissionInfo,
};