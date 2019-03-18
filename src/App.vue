<template>
  <div id="app">
    <div class="code-mirror-container">
      <code-mirror v-model="vueSource" />
    </div>
  </div>
</template>

<script>
import vueSource from './utils/vueSource';

export default {
  name: "app",
  components: {
    CodeMirror: () => import('./components/CodeMirror.vue')
  },
  data () {
    return {
      vueSource
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.code-mirror-container {
  width: 800px;
  height: 1000px;
}
</style>
