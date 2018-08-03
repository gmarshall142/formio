<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id='formio'></div>
  </div>
</template>
<script type='text/javascript'>
  window.onload = function() {
    Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
  };
</script>

<style>
  /*@import '../assets/styles.sv/formio.full.min.css';*/
  /*@import '../assets/styles.sv/formio.form.css';*/
</style>
