<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <router-link
          v-for="(item, i) in items"
          v-bind:to="{ name: item.title.toLocaleLowerCase() }"
          class="side_bar_link"
        >
          <v-list-tile
            value="true"
            :key="i"
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <!--<v-toolbar-->
      <!--app-->
      <!--:clipped-left="clipped"-->
    <!--&gt;-->
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

  export default {
    name: 'App',
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          {
            icon: 'home',
            title: 'Home'
          },
          {
            icon: 'contact_mail',
            title: 'About'
          },
          {
            icon: 'bubble_chart',
            title: 'Inspire'
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Application Factory'
      }
    }
  }
</script>
