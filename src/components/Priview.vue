<style>
.preview-container {
  min-width: 50%;
  display: flex;
  flex-direction: column;
}
.preview-header {
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.preview-content {
  border-top: 1px solid #000000;
}
</style>


<template>
  <div class="preview-container">
    <div class="preview-header">
      预览
    </div>
    <div :id="scope" class="preview-content">
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js';
import { parseComponent } from 'vue-template-compiler/browser';
import * as babel from "@babel/core";

export default {
  props: ['componentSource'],
  data () {
    return {
      scope: this.generateScope(),
      template: '',
      script: '',
      style: ''
    }
  },
  watch: {
    'componentSource': function (vueSource) {
      this.compileCode(vueSource);
    }
  },
  methods: {
    generateScope () {
      return  'v-xxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    compileCode (vueSource) {
      const { template, script, styles } = parseComponent(vueSource);

      this.template = template.content;
      const transformedScript = babel.transformSync(script.content, null).code.replace(/export default /, '');
      this.script = eval(`(function(exports){ return ${transformedScript}; })({})`);
      this.styles = styles.content;

      new Vue(Object.assign({}, { template: this.template }, this.script)).$mount(`#${this.scope}`);
    }
  },
  mounted () {
    this.compileCode(this.componentSource);
  }
}
</script>

