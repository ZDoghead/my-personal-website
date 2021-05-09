import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import {titleController} from '../utils';

if (!window.VueRouter) {
  // 安装VueRouter插件到Vue中
  Vue.use(VueRouter);
}

// 创建一个VueRouter实例进行路由的配置
const router = new VueRouter({
  routes,
  mode: 'history'
});

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
})

export default router;