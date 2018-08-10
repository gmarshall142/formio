import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuItems: [],
    applicationTitle: '',
    customFormData: {},
    formBuilder: {
      appId: '',
      pageId: '',
      formId: '',
      data: {},
    },
  },
  getters: {
    menuItems: state => state.menuItems,
    applicationTitle: state => state.applicationTitle,
    customFormData: state => state.customFormData,
    formBuilderData: state => state.formBuilder.data,
    formBuilderAppId: state => state.formBuilder.appId,
    formBuilderPageId: state => state.formBuilder.pageId,
    formBuilderFormId: state => state.formBuilder.formId,
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
    FORMBUILDERDATA: (state, payload) => {
      state.formBuilder.data = payload;
    },
    FORMBUILDERIDS: (state, payload) => {
      state.formBuilder.appId = String(payload.appid);
      state.formBuilder.pageId = String(payload.pageid);
      // this.$set(state.formBuilder, 'appId', String(payload.appid));
      // this.$set(state.formBuilder, 'pageId', String(payload.pageid));
    },
    FORMBUILDERFORMID: (state, payload) => {
      state.formBuilder.formId = String(payload);
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
    // fetchForm: (context, payload) => {
    //   axios({
    //     method: 'get',
    //     url: `http://localhost:3000/pages/formio`,
    //   })
    //     .then((response) => {
    //       context.commit('FORMDATA', response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    // },
    fetchForm: (context, payload) => {
      axios({
        method: 'get',
        url: `http://localhost:3000/pages/form/${payload.appid}/${payload.pageid}`,
      })
        .then((response) => {
          context.commit('FORMDATA', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          context.commit('FORMDATA', {});
        });
    },
    clearFormBuilder: (context) => {
      context.commit('FORMBUILDERDATA', {display: 'form'});
      context.commit('FORMBUILDERIDS', {appid: '', pageid: ''});
    },
    saveFormBuilderToFile: (context, payload) => {
      axios({
        method: 'post',
        data: payload.data,
        url: `http://localhost:3000/pages/form/${payload.appid}/${payload.pageid}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          context.commit('FORMBUILDERIDS', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    loadFormBuilderToFile: (context, payload) => {
      axios({
        method: 'get',
        data: payload.data,
        url: `http://localhost:3000/pages/form/${payload.appid}/${payload.pageid}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          context.commit('FORMBUILDERDATA', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          context.commit('FORMBUILDERDATA', {display: 'form'});
        });
    },
    saveFormBuilder: (context, payload) => {
      const formId = payload.formid;
      if (formId === '') {
        // add
        axios({
          method: 'post',
          data: payload.data,
          url: `http://localhost:3000/pages/forms/${payload.appid}/${payload.pageid}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            context.commit('FORMBUILDERFORMID', response.data.id);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } else {
        // update
        axios({
          method: 'put',
          data: payload.data,
          url: `http://localhost:3000/pages/forms/${payload.appid}/${payload.pageid}/${formId}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            context.commit('FORMBUILDERFORMID', response.data.id);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    },
    loadFormBuilder: (context, payload) => {
      axios({
        method: 'get',
        data: payload.data,
        url: `http://localhost:3000/pages/forms/${payload.appid}/${payload.pageid}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          context.commit('FORMBUILDERDATA', response.data.formjson);
          context.commit('FORMBUILDERFORMID', response.data.formid);
        })
        .catch((err) => {
          console.log(err.response.data);
          context.commit('FORMBUILDERDATA', {display: 'form'});
          context.commit('FORMBUILDERFORMID', '');
        });
    },
  },
});
