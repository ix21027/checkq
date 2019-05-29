<template>
  <v-layout>
    <v-text-field v-model="input"/>
    <app-with-formula v-model="input"/>
  </v-layout>
</template>

<script>
import WithFormulaVue from '../components/WithFormula/WithFormula.vue';
export default {
  data() {
    return {
      input: '',
    }
  },
  components: {
    appWithFormula: WithFormulaVue
  }
}
</script>

<style>

</style>
