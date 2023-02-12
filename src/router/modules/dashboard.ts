import { RouteRecordRaw } from "vue-router";
import SuiteLayout from "/@/layout/suite-layout.vue";

export const dashboardRouters: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "_dashboard",
    redirect: { name: "dashboard" },
    meta: {
      title: "首页",
    },
    component: SuiteLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "首页",
        },
        component: () => import("/@/views/system/dashboard/index.vue"),
      },
    ],
  },
];
