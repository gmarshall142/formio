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
    <div style="margin-top: 20px;">
      <v-btn color="success" v-on:click="handleSave">Save</v-btn>
    </div>
  </div>
</template>

<script>
import { FormBuilder } from 'vue-formio';

export default {
  name: 'formbuilder',
  components: {
    fbuilder: FormBuilder,
  },
  methods: {
    handleChange: function(schema) {
      // console.log(schema);
    },
    handleSubmit: function(schema) {
      console.log(schema);
      // const formStr = this.$refs['formBuilder'].builder.form;
      // console.log(JSON.stringify(formStr));
    },
    handleSave: function() {
      const jsonData = JSON.stringify(this.$refs['formBuilder'].builder.form);
      console.log(jsonData);
      this.$store.dispatch('saveFormBuilder', jsonData);
    },
  },
};
</script>
