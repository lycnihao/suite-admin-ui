import { RouteRecordRaw } from 'vue-router';
import SuiteLayout from "/@/layout/suite-layout.vue";

export const homeRouters:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '_home',
        redirect: { name: 'home' },
        meta: {
            title: '首页',
        },
        component: SuiteLayout,
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: '首页',
                },
                component: () => import('/@/views/Home/index.vue'),
            }
        ]
    }
]