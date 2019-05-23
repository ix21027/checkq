<template>
  <v-container grid-list-xl text-xs-center>
    <div v-if="loading">
      <loader></loader>
    </div>
    <div v-else>
      <v-layout row wrap justify-center>
        <h2>TECT</h2>
      </v-layout>
      <show-test :currentId='tests.currentId'></show-test>
      <v-layout row wrap justify-center>
        <v-flex md10 sm11>
          <v-card>
            <v-card-text>
              <test-number v-for="i in 60" :key="i" :index="i"></test-number>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex'
import fetchStatus from './../constants/fetchStatus'

export default {
  data() {
    return {
    }
  },
  created() {
    this.fetchTests()
  },
  computed: {
    ...mapState([
      'tests'
      ]),
    loading() {
      return (this.tests.fetchStatus == fetchStatus.start)
    }
  },
  methods: {
    ...mapActions([
      'fetchTests',
    ])
  },
  components:{
    ShowTest: () => import('./../components/ShowTest/ShowTest'),
    TestNumber: ()=> import('./../components/TestNumber/TestNumber'),
    Loader: ()=> import('./../components/CategorieList/CategorieLoader')
  },
}
</script>

<style scoped>
</style>