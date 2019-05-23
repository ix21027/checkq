<template>
  <v-app>
    <app-header></app-header>
    <v-content class='content'>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header/Header'
import { mapActions } from 'vuex'

export default {
  components: {
    appHeader: Header,
  },
  methods: {
    ...mapActions([
      'fetchCategories',
    ])
  },
  beforeMount() {
    this.fetchCategories();
  }
}
</script>

<style>

</style>
