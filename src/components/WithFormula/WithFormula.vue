<template>
  <div>
    <span v-html="expressionHtml"/>
  </div>
</template>

<script>
import Katex from 'katex'
import 'katex/dist/katex.min.css';

export default {
  props: [
    'expression',
  ],
  computed: {
    expressionHtml() {
      const arr = this.expression.split('$') || '';
      let html = '';
      for (let i = 0; i < arr.length ; i +=2 ) {
        html += `<span>${arr[i] || ''}</span> ${Katex.renderToString(arr[i+1] || '', {
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
