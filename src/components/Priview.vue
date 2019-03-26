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
      this.init(vueSource);
    }
  },
  methods: {
    generateScope () {
      return  'v-xxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    init (componentSource) {
      this.compileCode(componentSource);
      this.renderCode();
    },
    compileCode (vueSource) {
      const { template, script, styles } = parseComponent(vueSource);

      this.template = template.content;
      const transformedScript = babel.transformSync(script.content, null).code.replace(/export default /, '');
      this.script = eval(`(function(exports){ return ${transformedScript}; })({})`);
      this.styles = styles.content;
    },
    renderCode () {
      const container = this.$el;

      if (this.codeVM) {
        this.codeVM.$destroy();
        container.removeChild(this.codeVM.$el);
      }

      const previewEl = document.createElement('div');
      previewEl.setAttribute('id', this.scope);
      container.appendChild(previewEl);

      this.codeVM = new Vue(Object.assign({}, { template: this.template }, this.script));
      this.codeVM.$mount(previewEl);
    }
  },
  mounted () {
    this.init(this.componentSource);
  }
}
</script>

