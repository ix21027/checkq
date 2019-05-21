<template>
  <v-layout>
    <v-btn to='/test'>Відкрити тест</v-btn>
    <v-btn color="success" @click="fetchUsers">Fetch</v-btn>
    <app-counter></app-counter>
    <v-flex xs1>
      <div v-for="user in users" :key='user.id'>{{user.first_name}}</div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Counter from './Counter.vue'

export default {
  name: 'home',
  components: {
    appCounter: Counter,
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ])
  },
  computed: {
    ...mapState([
      'users'
    ])
  }
}
</script>
