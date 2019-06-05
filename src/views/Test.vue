<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm11 md11 lg8>
      <app-show-test
        :currentNumber='tests.currentNumber'
      ></app-show-test>
    </v-flex>
    <v-flex xs12 sm11 md11 lg8 mt-1>
      <app-test-navigation></app-test-navigation>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ShowTest from '@/components/ShowTest/ShowTest';
import TestNavigation from '@/components/TestNavigation/TestNavigation';
import fetchStatus from '@/constants/fetchStatus';

export default {
  created() {
    if( this.tests.list.length === 0 || this.tests.testStatus){
      this.$router.push({ path: '/' })
    }
  },
  computed: {
    ...mapState([
      'tests'
      ]),
    loading() {
      return (this.tests.fetchStatus == fetchStatus.start)
    },
    currentNumber(){
      return this.tests.currentNumber
    }
  },
  methods: {
    ...mapActions([
      'fetchTests',
    ]),
  },
  components:{
    appShowTest: ShowTest,
    appTestNavigation: TestNavigation,
  }
}
</script>

<style scoped>
</style>