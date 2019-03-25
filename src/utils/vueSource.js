export default `
<template>
  <div>
    <span>{{value}}</span>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data () {
    return {
      value: '111'
    }
  },
  created () {
    setTimeout(() => {
      this.value = '222';
    }, 1000);
  }
}
</script>
`
