<template>
  <v-layout>
    <v-flex>
      <h1>Counter</h1>
      <v-flex>
        <div class="">Count:</div>
        <div class="">{{ counter }} ({{toStr}})</div>

      </v-flex>
      <v-btn color="success" @click="increment({amount: 1})">Inc</v-btn>
      <v-btn color="success" @click="decrement({amount: 1})">Dec</v-btn>
      <v-btn color="success" @click="incrementAsync({amount: 1})">Inc Async</v-btn>
      
    </v-flex>
  </v-layout>
</template>

<script>

import { mapMutations, mapGetters, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      counter: state => state.counter.c,
    }),
    ...mapGetters([
      'toStr',
    ])
  },
  methods: {
    ...mapMutations([
      'increment',
      'decrement'
    ]),
    ...mapActions([
      'incrementAsync'
    ])
  }
}
</script>

<style>

</style>
