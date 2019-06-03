<template>
  <v-layout row wrap justify-center>
    <v-flex md10 sm11>
        <v-card>
          <v-card-title class='question-title'>
            <div class="circle-question">
              {{currentNumber+1}}
            </div>
            <div class="question-text">
              <app-katex :expression='`${currentTest.question}`'>
            </app-katex></div>
          </v-card-title>
          <v-card-text class='question-body'>
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
          </v-card-text>
          <v-card-actions>
            <v-layout column>
              <v-layout row>
                <v-flex xs4 sm3 md2>
                  <v-btn flat left @click="previosQuestion" outline color="grean" :disabled="currentNumber==0" >НАЗАД</v-btn>
                </v-flex>
                <template v-if="!(tests.list.length===(currentNumber+1))">
                  <v-flex xs4 sm6 md8>
                    <v-spacer></v-spacer>
                  </v-flex>
                  <v-flex xs4 sm3 md2>
                    <v-btn flat right @click="nextQuestion" outline color="success">ДАЛІ</v-btn>
                  </v-flex>
                </template>
                <template v-else>
                  <v-flex xs3 sm5 md7>
                    <v-spacer></v-spacer>
                  </v-flex>
                  <v-flex xs5 sm4 md3>
                    <v-btn flat right @click="endTest" outline color="success">Закінчити тест</v-btn>
                  </v-flex>
                </template>
              </v-layout>
              <v-layout row pr-3 pb-3>
                <v-flex xs6 sm8 md8 >
                  <v-spacer></v-spacer>
                </v-flex>
                <timer :initTime="initTime"></timer>
                <count></count>
              </v-layout>
            </v-layout>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex';
import letters from './../../constants/lettersForTest'

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
    Timer: () => import('./../Timer/Timer'),
    Count: () => import('./../Count/Count'),
    appKatex: () => import('@/components/WithFormula/WithFormula')
  },
}
</script>
<style scoped>
  .question-title {
    padding: 1.3em;
    padding-bottom: 0;
    font-weight: 500;
    font-size: 1.2em;
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .question-text {
    width: calc(100% - 60px);
    display: flex;
    align-items: center;
    min-height: 40px;
  }
  .answer {
    display: flex;
    align-items: center;
    height: 60px;
    cursor: pointer;
  }

  .answer-option {
    margin-bottom: 8px;
    font-size: 12pt;
  }

  .question-body {
    margin-left: 10px;
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
    margin-right: 10px;
  }
</style>
