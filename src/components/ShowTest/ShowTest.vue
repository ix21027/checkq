<template>
  <v-layout column elevation-3 pa-3 class="place">
    <v-flex>
      <v-layout row align-center wrap>
        <v-flex xs1>
          <div class="circle-question">
            {{currentNumber+1}}
          </div>
          </v-flex>
          <v-flex xs12 sm11>
          <div>
            <app-katex
              :expression='`${currentTest.question}`'>
            </app-katex>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
      <v-radio-group v-model="answer[currentNumber]">
        <label
          class="answer"
          v-for="(n, i) in currentTest.options"
          :key="n.id"
        >
          <v-radio
            :label="letters[i]"
            :value="n.id"
            mt-2
          >
          </v-radio>
          <div class="answer-option">
            <app-katex :expression='n.title'></app-katex>
          </div>
        </label>
      </v-radio-group>
    </v-flex>
    <v-flex>
        <v-layout row justify-space-between>
          <v-flex xs4 text-xs-left>
            <v-btn flat left @click="previosQuestion" outline color="grean" :disabled="currentNumber==0" >НАЗАД</v-btn>
          </v-flex>
          <template v-if="!(tests.list.length===(currentNumber+1))">
            <v-flex xs4 text-xs-right>
              <v-btn flat right @click="nextQuestion" outline color="success">ДАЛІ</v-btn>
            </v-flex>
          </template>
          <template v-else>
            <v-flex xs5 text-xs-right>
              <v-btn flat right @click="endTest" outline color="success">Закінчити тест</v-btn>
            </v-flex>
          </template>
        </v-layout>
    </v-flex>
    <v-flex >
        <v-layout row justify-space-between align-center>
          <v-flex xs8 pl-3>
            <app-mistake></app-mistake>
          </v-flex>
          <v-flex xs2 text-xs-right>
            <app-timer :initTime="initTime"></app-timer>
          </v-flex>
          <v-flex xs2 pr-3 text-xs-right>
            <app-count></app-count>
          </v-flex>
        </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex';
import Timer from '@/components/Timer/Timer';
import Count from '@/components/Count/Count';
import Katex from '@/components/WithFormula/WithFormula';
import Mistake from '@/components/MistakeInTest/MistakeInTest';
import letters from '@/constants/lettersForTest'

export default {
  data() {
    return {
      letters:letters,
      initTime:0,
      answer:[],
    }
  },
  props:[
    'currentNumber'
  ],
  computed: {
    ...mapState([
      'tests',
    ]),
    currentTest(){
      return this.tests.list[this.currentNumber]
    },
    testStatus(){
      return this.tests.testStatus
    }
  },
  watch: {
    answer(){
      this.setAnswer({
        index: this.currentNumber,
        answer: this.answer[this.currentNumber],
        numb: this.currentNumber
        })
      this.setCountPassed({
        count: this.answer.filter(i => i!==null).length
      })
    },
    testStatus(){
      if(this.tests.testStatus){
        this.$router.push({ path: '/result' })
      }
    }
  },
  methods: {
    ...mapMutations([
      'setAnswer',
      'setCountPassed',
      'changeCurrentNumber',
      'startToFetchTests',
      'setStartTime'
    ]),
    ...mapActions([
      'fetchResult'
    ]),
    nextQuestion(){
      this.changeCurrentNumber({currentNumber: this.currentNumber+1})
    },
    previosQuestion(){
      this.changeCurrentNumber({currentNumber: this.currentNumber-1})
    },
    endTest(){
      this.fetchResult()
    }
  },
  created() {
    if( this.tests.startTime === null){
      this.initTime = new Date().getTime();
      this.setStartTime({ time: this.initTime })
    } else {
      this.initTime = this.tests.startTime
    }
  },
  components: {
    appTimer: Timer,
    appCount: Count,
    appKatex: Katex,
    appMistake: Mistake,
  },
}
</script>

<style scoped>
.place{
  background: #fff;
}
.answer {
  display: flex;
  align-items: center;
  min-height: 40px;
  cursor: pointer;
}
.answer-option {
  margin-bottom: 8px;
  font-size: 12pt;
}
.circle-question {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #4CAF50;
  border-radius: 50px;
}
</style>
