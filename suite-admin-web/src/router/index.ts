import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SuiteLayout from "/@/layout/suite-layout.vue";
import { routerArray } from './routers';
import { createRouterGuards } from './router-guards';


export const RootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: "/dashboard",
    meta: {
      title: 'Root',
    },
  };
  
  export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/user/login/login.vue'),
    meta: {
      title: '登录',
    },
  };

// 需要验证权限
export const asyncRoutes = [...routerArray];

// 普通路由 无需验证权限
export const constantRouter: any[] = [LoginRoute, RootRoute];


export const router =  createRouter({
    history: createWebHashHistory(''),
    routes: [...routerArray, ...constantRouter],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})