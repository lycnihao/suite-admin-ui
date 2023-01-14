import { Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'NProgress';
import { storage } from '/@/utils/storage';
import { ACCESS_TOKEN } from '/@/store/mutation-types';
import { useUserStoreWidthOut } from '/@/store/modules/user';
import { useAsyncRouteStoreWidthOut } from '/@/store/modules/asyncRoute';
import SuiteLayout from "/@/layout/suite-layout.vue";

const whitePathList = ['/login', '/home'];

// 404 on a page
export const ErrorPageRoute = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: SuiteLayout,
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'ErrorPageSon',
        component: '/@/views/exception/404.vue',
        meta: {
          title: 'ErrorPage',
          hideBreadcrumb: true,
        },
      },
    ],
  };

export function createRouterGuards (router: Router) {
    const userStore = useUserStoreWidthOut();
    const asyncRouteStore = useAsyncRouteStoreWidthOut();

    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        if (from.path === '/login' && to.name === 'errorPage') {
            next('/');
            return;
        }

        // 白名单
        if (whitePathList.includes(to.path)) {
            next();
            return;
        }

        const token = storage.get(ACCESS_TOKEN);
        if (!token) {
            // 您可以在没有权限的情况下访问。您需要将路由meta.ignoreAuth设置为true
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            // 重定向登录页
            const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
                path: '/login',
                replace: true,
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }

        if (asyncRouteStore.getIsDynamicAddedRoute) {
            next();
            return;
        }

        const { status, data } = await userStore.getInfo();
        if (status != 200) {
            // 重定向登录页
            const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
              path: '/login',
              replace: true,
            };
            if (to.path) {
              redirectData.query = {
                ...redirectData.query,
                redirect: to.path,
              };
            }
            next(redirectData);
            return;
          }

          const routes = await asyncRouteStore.generateRoutes(data);
        // 动态添加可访问路由表
        routes.forEach((item: any) => {
            router.addRoute(item as unknown as RouteRecordRaw);
        });

        //添加404
        const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
        if (isErrorPage === -1) {
            router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
        }

        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        asyncRouteStore.setDynamicAddedRoute(true);
        next(nextData);
        NProgress.done();
    })

    router.afterEach((to, _, failure) => {
        document.title = (to?.meta?.title as string) || document.title;
        const asyncRouteStore = useAsyncRouteStoreWidthOut();
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = asyncRouteStore.keepAliveComponents;
        const currentComName: any = to.matched.find((item) => item.name == to.name)?.name;
        if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
        // 需要缓存的组件
        keepAliveComponents.push(currentComName);
        } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
        // 不需要缓存的组件
        const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName);
        if (index != -1) {
            keepAliveComponents.splice(index, 1);
        }
        }
        asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
        NProgress.done();
    });

    router.onError((error) => {
        console.log(error, '路由错误');
      });
}