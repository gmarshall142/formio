<template>
  <html>
  <head class="application">
    <h1>Application: {{title}}</h1>
  </head>
  <br />
  <p>application: {{$route.params.appid}}</p>
  <br />
  <p>page: {{$route.params.pageid}}</p>

  <formio :src="formUrl" v-on:submit="onSubmitMethod" />
  <!--<formio src="https://examples.form.io/example" v-on:submit="onSubmitMethod" />-->

  </html>
</template>

<script>
import { Form } from 'vue-formio';

export default {
  props: ['appid', 'pageid'],
  data() {
    return {
      currentPath: '',
      // formUrl: "https://gwvpsovdjeovdqa.form.io/newresource"
      formUrl: "http://localhost:3000/pages/formio"
    };
  },
  updated() {
    if (this.$route.path.startsWith('/apps') && this.$route.path !== this.currentPath) {
      this.currentPath = this.$route.path;
      this.$store.dispatch('fetchPage', {appid: this.$route.params.appid, pageid: this.$route.params.pageid});
    }
  },
  computed: {
    title() {
      return this.$store.getters.applicationTitle;
    },
  },
  components: {
    formio: Form
  },
  methods: {
    onSubmitMethod: function(submission) {
      console.log(submission);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  h1
    margin 10px 0 0 20px
  p
    margin 10px 20px
</style>
<style>
  /*@import '../assets/styles.sv/formio.full.min.css';*/
</style>