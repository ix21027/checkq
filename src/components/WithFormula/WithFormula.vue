<template>
  <span v-html="expressionHtml"/>
</template>

<script>
import Katex from 'katex'
import 'katex/dist/katex.min.css';

export default {
  computed: {
    expressionHtml() {
      const arr = this.$slots.default[0].text.split('$');
      let html = '';
      for (let i = 0; i < arr.length - 1; i +=2 ) {
        html += `<span>${arr[i]}</span> ${Katex.renderToString(arr[i+1], {
          throwOnError: false,
        })}`
      }
      return html;
    }
  }
}
</script>

<style>

</style>
