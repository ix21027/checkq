<template>
  <v-layout row wrap justify-center>
    <v-flex md10 sm11>
        <v-card>
          <v-card-title>
            <h3><b>{{currentNumber+1}}. {{currentTest.question}}</b></h3>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="answer[currentNumber]">
              <v-radio
                v-for="(n,i) in currentTest.options"
                :key="n.id"
                :label="letters[i]+'.  '+n.title"
                :value="n.id"
              ></v-radio>
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
                <timer></timer>
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
      answer:[]
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
      'startToFetchTests'
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
  components: {
    Timer: () => import('./../Timer/Timer'),
    Count: () => import('./../Count/Count'),
  },
}
</script>
<style scoped>
</style>
