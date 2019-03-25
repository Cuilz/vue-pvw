<template>
  <div id="app">
    <code-mirror v-model="code" />
    <preview :component-source=code />
  </div>
</template>

<script>
import vueSource from './utils/vueSource';

export default {
  name: "app",
  components: {
    CodeMirror: () => import('./components/CodeMirror.vue'),
    Preview: () => import('./components/Priview.vue')
  },
  data () {
    return {
      code: vueSource
    }
  }
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
}

</style>
