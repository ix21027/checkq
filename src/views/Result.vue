<template>
  <v-container class="place" >
    <app-anchor ></app-anchor>
    <v-layout row wrap class="lay" my-2 >
      <v-flex xs12 sm10 md10 lg9 xl8 class="f">
        <h1>
          Результат
        </h1>
      </v-flex>
    </v-layout>
      <v-layout row wrap class="lay2">
        <v-flex>
          <v-layout row wrap justify-space-between>
            <app-statistic
              :total="count"
              :positive="correct"
              :negative="errors"
              :blank="noAnswer"
              :time="time"
              :categories="categories"
              :testCount="testCount"
            />
          <v-flex xs12 sm6 lg5 ml-4>
            <app-result-navigation :resultList='testResult'></app-result-navigation>
          </v-flex>
          </v-layout>
        </v-flex>

      </v-layout>
      <v-layout row wrap my-2>
        <app-show-result-test :resultList='testResult' ></app-show-result-test>
      </v-layout>
  </v-container>
</template>

<script>
import ShowResultTest from '@/components/ShowResultTest/ShowResultTest';
import ResultNavigation from '@/components/ResultNavigation/ResultNavigation';
import Anchor from '@/components/Anchor/Anchor';
import ResultStatistic from '@/components/ResultStatistic/ResultStatistic';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      testResult: [],
      time: '',
      count: 0,
      correct: 0,
      errors: 0,
      noAnswer: 0,
      categories: [],
      testCount: 0,
    }
  },
  created() {
    if (this.tests.list.length !== 0) {
      this.testResult = this.tests.list;
      this.time = this.tests.stringTime
      this.categories = this.tests.categoriesList
      this.testCount = this.tests.testCount
    }else if(localStorage.getItem('testResult') !== null){
      try {
        this.testResult = JSON.parse(localStorage.getItem('testResult'))
        if(localStorage.getItem('testTime') !== null){
          this.time = JSON.parse(localStorage.getItem('testTime'))
        }else{
          this.timeResult = this.tests.stringTime
        }
        if(localStorage.getItem('categories') !== null){
          this.categories = JSON.parse(localStorage.getItem('categories'))
        }else{
          this.categories = this.tests.categoriesList
        }
        if(localStorage.getItem('testCount') !== null){
          this.testCount = JSON.parse(localStorage.getItem('testCount'))
        }else{
          this.testCount = this.tests.testCount
        }
      } catch (error) {
        localStorage.removeItem('testResult')
        localStorage.removeItem('timeResult')
        localStorage.removeItem('categories')
        localStorage.removeItem('testCount')
        this.$router.push({ path: '/' })
      }
    }else{
      this.$router.push({ path: '/' })
    }
  },
  mounted() {
    this.count = this.testResult.length
    for (const iterator of this.testResult) {
      if(iterator.answer === undefined){
        this.noAnswer++
      } else if(iterator.answer === iterator.server_answer){
        this.correct++
      }else{
        this.errors++
      }
    }
  },
  computed: {
    ...mapState([
      'tests'
      ]),
  },
  components:{
    appShowResultTest: ShowResultTest,
    appResultNavigation: ResultNavigation,
    appAnchor: Anchor,
    appStatistic: ResultStatistic,
  }
}
</script>

<style lang='scss' scoped>
.result-control {
  padding: 10px;
  border: 2px solid #444;
}
</style>
