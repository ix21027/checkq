<template>
  <v-app>
    <app-header></app-header>
    <v-content class='content'>
      <v-container pa-0>
        <app-watcher></app-watcher>
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
    appWatcher: () => import('@/components/Watcher/Watcher')
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
.content {
  overflow: hidden;
}
</style>
