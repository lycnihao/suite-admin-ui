import { RouteRecordRaw } from 'vue-router';
export const loginRouters: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/user/login/login.vue'),
    meta: {
      title: '登录',
    },
  },
];