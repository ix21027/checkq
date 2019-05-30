<template>
  <v-layout mb-5>
    <v-flex>
      <app-show-result-item
        v-for="(item,index) in resultList"
        :key="index"
        :item='item'
        :index='index'
      >
      </app-show-result-item>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props:['resultList'],
  components: {
    appShowResultItem: ()=> import('./../ShowResultItem/ShowResultItem')
  }
}
</script>

<style scoped>
</style>
