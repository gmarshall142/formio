<template>
  <div class="hello">
    <h1>Header</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
import { BaseComponent } from 'formiojs';

export default {
  extends: BaseComponent,
  name: 'CustomComponent',
  props: {
  },
  methods: {
    builderInfo: function(submission) {
      console.log(submission);
      return {
        title: 'Custom',
        group: 'basic',
        icon: 'fa fa-html5',
        documentation: 'http://help.form.io/userguide/#custom-component',
        weight: 100,
        //schema: CustomComponent.schema()
      };
    }
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
