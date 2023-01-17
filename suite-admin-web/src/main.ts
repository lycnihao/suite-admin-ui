import * as antIcons from '@ant-design/icons-vue';
import Antd from 'ant-design-vue';
import { createApp } from 'vue'
import App from './App.vue'
import '/@/theme/index.less';
import router, { setupRouter } from '/@/router/index';
import { setupStore } from '/@/store';
import "nprogress/nprogress.css";


const app = createApp(App)

app.use(Antd)
app.use(router)

// 注册图标组件
const icons: any = antIcons
Object.keys(icons).forEach((key) => {
app.component(key, icons[key]);
});

// 挂载状态管理
setupStore(app);

// 挂载路由
await setupRouter(app);

// 路由准备就绪后挂载APP实例
await router.isReady();

app.mount('#app')