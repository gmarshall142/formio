import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuItems: [],
    applicationTitle: '',
  },
  getters: {
    menuItems: state => state.menuItems,
    applicationTitle: state => state.applicationTitle,
  },
  mutations: {
    MENUITEMS: (state, payload) => {
      state.menuItems = payload;
    },
    PAGEDATA: (state, payload) => {
      state.applicationTitle = payload;
    },
  },
  actions: {
    fetchMenus: (context, payload) => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/menus',
      })
        .then((response) => {
          context.commit('MENUITEMS', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    fetchPage: (context, payload) => {
      axios({
        method: 'get',
        url: `http://localhost:3000/pages/${payload.appid}/${payload.pageid}`,
      })
        .then((response) => {
          context.commit('PAGEDATA', response.data.title);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
});
