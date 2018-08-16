<template>
  <v-app>

    <!--<Menu />-->
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list dense>
        <template
          v-for="(item, i) in items"
        >
          <menu-item :item="item" :index="i" :submenu=false />
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer color="indigo" :fixed="fixed" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { Formio } from 'formiojs';
import MenuItem from './components/MenuItem.vue';
// import CustomComponent from './components/CustomComponent.vue';
// import { BaseComponent } from 'formiojs';
import { CustomComponent } from './components/form_components/customcomponent/CustomComponent.js';
const CustomComponentSv = require('./components/form_components/customcomponent/CustomComponentSv');

export default {
  name: 'App',
  components: {
    'menu-item': MenuItem,
    // 'custom-component': CustomComponent,
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Application Factory',
    };
  },
  computed: {
    items() {
      return this.$store.getters.menuItems;
    },
  },
  mounted() {
    console.log('mounted');
    this.$store.dispatch('fetchMenus');
    Formio.registerComponent('customcomponentsv', CustomComponentSv.default);
    Formio.registerComponent('customcomponent', CustomComponent);
  },
};
</script>
