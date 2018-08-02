<template>
  <html>
  <head class="application">
    <h1>Application: {{title}}</h1>
  </head>
  <br />
  <p>application: {{$route.params.appid}}</p>
  <br />
  <p>page: {{$route.params.pageid}}</p>
  </html>
</template>

<script>
export default {
  props: ['appid', 'pageid'],
  data() {
    return {
      currentPath: '',
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
