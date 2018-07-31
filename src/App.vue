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
        <!--<v-list-group-->
          <!--v-for="(item, i) in items"-->
          <!--v-model="item.active"-->
          <!--:key="item.label"-->
          <!--:prepend-icon="item.icon"-->
          <!--no-action-->
        <!--&gt;-->
        <template
          v-for="(item, i) in items"
        >
          <menu-item :item="item" :index="i" :submenu=false />
        </template>
          <!--<v-list-tile-->
            <!--:key="item.title"-->
          <!--&gt;-->
            <!--<v-list-tile-content>-->
              <!--<v-list-tile-title v-text="item.title">{{item.title}}</v-list-tile-title>-->
            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
        <!--</v-list-group>-->

        
        <!--<router-link-->
          <!--v-for="(item, i) in items"-->
          <!--v-bind:to="{ name: item.label.toLocaleLowerCase() }"-->
          <!--class="side_bar_link"-->
        <!--&gt;-->
          <!--<v-list-tile-->
            <!--value="true"-->
            <!--:key="i"-->
          <!--&gt;-->
            <!--<v-list-tile-action>-->
              <!--&lt;!&ndash;<v-icon v-html="item.icon"></v-icon>&ndash;&gt;-->
              <!--<v-icon>{{item.icon}}</v-icon>-->
            <!--</v-list-tile-action>-->
            <!--<v-list-tile-content>-->
              <!--<v-list-tile-title v-text="item.label"></v-list-tile-title>-->
            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
        <!--</router-link>-->
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
import MenuItem from './components/MenuItem.vue';

export default {
  name: 'App',
  components: {
    'menu-item': MenuItem,
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
    this.$store.dispatch('fetchMenus');
  },
};
</script>
