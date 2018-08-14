<template>
  <div>
    <div class="application">
      <h1>{{title}}</h1>
      <div>(page: {{$route.params.pageid}})</div>
    </div>

    <formio :form="formData" v-on:submit="onSubmitMethod"/>

  </div>
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
  mounted() {
    // this.$store.dispatch('fetchPage', {appid: this.$route.params.appid, pageid: this.$route.params.pageid});
    // this.$store.dispatch('fetchForm', {appid: this.$route.params.appid, pageid: this.$route.params.pageid});
  },
  updated() {
    if (this.$route.path.startsWith('/apps') && this.$route.path !== this.currentPath) {
      this.currentPath = this.$route.path;
      // this.$store.dispatch('fetchPage', {appid: this.$route.params.appid, pageid: this.$route.params.pageid});
      this.$store.dispatch('fetchForm', {appid: this.$route.params.appid, pageid: this.$route.params.pageid});
    }
  },
  computed: {
    title() {
      return this.$store.getters.applicationTitle;
    },
    formData() {
      return this.$store.getters.customFormData;
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
  div
    margin 20px 20px
</style>
