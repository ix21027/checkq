<template>
  <v-layout column elevation-3 pa-3 class="place">
    <v-flex>
      <div class="test-header">
          <div class="circle-question">
            {{currentNumber+1}}
          </div>
          <v-flex class='question-text'>
            <div>
              <app-katex
                :expression='`${currentTest.question}`'>
              </app-katex>
            </div>
        </v-flex>
      </div>
    </v-flex>
    <v-flex>
      <v-radio-group
        v-model="answer[currentNumber]"
        class="radio-group"
      >
        <label
          class="answer"
          v-for="(n, i) in currentTest.options"
          :key="n.id"
        >
          <v-radio
            :label="letters[i]"
            :value="n.id"
            mt-2
            class="radio-hidden"
          >
          </v-radio>
          <div
            class="letter"
            :class="{checked: (answer[currentNumber] === n.id) }"
          >
            {{letters[i]}}
          </div>

          <div class="answer-option">
            <app-katex :expression='n.title'></app-katex>
          </div>
        </label>
      </v-radio-group>
    </v-flex>
    <v-flex>
        <v-layout row justify-space-between>
          <v-flex xs5 >
            <v-btn
              flat
              @click="previosQuestion"
              outline
              color="grean"
              :disabled="currentNumber==0"
            >
            <v-icon>keyboard_arrow_left</v-icon>
            <div class="btn-text">
              НАЗАД
            </div>
            </v-btn>
          </v-flex>
          <template v-if="!(tests.list.length===(currentNumber+1))">
            <v-flex xs7 text-xs-right>
              <v-btn
                flat
                @click="nextQuestion"
                outline
                color="orange"
              >
                <div class="btn-text">
                  ДАЛІ
                </div>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-flex>
          </template>
          <template v-else>
            <v-flex xs7 text-xs-right>
              <v-btn
                flat
                @click="endTest"
                outline
                color="orange"
              >Завершити тест</v-btn>
            </v-flex>
          </template>
        </v-layout>
    </v-flex>
    <v-flex >
        <v-layout row justify-space-between align-center>
          <v-flex xs4 sm8>

          </v-flex>
          <v-flex xs4 sm2 text-xs-center text-sm-right>
            <app-timer :initTime="initTime"></app-timer>
          </v-flex>
          <v-flex xs4 sm2 pr-3 text-xs-center text-sm-right>
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
      this.$emit('complete');
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

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/mixin.scss';

$size: 26px;

.place{
  background: #fff;
}
.test-header {
  display: flex;
  align-items: center;
  margin-left: 5px;
  @include mobile {
    flex-direction: column;
    padding-bottom: 10px;
    border-bottom: 1px solid $inactive-color;
  }
}

.question-text {
  padding-left: 3px;
  font-size: 1.1em;
  width: 100%;
}

.btn-text {
  @include mobile {
    display: none;
  }
}

.answer {
  display: flex;
  align-items: center;
  min-height: 40px;
  cursor: pointer;
  margin-left: 40px;
  @include mobile {
    margin-left: 5px;
    padding: 10px 0;
    border-radius: 40px;

  }
}

.radio-group {
  margin-top: 0;
}

.answer-option {
  // margin-bottom: 8px;
  font-size: 12pt;
}
.circle-question {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 18pt;
  color: $main-color;
  width: 40px;
  min-width: 40px;
  font-weight: bold;
  @include mobile {
    &::before {
      content: '#';
    }
  }

}

.radio-hidden {
  display: none;
}

.letter {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $size;
  // border: 2px solid $main-color;
  width: $size;
  height: $size;
  min-width: $size;
  min-height: $size;
  font-weight: bold;
  margin-right: 0.5em;
  &.checked {
    background: $main-color;
    color: #fff;
  }
}
</style>
