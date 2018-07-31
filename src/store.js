import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuItems: [],
  },
  getters: {
    menuItems: state => state.menuItems,
  },
  mutations: {
    MENUITEMS: (state, payload) => {
      state.menuItems = payload;
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
  },
});
