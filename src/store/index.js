import Vue from 'vue'
import { Store, install } from 'vuex'
import banner from './banner';
import siteInit from './siteInit';
import about from './about';
import project from './project';

if (!window.Vuex) {
  install(Vue);
}

const store = new Store({
  strict: true,   // 开启严格模式，只能使用commit方式改变仓库数据
  modules: {
    banner,
    siteInit,
    about,
    project
  }
})

export default store;