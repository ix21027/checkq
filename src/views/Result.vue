<template>
  <v-container class="place" >
    <app-anchor ></app-anchor>
    <v-layout row wrap class="lay" my-2 >
      <v-flex xs12 sm10 md10 lg9 xl8 class="f">
      <h2><v-icon color="success" size="23">description</v-icon>
        РЕЗУЛЬТАТИ ТЕСТУ
      </h2>
      </v-flex>
    </v-layout>
      <v-layout row wrap class="lay2">
        <v-flex xs12 sm5 lg4>
          <v-layout row wrap align-end>
            <v-flex xs6 my-1>ПИТАННЯ:</v-flex>
            <v-flex xs1 ><v-icon color="success" size="25">ballot</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>{{count}}</v-flex>

            <v-flex xs6 my-1>ПРАВИЛЬНО:</v-flex>
            <v-flex xs1 ><v-icon color="success" size="25">check_circle</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>{{correct}}</v-flex>

            <v-flex xs6 my-1>НЕПРАВИЛЬНО:</v-flex>
            <v-flex xs1 ><v-icon color="error" size="25">error</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>{{errors}}</v-flex>

            <v-flex xs6 my-1>НЕ ДАНО ВІДПОВІДІ:</v-flex>
            <v-flex xs1 ><v-icon color="error" size="25">speaker_notes_off</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>{{noAnswer}}</v-flex>

            <v-flex xs6 my-1>ЧАС ПРОХОДЖЕННЯ:</v-flex>
            <v-flex xs4 my-1>{{time}}</v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm7 lg8>
          <app-result-navigation :resultList='testResult'></app-result-navigation>
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
import { mapState } from 'vuex';

export default {
  data() {
    return {
      testResult: [],
      time:'',
      count: 0,
      correct:0,
      errors:0,
      noAnswer:0,
    }
  },
  created() {
    if (this.tests.list.length !== 0) {
      this.testResult = this.tests.list;
      this.time = this.tests.stringTime
    }else if(localStorage.getItem('testResult') !== null){
      try {
        this.testResult = JSON.parse(localStorage.getItem('testResult'))
        if(localStorage.getItem('testTime') !== null){
          this.time = JSON.parse(localStorage.getItem('testTime'))
        }
        else{
          this.timeResult = this.tests.stringTime
        }
      } catch (error) {
        localStorage.removeItem('testResult')
        localStorage.removeItem('timeResult')
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
  }
}
</script>

<style lang='scss' scoped>
</style>
