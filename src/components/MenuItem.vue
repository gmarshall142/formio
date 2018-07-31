<template>
  <v-list-tile
    slot="activator"
    v-if="item.children.length === 0"
    to="{ name: item.title.toLocaleLowerCase() }"
  >
    <v-list-tile-action>
      <v-icon v-html="item.icon"></v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-sub-title v-if="submenu">{{ item.label }}</v-list-tile-sub-title>
      <v-list-tile-title v-else>{{ item.label }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <!--v-model="item.active"-->
  <!--:prepend-icon="item.icon"-->
  <v-list-group
    v-else
    :key="item.label"
    :group="item.id"
    :sub-group="submenu"
    :value="false"
    no-action
  >
    <v-list-tile slot="activator">
      <v-list-tile-content>
        <v-list-tile-title>{{ item.label }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <template v-for="(childItem, childIndex) in item.children">
      <menu-item :item="childItem" :index="childIndex" :submenu=true />
    </template>
  </v-list-group>



  <!--<router-link-->
    <!--v-bind:to="{ name: item.title.toLocaleLowerCase() }"-->
    <!--class="side_bar_link"-->
  <!--&gt;-->
    <!--<v-list-tile-->
      <!--value="true"-->
      <!--:key="index"-->
    <!--&gt;-->
      <!--<v-list-tile-action>-->
        <!--<v-icon v-html="item.icon"></v-icon>-->
      <!--</v-list-tile-action>-->
      <!--<v-list-tile-content>-->
        <!--<v-list-tile-title v-text="item.title"></v-list-tile-title>-->
      <!--</v-list-tile-content>-->
    <!--</v-list-tile>-->
  <!--</router-link>-->
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['item', 'index', 'submenu'],
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
