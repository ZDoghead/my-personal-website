import {getSetting} from '@/api/setting';
import {titleController} from '@/utils';

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchSetting(ctx) {
      if (ctx.state.data) {
        return;
      }
      ctx.commit('setLoading', true);
      const res = await getSetting();
      ctx.commit('setData', res);
      ctx.commit('setLoading', false);
      if (res.siteTitle) {
        titleController.setSiteTitle(res.siteTitle);
      }
      const link = document.querySelector('[rel="shortcut icon"]');
      if (link) {
        link.href = res.favicon;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'shortcut icon';
        newLink.href = res.favicon;
        newLink.type = 'images/x-icon';
        document.head.appendChild(newLink);
      }
    }
  }
}