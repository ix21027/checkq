<template>
  <v-container grid-list-xl text-xs-center>
    <div v-if="loading">
      <loader></loader>
    </div>
    <div v-else>
      <v-layout row wrap justify-center>
        <h2>TECT</h2>
      </v-layout>
      <show-test
        :currentNumber='tests.currentNumber'
        ></show-test>
      <v-layout row wrap justify-center>
        <v-flex md10 sm11>
          <v-card>
            <v-card-text>
              <test-navigation></test-navigation>

              <!-- <test-number
                v-for="(test, index) in tests.list"
                :key="test.id"
                :index="index"
              >{{test.id}}</test-number> -->

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
    this.fetchTests()
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
    TestNavigation: ()=> import('./../components/testNavigation/testNavigation'),
    Loader: ()=> import('./../components/CategorieList/CategorieLoader')
  }
}
</script>

<style scoped>
</style>