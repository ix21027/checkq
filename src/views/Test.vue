<template>
  <v-container grid-list-xl text-xs-center>
    <div>
      <show-test
        :currentNumber='tests.currentNumber'
        ></show-test>
      <v-layout row wrap justify-center>
        <v-flex md10 sm11>
          <v-card>
            <v-card-text>
              <test-navigation></test-navigation>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
	</v-container>
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