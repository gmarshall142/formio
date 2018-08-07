<template>
  <div>
    <h1>Form Builder</h1>

    <div id="test">
      <fbuilder
        ref="formBuilder"
        v-bind:form="{display: 'form'}"
        v-bind:options="{}"
        v-on:change="handleChange"
        v-on:submit="handleSubmit"
      ></fbuilder>
    </div>
    <!--<div id="formbuilder"/>-->
  </div>
</template>

<script>
import { FormBuilder } from 'vue-formio';

export default {
  name: 'formbuilder',
  components: {
    fbuilder: FormBuilder,
  },
  // mounted() {
  //   require('brace/ext/language_tools'); //language extension prerequsite...
  //   require('brace/mode/html');
  //   require('brace/mode/javascript');    //language
  //   require('brace/mode/less');
  //   require('brace/theme/chrome') ;
  //   require('brace/snippets/javascript'); //snippet
  // },
  methods: {
    handleChange: function(schema) {
      console.log(schema);
      //console.log(this);
    },
    handleSubmit: function(schema) {
      console.log(schema);
      const formStr = this.$refs['formBuilder'].builder.form;
      console.log(JSON.stringify(formStr));
    },
  },
};
</script>
