import { createRouter, createWebHashHistory } from "vue-router";
import SuiteLayout from "/@/layout/suite-layout.vue";
import { routerArray } from './routers';

export const router =  createRouter({
    history: createWebHashHistory(),
    routes: routerArray
})