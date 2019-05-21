<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Header from './components/Header/Header'
export default {
  components: {
    appHeader: Header,
  }
}
</script>

<style>

</style>
