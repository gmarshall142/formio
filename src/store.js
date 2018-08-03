import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuItems: [],
    applicationTitle: '',
    customFormData: {},
  },
  getters: {
    menuItems: state => state.menuItems,
    applicationTitle: state => state.applicationTitle,
    customFormData: state => state.customFormData,
  },
  mutations: {
    MENUITEMS: (state, payload) => {
      state.menuItems = payload;
    },
    PAGEDATA: (state, payload) => {
      state.applicationTitle = payload.title;
    },
    FORMDATA: (state, payload) => {
      state.customFormData = payload;
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
          context.commit('PAGEDATA', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    fetchForm: (context, payload) => {
      axios({
        method: 'get',
        url: `http://localhost:3000/pages/formio`,
      })
        .then((response) => {
          context.commit('FORMDATA', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
});
