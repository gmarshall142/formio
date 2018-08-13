<template>
  <div>
    <h1>Form Builder</h1>

    <div id="test">
      <fbuilder
        ref="formBuilder"
        :form="formBuilderData"
        v-bind:options="{}"
        v-on:change="handleChange"
        v-on:submit="handleSubmit"
      ></fbuilder>
    </div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs2>
          <v-text-field
            v-model="appid"
            label="Application"
           ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field
            v-model="pageid"
            label="Page"
          ></v-text-field>
        </v-flex>
        <div style="margin: 20px 10px; vertical-align: middle">(form ID: {{formid}})</div>
        <v-btn color="success" v-on:click="handleLoad">Load</v-btn>
        <v-btn color="success" v-on:click="handleSave">Save</v-btn>
        <v-btn color="info" v-on:click="clearForm">Clear</v-btn>
        <v-btn color="info" v-on:click="handleLoadDB">Load DB</v-btn>
        <v-btn color="info" v-on:click="handleSaveDB">Save DB</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { FormBuilder } from 'vue-formio';

export default {
  name: 'formbuilder',
  // props: ['formBuilderData'],
  data() {
    return {
      // appid: this.$store.state.formBuilder.appId,
      // pageid: this.$store.state.formBuilder.pageId,
    };
  },
  components: {
    fbuilder: FormBuilder,
  },
  computed: {
    appid: {
      get()  {
        return this.$store.state.formBuilder.appid;
      },
      set(value) {
        this.$store.commit('updateFormBuilderAppId', value);
      }
    },
    pageid: {
      get()  {
        return this.$store.state.formBuilder.pageid;
      },
      set(value) {
        this.$store.commit('updateFormBuilderPageId', value);
      }
    },
    formid: {
      get()  {
        return this.$store.state.formBuilder.formid;
      },
      set(value) {
        this.$store.commit('updateFormBuilderFormId', value);
      }
    },
    formBuilderData() {
      return this.$store.getters.formBuilderData;
    },
    // formid()  {
    //   return this.$store.state.formBuilder.formId;
    // },
    // appid() {
    //   return this.$store.getters.formBuilderAppId;
    // },
    // pageid() {
    //   return this.$store.getters.formBuilderPageId;
    // },
  },
  watch: {
    formBuilderData(newVal, oldVal) {
      // it was necessary to force the underlying form builder to update the form data after load
      // the 'form' attribute in the Vue wrapper did not behave as a reactive attribute
      // TODO: do further debugging of the vue-formio wrapper
      this.$refs.formBuilder.builder.setForm(this.$store.getters.formBuilderData);
    },
  },
  methods: {
    clearForm: function() {
      this.$store.dispatch('clearFormBuilder');
    },
    handleChange: function(schema) {
      // console.log(schema);
    },
    handleSubmit: function(schema) {
      console.log(schema);
      // const formStr = this.$refs['formBuilder'].builder.form;
      // console.log(JSON.stringify(formStr));
    },
    handleSave: function() {
      const jsonData = JSON.stringify(this.$refs.formBuilder.builder.instance._form);
      console.log(jsonData);
      this.$store.dispatch('saveFormBuilderToFile', {appid: this.appid, pageid: this.pageid, data: jsonData});
    },
    handleLoad: function() {
      console.log('handleLoad');
      this.$store.dispatch('loadFormBuilderToFile', {appid: parseInt(this.appid), pageid: parseInt(this.pageid)});
    },
    handleSaveDB: function() {
      const jsonData = JSON.stringify(this.$refs.formBuilder.builder.instance._form);
      console.log(jsonData);
      this.$store.dispatch('saveFormBuilder', {appid: this.appid, pageid: this.pageid, formid: this.formid, data: jsonData});
    },
    handleLoadDB: function() {
      console.log('handleLoad');
      this.$store.dispatch('loadFormBuilder', {appid: parseInt(this.appid), pageid: parseInt(this.pageid)});
    },
  },
};
</script>
