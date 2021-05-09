import Vue from 'vue'
import App from './App.vue'
import './styles/global.less';
import { showMessage } from './utils';
import router from './router';
import './mock';
import './api/banner';
import './api/blog';
import eventBus from './eventBus';
import store from './store';

// 注册一个全局自定义指令
import vLoading from '@/directives/loading';
import vLazy from '@/directives/lazy';
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

store.dispatch('siteInit/fetchSetting');

Vue.config.productionTip = false;
Vue.prototype.$showMessage = showMessage;
Vue.prototype.$bus = eventBus;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
