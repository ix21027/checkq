<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm11 md11 lg8>
      <show-test
        :currentNumber='tests.currentNumber'
      ></show-test>
    </v-flex>
    <v-flex xs12 sm11 md11 lg8 mt-1>
      <test-navigation></test-navigation>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import fetchStatus from './../constants/fetchStatus'

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
    ShowTest: () => import('./../components/ShowTest/ShowTest'),
    TestNavigation: ()=> import('./../components/TestNavigation/TestNavigation'),
    // Loader: ()=> import('./../components/Loader/Loader')
  }
}
</script>

<style scoped>
</style>