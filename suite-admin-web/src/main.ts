import * as antIcons from '@ant-design/icons-vue';
import Antd from 'ant-design-vue';
import { createApp } from 'vue'
import App from './App.vue'
import '/@/theme/index.less';
import { router } from '/@/router/index';

const app = createApp(App)

app.use(Antd)
app.use(router)

// 注册图标组件
const icons: any = antIcons
Object.keys(icons).forEach((key) => {
app.component(key, icons[key]);
});

app.mount('#app')