<style src="codemirror/lib/codemirror.css">
</style>
<style src="codemirror/theme/panda-syntax.css">
</style>
<style src="codemirror/theme/base16-light.css">
</style>
<style src="codemirror/theme/darcula.css">
</style>
<style src="codemirror/theme/neo.css">
</style>
<style>
.CodeMirror {
  flex: 1;
  align-content: left;
}
</style>
<style >
.edit-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
}
.edit-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
</style>

<template>
  <div class="edit-container">
    <div class="edit-header">
      {{ title }}
    </div>
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/javascript/javascript';
import { debounce } from 'throttle-debounce'

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "vue component editor"
    },
    mode: {
      type: String,
      default: "vue",
      validator(mode) {
        return ["vue", "markdown", "javascript"].indexOf(mode) > -1;
      }
    },
    theme: {
      type: String,
      default: "panda-syntax",
      validator(theme) {
        return ['panda-syntax', 'base16-light', 'darcula', 'neo'].indexOf(theme) > -1;
      }
    }
  },
  watch: {
    mode: {
      handler (mode) {
        this.editorIns && this.editorIns.setOption('mode', mode);
      },
      immediate: true
    },
    value (val) {
      this.readOnly && this.editorIns.setValue(val);
    }
  },
  mounted () {
    this.editorIns = CodeMirror.fromTextArea(this.$refs.editor, {
      value: '',
      mode: this.mode,
      theme: this.theme,
      lineNumbers: true,
      styleActiveLine: true,
      autofocus: this.readOnly ? false : true,
      readOnly: this.readOnly,
      matchBrackets: true,
      lineWrapping: true
    });

    this.editorIns.setValue(this.value.trim())

    this.editorIns.on(
      'change',
      debounce(500, () => {
        this.$emit('input', this.editorIns.getValue())
      })
    )
  }
};
</script>

